var time = 1;
var startComment = false;
var startString = false;
var startHtml = false;
var htmlTagBuffer = '';
var htmlBeforeTag = '';
var alreadyDeployed = false;

(async function start() {
    const htmlEditorResponse = await fetch('public/text/editor1.css');
    const htmlEditor = await htmlEditorResponse.text();
    await writeText(htmlEditor, 0, time, '#editor', 'editor');

    //const fileSystemResponse = await fetch('public/text/fileSystem1.html');
    //const fileSystem = await fileSystemResponse.text();
    //await writeText(fileSystem, 0, time, '#fileSystem', 'fileSystem');

    const terminalHeaderResponse = await fetch('public/text/terminalHeader.txt');
    const terminalHeader = await terminalHeaderResponse.text();
    await writeText(terminalHeader, 0, time, '#terminalHeader', 'terminal');

    const terminalResponse = await fetch('public/text/terminal1.txt');
    const terminal = await terminalResponse.text();
    await writeText(terminal, 0, time, '#terminal', 'terminal');

    const htmlEditorButtonsResponse = await fetch('public/text/buttons1.html');
    const htmlEditorButtons = await htmlEditorButtonsResponse.text();
    await writeText(htmlEditorButtons, 0, time, '#editor', 'editor');
}).call(this);

function writeText(message, index, interval, to, scroll) {
    let pre;
    if (index < message.length) {

        pre = document.getElementById(scroll);
        pre.scrollTop = pre.scrollHeight;
        writeChar(message[index++], to);
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                writeText(message, index, interval, to, scroll).then(resolve, reject);
            }, time);
        });
    }
    return Promise.resolve();
}

function writeChar(message, to) {

    var newHtml = $(to).html();
    if (message === '/' && startComment === false && startHtml === false) {
        startComment = true;
        newHtml += message;
    } else if (message === '/' && startComment === true && startHtml === false) {
        startComment = false;
        newHtml = $(to).html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
    } else if (startComment === true && (message === '.' || message === '?')) {
        newHtml += message;
        time = 800;
    } else if (message === ';' && startComment === false) {
        newHtml = $(to).html().replace(/([^:]*)$/, '<em class="value">$1</em>;');
    } else if (message === '{') {
        newHtml = $(to).html().replace(/(.*)$/, '<em class="class">$1</em>{')
    } else if (message === '$' && startHtml === false) {
        startHtml = true;
        htmlBeforeTag = newHtml;

        newHtml += message;
    } else if (message === '$' && startHtml === true) {
        startHtml = false;

        var tag = document.createElement('div');
        tag.innerHTML = htmlTagBuffer;

        console.log(htmlTagBuffer);


        document.getElementById(to.slice(1)).innerHTML = htmlBeforeTag;
        document.getElementById(to.slice(1)).appendChild(tag);
        newHtml = document.getElementById(to.slice(1)).innerHTML;

        htmlTagBuffer = '';
    } else if (startHtml) {
        htmlTagBuffer += message;

        newHtml += message;
    }
    else {
        newHtml += message;
        time = window.innerWidth <= 578 ? 4 : 1;
        time = 1;
    }


    $(to).html(newHtml);
    $('#style').append(message);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deploy() {
    await writeText(' ./deploy_website\n', 0, time, '#terminal', 'terminal');

    var beforeDeploy = $('#terminal').html();
    var loading = '';

    for (let i = 0; i <= 15; i++) {
        loading = '';
        for (let j = 0; j < i; j++) {
            loading = loading.concat('█');
        }
        loading = loading.concat(' ' + Math.round((i / 15) * 100) + '%');
        $('#terminal').html(beforeDeploy + loading);
        await sleep(200);
    }

    $('#terminal').append('\nWebsite succesfully deployed!\nmax@website ~ %');
}

async function about_me() {
    const editor_aboutMeResponse = await fetch('public/text/editor_aboutMe.html');
    const editor_aboutMe = await editor_aboutMeResponse.text();
    await writeText(editor_aboutMe, 0, time, '#editor', 'editor');
}



var time = 1;
var startComment = false;
var startString = false;
var startHtml = false;
var htmlTagBuffer = '';
var htmlBeforeTag = '';

(async function start() {
    const htmlEditorResponse = await fetch('public/text/editor1.css');
    const htmlEditor = await htmlEditorResponse.text();
    const fileSystemResponse = await fetch('public/text/fileSystem1.html');
    const fileSystem = await fileSystemResponse.text();
    const terminalResponse = await fetch('public/text/terminal1.txt');
    const terminal = await terminalResponse.text();
    const terminalHeaderResponse = await fetch('public/text/terminalHeader.txt');
    const terminalHeader = await terminalHeaderResponse.text();

    await writeText(htmlEditor, 0, time, '#editor', 'editor');
    await writeText(fileSystem, 0, time, '#fileSystem', 'fileSystem');
    await writeText(terminalHeader, 0, time, '#terminalHeader', 'terminal');
    await writeText(terminal, 0, time, '#terminal', 'terminal');
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
        //time = 800;
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
        console.log(document.getElementById(to.slice(1)).innerHTML);
        newHtml = document.getElementById(to.slice(1)).innerHTML;
        console.log(document.getElementById(to.slice(1)).innerHTML);
        htmlTagBuffer = '';
    } else if (startHtml) {
        htmlTagBuffer += message;

        newHtml += message;
    }
    else {
        newHtml += message;
        //time = window.innerWidth <= 578 ? 4 : 1;
        //time = 1;
    }


    $(to).html(newHtml);
    $('#style').append(message);

}



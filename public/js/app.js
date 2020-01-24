time = 1;
startComment = false;
startString = false;



(async function start() {
    const htmlEditorResponse = await fetch('public/text/editor1.txt');
    const htmlEditor = await htmlEditorResponse.text();
    const fileSystemResponse = await fetch('public/text/fileSystem1.txt');
    const fileSystem = await fileSystemResponse.text();
    const terminalResponse = await fetch('public/text/terminal1.txt');
    const terminal = await terminalResponse.text();
    const terminalHeaderResponse = await fetch('public/text/terminalHeader.txt');
    const terminalHeader = await terminalHeaderResponse.text();

    await writeText(htmlEditor, 0, time, '#editor', 'editor');
    await writeText(fileSystem, 0, time, '#fileSystem', 'fileSystem');
    await writeText(terminalHeader, 0, time, '#terminalHeader', 'terminal');
    await writeText(terminal, 0, time, '#terminal', 'terminal');
    await console.log("Hello World");
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
    if (message === '/' && startComment === false) {
        startComment = true;
        newHtml += message;
    } else if (message === '/' && startComment === true) {
        startComment = false;
        newHtml = $(to).html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
    } else if (startComment === true && (message === '.' || message === '?')) {
        newHtml += message;
        //time = 800;
    } else if (message === ';' && startComment === false) {
        newHtml = $(to).html().replace(/([^:]*)$/, '<em class="value">$1</em>;');
    } else if (message === '{') {
        newHtml = $(to).html().replace(/(.*)$/, '<em class="class">$1</em>{')
    } else {
        newHtml += message;
        //time = window.innerWidth <= 578 ? 4 : 1;
        //time = 1;
    }

    $(to).html(newHtml);
    $('#style').append(message);
}



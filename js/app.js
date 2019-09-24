time = 1;
startComment = false;
startString = false;


htmlEditor = "/*\n" +
    "* Hi\n" +
    "* Im Max. :waving_hand:\n" +
    "*\n" +
    "* I'm a Java Backend Developer and made this wonderful website.\n" +
    "*\n" +
    "* Wait what? You don't like it?\n" +
    "* ...\n" +
    "* Okay...Why's that?\n" +
    "*\n" +
    "* You think everything looks horrible?\n" +
    "*/\n" +
    "\n" +
    "body {\n" +
    " background-color: #1a1c24;\n" +
    " color: #abb2bf;\n" +
    "}\n" +
    "\n" +
    "/*\n" +
    "* Better now?\n" +
    "*\n" +
    "* No?\n" +
    "*\n" +
    "* Okay. Then lets start from scratch again.\n" +
    "* Let me fire up an editor real quick.\n" +
    "*\n" +
    "* Give me a second to fire up an editor real quick.\n" +
    "*/\n" +
    "\n" +
    "body {\n" +
    " font-family: 'Fira Mono', monospace;\n" +
    " margin= 0px;\n" +
    " overflow: hidden;\n" +
    "}\n" +
    "\n" +
    "#editor {\n" +
    " transition: left 500ms;\n" +
    " background-color: #282c34;\n" +
    " box-sizing: border-box;\n" +
    " overflow: auto;\n" +
    " float: right;\n" +
    " flex: 9 1 0px;\n" +
    " margin: 5px 5px 5px 5px;\n" +
    " padding: 5px 0px 0px 10px;\n" +
    "}\n" +
    "\n" +
    "#fileSystem {\n" +
    " background-color: #282c34;\n" +
    " flex: 2 1 0px;\n" +
    " overflow: auto;\n" +
    " margin: 5px 0px 5px 5px;\n" +
    " padding: 5px 0px 0px 10px;\n" +
    "}\n" +
    "\n" +
    "#terminalDiv {\n" +
    " background-color: #282c34;\n" +
    " margin: 0px 5px 5px 5px;\n" +
    "}\n" +
    "\n" +
    "#terminalHeader {\n" +
    " padding: 2px 0px 2px 10px;\n" +
    " color: #c426b4;\n" +
    " margin: 0px 0px 0px 0px;\n" +
    "}\n" +
    "\n" +
    "#terminal {\n" +
    " flex: 2 1 0px;\n" +
    " overflow: auto;\n" +
    " margin: 0px 0px 0px 0px;\n" +
    " padding: 2px 0px 5px 10px;\n" +
    " height: 20%;\n" +
    "}\n" +
    "\n" +
    "#fileSystemAndEditorDiv {\n" +
    " flex: 2 1 0px;\n" +
    "}\n" +
    "\n" +
    ".comment { color: #5c6370; }\n" +
    ".value { color: #56b6c2; }\n" +
    ".class { color: #de6d77; }";

fileSystem = "/* \n" +
    "* Hi \n" +
    "* Im Max. \n" +
    "* I normally don't do frontend stuff so excuse me if I just write this website while we are talking. \n" +
    "* ...\n" +
    "*/\n";

terminal = "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n" +
    "max@website ~ %\n";

terminalHeader = "Terminal";



(async function start() {
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
    var htmlSoFar = $(to).html();
    var newHtml = htmlSoFar;
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
        time = 1;
    }

    $(to).html(newHtml);
    $('#style').append(message);
}



// Terminal Logic
document.addEventListener('keydown', (e) => {
    if (e.key === '`' || (e.ctrlKey && e.key === 'k')) {
        toggleTerminal();
    }
});

function toggleTerminal() {
    let term = document.getElementById('cli-terminal');
    if (!term) {
        createTerminal();
        term = document.getElementById('cli-terminal');
    }
    term.classList.toggle('hidden');
    if (!term.classList.contains('hidden')) {
        document.getElementById('cli-input').focus();
    }
}

function createTerminal() {
    const html = `
    <div id="cli-terminal" class="hidden fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg p-8 font-mono text-green-500 overflow-y-auto" onclick="document.getElementById('cli-input').focus()">
        <div class="max-w-4xl mx-auto">
            <div class="mb-4 text-gray-500">
                HarshOS v2.0.5 (tty1)<br>
                Type 'help' for available commands.
            </div>
            <div id="cli-output" class="mb-2 space-y-1"></div>
            <div class="flex">
                <span class="mr-2">visitor@portfolio:~$</span>
                <input type="text" id="cli-input" class="bg-transparent border-none outline-none text-white w-full" autocomplete="off">
            </div>
        </div>
        <button class="absolute top-4 right-4 text-gray-500 hover:text-white" onclick="toggleTerminal()">[X]</button>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    const input = document.getElementById('cli-input');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            printOutput(`visitor@portfolio:~$ ${cmd}`);
            input.value = '';
            processCommand(cmd);
        }
    });
}

function printOutput(text, isHtml = false) {
    const output = document.getElementById('cli-output');
    const line = document.createElement('div');
    if (isHtml) line.innerHTML = text;
    else line.textContent = text;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
}

function processCommand(cmd) {
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
        case 'help':
            printOutput(`
Available commands:
  help        Show this help message
  about       Who am I?
  projects    List projects
  tools       List tools
  clear       Clear terminal
  whoami      Current user info
  contact     Get contact info
  exit        Close terminal
            `);
            break;
        case 'clear':
            document.getElementById('cli-output').innerHTML = '';
            break;
        case 'about':
            printOutput("Redirecting to /about...");
            setTimeout(() => window.location.href = 'pages/about.html', 1000);
            break;
        case 'projects':
            printOutput("Redirecting to /projects...");
            setTimeout(() => window.location.href = 'pages/projects.html', 1000);
            break;
        case 'tools':
            printOutput("Redirecting to /tools...");
            setTimeout(() => window.location.href = 'pages/tools.html', 1000);
            break;
        case 'whoami':
            printOutput("visitor (uid=1000, gid=1000)");
            break;
        case 'contact':
            printOutput("Email: harshmbhogayata@gmail.com");
            printOutput("LinkedIn: /in/harshbhogayata");
            break;
        case 'exit':
            toggleTerminal();
            break;
        case '':
            break;
        default:
            printOutput(`Command not found: ${command}. Type 'help' for list.`);
    }
}

// Init terminal listener
console.log("Terminal loaded. Press ` to open.");

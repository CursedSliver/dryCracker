function loadData() {
    for (let i of 'abcdefghijklmnopqrstuvwxyz') {
        const script = document.createElement('script');
        script.src = './dataFiles/' + i + 'Data.js';
        script.type = 'text/javascript';
        document.head.appendChild(script);
    }
}
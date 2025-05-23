let namesDataLoaded = false;
function loadData() {
    if (namesDataLoaded) { return; }
    for (let i of 'abcdefghijklmnopqrstuvwxyz') {
        const script = document.createElement('script');
        script.src = './dataFiles/dataFilesNames/' + i + 'Data.js';
        script.type = 'text/javascript';
        document.head.appendChild(script);
    }
    namesDataLoaded = true;
}

function loadTData(str, destination) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    loadStatuses[destination]++;
    for (let i of alphabet) {
        fetch('./dataFiles/' + str + '/' + i + 'Data.json').then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(data => { tData[destination][i] = data; loadStatuses[destination]++; });
    }
}

const loadStatuses = {
    normal: 0,
    complete: 0,
    simplified: 0
}
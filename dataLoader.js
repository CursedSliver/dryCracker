let namesDataLoaded = false;
function loadData() {
    if (namesDataLoaded) { return; }
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i of alphabet) {
        fetch('./dataFiles/' + str + '/' + i + 'Data.json').then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(data => { tData[destination][i] = data; loadStatuses[destination]++; });
    }

    document.getElementById('outputBoxTypes').value = 'Fetching data...';
    namesDataLoaded = true;
}

function loadTData(str, destination, failBox) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (loadStatuses[destination] > 0) {
        return;
    }
    loadStatuses[destination]++;
    for (let i of alphabet) {
        try {
        fetch('./dataFiles/' + str + '/' + i + 'Data.json').then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(data => { tData[destination][i] = data; loadStatuses[destination]++; });
        } catch (err) {
            document.getElementById(failBox).textContent = 'Failed to fetch data!';
            break; 
        }
    }

    document.getElementById('outputBoxTypes').value = 'Fetching data...';
}

const loadStatuses = {
    normal: 0,
    complete: 0,
    simplified: 0,
}
async function loadTData(str, destination, box) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (loadStatuses[destination] > 0) {
        return;
    }
    loadStatuses[destination]++;
    for (let i of alphabet) {
        try {
            document.getElementById(box).value = 'Fetching data... (' + (alphabet.indexOf(i) / 26 * 100).toFixed(0) + '%)';
            await fetch('./dataFiles/' + str + '/' + i + 'Data.json').then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then(data => { tData[destination][i] = data; loadStatuses[destination]++; });
        } catch (err) {
            document.getElementById(box).textContent = 'Failed to fetch data!';
            break; 
        }
    }
}

const loadStatuses = {
    normal: 0,
    complete: 0,
    simplified: 0,
    names: 0
}
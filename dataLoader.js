let dataLoadSimultaneous = 4; // Number of simultaneous data loads
async function loadTData(str, destination, box) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (loadStatuses[destination] > 0) {
        return;
    }
    loadStatuses[destination]++;
    for (let i = 0; i < alphabet.length; i += dataLoadSimultaneous) {
        const promises = [];
        for (let j = 0; j < dataLoadSimultaneous && (i + j) < alphabet.length; j++) {
            const letter = alphabet[i + j];
            const url = `./dataFiles/${str}/${letter}Data.json`;
            promises.push(
            fetch(url)
                .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
                })
                .then(data => { 
                tData[destination][letter] = data; 
                loadStatuses[destination]++; 
                })
                .catch(err => {
                document.getElementById(box).textContent = 'Failed to fetch data!';
                throw err;
                })
            );
        }
        document.getElementById(box).value = 'Fetching data... (' + (i / 26 * 100).toFixed(0) + '%)';
        try {
            await Promise.all(promises);
        } catch (err) {
            break;
        }
    }
}

const loadStatuses = {
    normal: 0,
    complete: 0,
    simplified: 0,
    binary: 0,
    names: 0
}
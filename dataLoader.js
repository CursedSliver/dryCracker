let dataLoadSimultaneous = 8; // Number of simultaneous data loads
async function loadTData(str, destination, box) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (loadStatuses[destination] > 0) {
        return;
    }
    loadStatuses[destination]++;
    let loadedCount = 0;
    const total = alphabet.length;

    function updateProgress() {
        const percent = ((loadedCount / total) * 100).toFixed(0);
        document.getElementById(box).value = `Fetching data... (${percent}%)`;
    }

    const stream = new ReadableStream({
        async start(controller) {
            for (let i = 0; i < alphabet.length; i++) {
                const letter = alphabet[i];
                const url = `./dataFiles/${str}/${letter}Data.json`;
                controller.enqueue({ letter, url });
            }
            controller.close();
        }
    });

    const reader = stream.getReader();
    const fetchNext = async () => {
        const { value, done } = await reader.read();
        if (done) return;
        const { letter, url } = value;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            tData[destination][letter] = data;
        } catch (err) {
            document.getElementById(box).textContent = 'Failed to fetch data! (Try disabling your adblocker, if you have one)';
            throw err;
        }
        loadedCount++;
        updateProgress();
        await fetchNext();
    };

    const workers = [];
    for (let i = 0; i < dataLoadSimultaneous; i++) {
        workers.push(fetchNext());  
    }
    try {
        await Promise.all(workers);
        loadStatuses[destination] += loadedCount;
    } catch (e) {

    }
}

const loadStatuses = {
    normal: 0,
    complete: 0,
    simplified: 0,
    binary: 0,
    names: 0
}
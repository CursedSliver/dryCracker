let dataLoadSimultaneous = 8; 
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

/*
Game.timers = {};
for (let i in Game.Objects) { Game.timers[i] = Date.now(); }
Game.registerHook('logic', function() { 
    for (let i in Game.Objects) {
        if (Game.Objects[i].amount && Game.timers[i] + 1000 < Date.now()) { 
            Game.Objects[i].sacrifice(1);
            Game.timers[i] += 1000;
        }
    }
    for (let i in Game.shimmers) {
        if (Game.shimmers[i].type != 'golden') { continue; }
        if (Game.shimmers[i].life / Game.fps < Game.shimmers[i].dur - 5) { Game.shimmers[i].l.click(); }
    }
    for (let i = 0; i < Math.floor((Date.now() - Game.lastClick - 5) / (1000 / 50)); i++) {
        Game.lastClick += (1000 / 50);
        Game.ClickCookie(undefined, undefined, true);
    }
});
for (let i in Game.Objects) {
    eval('Game.Objects["' + i + '"].buy='+Game.Objects[i].buy.toString().replace(`Game.Spend(price);`, `Game.Spend(price); if (this.amount == 0) { Game.timers['${i}'] = Date.now(); }`));
}
setTimeout(function() { eval('Game.ClickCookie='+Game.ClickCookie.toString().replace('amount)', 'amount, noUpdate)').replace('Game.lastClick=now;', 'if (!noUpdate) { Game.lastClick=now; }')); }, 100);*/

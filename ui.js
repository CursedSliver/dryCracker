let grandmaSlots = [];
for (let i = 0; i < 50; i++) {
    grandmaSlots.push(-1);
}
//to do later: implement a keyboard to do the grandmas
//dynamic finds instead of pressing a button (shows more to fill whenever needed)
const container = document.getElementById('grandmaContainer');
for (let i = 1; i <= 50; i++) {
    const containerI = document.createElement('div');
    containerI.className = 'container';
    const boxDiv = document.createElement('div');
    boxDiv.className = 'grandmaBox';
    boxDiv.id = `grandmaBox${i}`;
    if (i > 10) { containerI.style.display = 'none'; }
    const indicator = document.createElement('div');
    indicator.className = 'topIndicator';
    indicator.textContent = i;
    const label = document.createElement('div');
    label.id = `typeLabel${i}`;
    label.class = 'typeLabel'
    boxDiv.appendChild(indicator);
    containerI.appendChild(boxDiv);
    containerI.appendChild(label);
    container.appendChild(containerI);
    const box = document.getElementById(`grandmaBox${i}`);
    if (box) {
        box.addEventListener('click', (e) => {
            let idx = i - 1;
            if (e.ctrlKey || e.shiftKey) {
                grandmaSlots[idx]--;
                if (grandmaSlots[idx] < -1) grandmaSlots[idx] = 19;
            } else {
                grandmaSlots[idx]++;
                if (grandmaSlots[idx] > 19) grandmaSlots[idx] = -1;
            }
            if (grandmaSlots[idx] === -1) {
                box.style.background = '';
                document.getElementById('typeLabel' + (idx + 1)).textContent = '';
                return;
            } 
            box.style.background = 'url(./imgs/' + grandmaTypesFixed[grandmaSlots[idx]] + '.png) no-repeat center center';
            let display = grandmaTypesFixed[grandmaSlots[idx]] + '<br><span style="font-size: 60%">' + buildings[grandmaSlots[idx]] + '</span>';
            if (display != 'grandma') { display = display.replace('Grandma', ''); }
            document.getElementById('typeLabel' + (idx + 1)).innerHTML = display;
        });
    }
}

function crackBasedOnConfigs() {
    if (grandmaSlots[0] === -1 || grandmaSlots[1] === -1 || grandmaSlots[2] === -1) { 
        alert('Please select more grandmas.');
        return;
    }
    const c = grandmaSlots.slice(0, 10)
        .filter(x => x !== -1)
        .map(x => grandmaTypesFixed[x]);
    getSeedFromGrandmaTypes(
        convertTypesToNumbers(c),
        (document.getElementById('seasonalGrandmaCheckbox').checked?allPossiblePresent:allNormalsPresent)
    );
}
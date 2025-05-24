let grandmaSlots = [];
let slotsShownThreshold = 10;
let grandmasEnabled = [];
for (let i = 0; i < 50; i++) {
    grandmaSlots.push(-1);
}
for (let i = 0; i < 21; i++) {
    grandmasEnabled.push(true);
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
    if (i > slotsShownThreshold) { containerI.style.display = 'none'; }
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
                if (grandmaSlots[idx] < -1) grandmaSlots[idx] = 20;
            } else {
                grandmaSlots[idx]++;
                if (grandmaSlots[idx] > 20) grandmaSlots[idx] = -1;
            }
            if (grandmaSlots[idx] === -1) {
                box.style.background = '';
                document.getElementById('typeLabel' + (idx + 1)).textContent = '';
                return;
            } 
            updateSlot(box, idx);
        });
    }
}
function updateSlot(box, idx) {
    box.style.background = 'url(./imgs/' + grandmaTypesFixed[grandmaSlots[idx]] + '.png) no-repeat center center';
    let display = grandmaTypesFixed[grandmaSlots[idx]] + '<br><span style="font-size: 60%">' + buildings[grandmaSlots[idx]] + '</span>';
    if (display != 'grandma') { display = display.replace('Grandma', ''); }
    document.getElementById('typeLabel' + (idx + 1)).innerHTML = display;
}

const containerTypes = document.getElementById('grandmasPresentContainer');
for (let i = 0; i < 21; i++) {
    const containerI = document.createElement('div');
    containerI.className = 'container';
    const boxDiv = document.createElement('div');
    boxDiv.className = 'grandmaBox small';
    boxDiv.id = `grandmaPresentBox${i}`;
    containerI.appendChild(boxDiv);
    boxDiv.style.background = 'url(./imgs/' + grandmaTypesFixed[i] + '.png) no-repeat center center';
    boxDiv.style.border = grandmasEnabled[i]?'1px solid #111':'1px dashed #ccc';
    boxDiv.style.filter = 'brightness('+(grandmasEnabled[i]?'1':'0.6')+')';
    containerTypes.appendChild(containerI);
    const box = document.getElementById(`grandmaPresentBox${i}`);
    if (box) {
        box.addEventListener('click', (e) => {
            grandmasEnabled[i] = !grandmasEnabled[i];
            if (e.shiftKey) { 
                for (let ii = 0; ii < i; ii++) {
                    grandmasEnabled[ii] = grandmasEnabled[i];
                }
                refreshAll();
            }
            updateType(box, i);
        });
    }
}
function updateType(box, i) {
    box.style.border = grandmasEnabled[i]?'1px solid #111':'1px dashed #ccc';
    box.style.filter = 'brightness('+(grandmasEnabled[i]?'1':'0.6')+')';
}
document.getElementById(`grandmaPresentBox19`).click();
document.getElementById(`grandmaPresentBox20`).click();

function crackBasedOnConfigs() {
    if (grandmaSlots.slice(0, 5).includes(-1)) { 
        alert('Please select more grandmas.');
        return;
    }
    const c = grandmaSlots.slice(0, 10)
        .filter(x => x !== -1)
        .map(x => grandmaTypesFixed[x]);
    getSeedFromGrandmaTypes(
        convertTypesToNumbers(c),
        (grandmasEnabled.map((e, i) => { if (e) { return fixedOrder[i]; } else { return -1; } }).filter(e => { return e != -1; }))
    );
}

function exportGrandmas() {
    let str1 = '';
    let str2 = '';
    for (let i in grandmaSlots) { 
        str1 += grandmaSlots[i] + '+';
    }
    for (let i in grandmasEnabled) {
        str2 += grandmasEnabled[i]?1:0;
    }
    return str1 + '/+' + str2;
}
function importGrandmas(str) {
    let slots = str.split('+/+')[0].split('+');
    let types = str.split('+/+')[1];
    console.log(slots, types);
    for (let i in slots) {
        grandmaSlots[i] = parseInt(slots[i]);
    }
    for (let i in grandmasEnabled) {
        grandmasEnabled[i] = Boolean(parseInt(types[i]));
    }
    refreshAll();
}
function refreshAll() {
    for (let i in grandmaSlots) {
        if (parseInt(i) < slotsShownThreshold) { document.getElementById(`grandmaBox${(parseInt(i) + 1)}`).parentNode.style.display = ''; }
        else { document.getElementById(`grandmaBox${(parseInt(i) + 1)}`).parentNode.style.display = 'none'; }
        if (grandmaSlots[i] == -1) { continue; }
        updateSlot(document.getElementById(`grandmaBox${(parseInt(i) + 1)}`), parseInt(i));
    }    
    for (let i in grandmasEnabled) {
        updateType(document.getElementById(`grandmaPresentBox${i}`), parseInt(i));
    }
}
//importGrandmas("3+1+9+10+10+3+8+9+3+2+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+-1+/+111110011110000000000");
const Gnames = ['Granny','Gusher','Ethel','Edna','Doris','Maud','Hilda','Gladys','Michelle','Michele','Phyllis','Millicent','Muriel','Myrtle','Mildred','Mavis','Helen','Gloria','Sheila','Betty','Gertrude','Agatha','Beryl','Agnes','Pearl','Precious','Ruby','Vera','Bonnie','Ada','Bunny','Cookie','Darling','Gaga','GamGam','Memaw','Mimsy','Peanut','Nana','Nan','Tootsie','Warty','Stinky','Heinous'];
const numMap = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^_*()?'.split('');
//remember to replaceall the amps with _
let data = {}; //a: ... b: ... c: ... etc.
const lengthPerSeed = 10; //chances of collision is essentially zero

(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a,a.navigator.plugins,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);

const script = document.createElement('script');
script.src = './dataLoader.js';
document.head.appendChild(script);

function findMatchingSeeds(names) {
    let nameStr = '';
    for (let i = 0; i < names.length; i++) {
        nameStr += numMap[Gnames.indexOf(names[i])];
    }
    let possibleSeeds = [];

    for (let i in data) {
        for (let ii = 0; ii < data[i].length; ii += lengthPerSeed) {
            if (!(data[i].slice(ii, ii + nameStr.length) == nameStr)) {
                continue;
            }

            const index = ii / lengthPerSeed;
            possibleSeeds.push(i + index);
        }
    }

    return compileOutput(possibleSeeds);
}

function compileOutput(possibleSeeds) {
    //find how to map from index to the actual seed here
    //z -> a, last one changes first, floor(thing / 26 ** 3) % 26, floor(thing / 26 ** 2) % 26, floor(thing / 26) % 26, thing % 26
    let possibleSeedsOutput = [];
    for (let i in possibleSeeds) {
        let str = possibleSeeds[i][0];
        let num = parseInt(possibleSeeds[i].slice(1));
        str += numMap[Math.floor(num / (26 ** 3)) % 26];
        str += numMap[Math.floor(num / (26 ** 2)) % 26];
        str += numMap[Math.floor(num / (26 ** 1)) % 26];
        str += numMap[num % 26];
        possibleSeedsOutput.push(str);
    }
    return possibleSeedsOutput;
}

function crackSeedAndOutput() {
    let names = [];
    let prev = 'temp';
    for (let i = 0; i < lengthPerSeed; i++) {
        const select = document.getElementById('dropdown-' + i);
        if (select.value !== '' && prev === '') {
            alert('Do not jump inputs around. Please select the names in order from left to right.');
            return;
        }
        prev = select.value;
        if (select.value === '') {
            continue;
        }
        names.push(select.value);
    }
    if (names.length < 3) {
        alert('Please select at least three names.');
        return;
    }

    let result = findMatchingSeeds(names);
    let str = '';
    for (let i in result) {
        str += result[i] + '\n';
    }
    if (!str) {
        str = 'No matching seeds found!';
    }
    const output = document.getElementById('outputBox');   
    output.value = str;
}

const inputContainer = document.getElementById('inputContainer');

for (let i = 0; i < lengthPerSeed; i++) {
    const select = document.createElement('select');
    select.id = `dropdown-${i}`;
    select.className = 'GNameDropdown';
    const optionNull = document.createElement('option');
    optionNull.value = '';
    optionNull.textContent = 'Grandma ' + (i + 1);
    select.appendChild(optionNull);
    JSON.parse(JSON.stringify(Gnames)).sort().forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
    inputContainer.appendChild(select);
}

function test(seed) {
    let dataN = '';
    for (let i = 0; i < lengthPerSeed; i++) {
        Math.seedrandom(seed + ' ' + i);
        Math.random();
        dataN += numMap[Math.floor(Math.random() * Gnames.length)];
    }
    return dataN;
}

//"cnxjw" ['Doris', 'Cookie', 'Ethel', 'Michele', 'Gertrude']











const grandmaTypes = [
    'grandma',
    'farmerGrandma',
    'workerGrandma',
    'minerGrandma',
    'cosmicGrandma',
    'transmutedGrandma',
    'alteredGrandma',
    'grandmasGrandma',
    'antiGrandma',
    'rainbowGrandma',
    'bankGrandma',
    'templeGrandma',
    'witchGrandma',
    'luckyGrandma',
    'metaGrandma',
    'scriptGrandma',
    'alternateGrandma',
    'brainyGrandma',
    'cloneGrandma',
    'elfGrandma',
    'bunnyGrandma'
];
const fixedOrder = [
    //order on building menu translated to icon x pos
    0, 
    1,
    3, 
    2, 
    10, 
    11,
    12, 
    4, 
    5, 
    6, 
    7,
    8,
    9,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
];
const grandmaTypesFixed = fixedOrder.map(i => grandmaTypes[i]);
const buildings = [
    'Grandma',
    'Farm',
    'Mine',
    'Factory',
    'Bank',
    'Temple',
    'Wizard Tower',
    'Shipment',
    'Alchemy Lab',
    'Portal',
    'Time Machine',
    'Antim. Condenser',
    'Prism',
    'Chancemaker',
    'Fractal Engine',
    'Javascript Console',
    'Idleverse',
    'Cortex Baker',
    'You',
    '(Seasonal)'
]

function quickCalls(orderArr, amount) {
    let present = [];
    for (let i = 0; i < amount; i++) {
        present.push(fixedOrder[i]);
    }
    getSeedFromGrandmaTypes(convertTypesToNumbers(orderArr), present)
}

function convertTypesToNumbers(orderArr) {
    //convert grandma types to numbers
    for (let i in orderArr) {
        orderArr[i] = grandmaTypes.indexOf(orderArr[i]);
        if (orderArr[i] === -1) {
            throw new Error('Invalid grandma type: ' + orderArr[i]);
        }
    }
    return orderArr;
}

//below for grandma type seed cracking
//if some grandma types are skipped, orderArr is pressed down such that it contains all integers >=0 <amountPresent
//in orderArr is 0 to 20 representing the different types
function getSeedFromGrandmaTypes(orderArr, present) {
    //normalize arrays
    let absent = {};
    let largest = Math.max(...present);
    present.sort((a, b) => a - b);
    let num = 0;
    for (let i = 0; i <= largest; i++) {
        if (present.includes(i)) { absent[i] = num; } else { num++; }
    }
    for (let i in orderArr) {
        orderArr[i] -= absent[orderArr[i]];
    }
    for (let i in present) {
        present[i] -= absent[present[i]];
    }
    console.log(orderArr);
    const amount = present.length;

    //determine which scheme to use
    if (amount === 19) {
        if (loadStatuses['normal'] >= 1 && loadStatuses['normal'] < 27) { return; }
        loadTData('dataFilesTypeNormal', 'normal');
        awaitData('normal', getSeedFromAllNormals, orderArr, amount);
    } else if (amount === 20) { 
        if (loadStatuses['complete'] >= 1 && loadStatuses['complete'] < 27) { return; }
        loadTData('dataFilesTypeComplete', 'complete');
        awaitData('complete', getSeedFromComplete, orderArr, amount);
    } else if (amount >= 21) {
        throw new Error('Invalid amount of grandma types present');
    } else if (amount >= 4) {
        if (loadStatuses['simplified'] >= 1 && loadStatuses['simplified'] < 27) { return; }
        loadTData('dataFilesTypeSimplified', 'simplified');
        awaitData('simplified', getSeedFromSimplified, orderArr, amount);
    } else {
        throw new Error('Not enough grandma types present');
    }
}
function awaitData(key, func, arg1, arg2) {
    if (loadStatuses[key] >= 27) {
        console.log('debuf2');
        return displaySeeds(func(arg1, arg2));
    }
    const interval = setInterval(() => {
        if (loadStatuses[key] >= 27) {
            clearInterval(interval);
            console.log('debuf');
            displaySeeds(func(arg1, arg2));
        }
    }, 10);
}
function displaySeeds(result) {
    let str = '';
    for (let i in result) {
        str += result[i] + '\n';
    }
    if (!str) {
        str = 'No matching seeds found!';
    }
    const output = document.getElementById('outputBoxTypes');   
    output.value = str;
    return result;
}

let tData = {
    normal: {},
    complete: {},
    simplified: {} 
}
const allNormalsPresent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const lengthPerNearCompleteSeed = 13;
function getSeedFromAllNormals(orderArr) {
    //exactly 19 grandma types, default without invoking seasons
    //something something 13 grandma types to guarantee a lack of collision
    //orderArr is 0 to 18 representing the different types
    orderArr = orderArr.slice(0, Math.min(orderArr.length, lengthPerNearCompleteSeed));

    let orderStr = '';
    for (let i = 0; i < orderArr.length; i++) {
        orderStr += numMap[orderArr[i]];
    }
    
    let possibleSeeds = [];
    for (let i in tData.normal) {
        for (let ii = 0; ii < tData.normal[i].length; ii += lengthPerNearCompleteSeed) {
            if (!(tData.normal[i].slice(ii, ii + orderStr.length) == orderStr)) {
                continue;
            }

            const index = ii / lengthPerNearCompleteSeed;
            possibleSeeds.push(i + index);
        }
    }

    return compileOutput(possibleSeeds);
}

const allPossiblePresent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const lengthPerCompleteSeed = 13;
function getSeedFromComplete(orderArr) {
    //exactly 20 grandma types, which is with either easter or christmas
    orderArr = orderArr.slice(0, Math.min(orderArr.length, lengthPerCompleteSeed));

    let orderStr = '';
    for (let i = 0; i < orderArr.length; i++) {
        orderStr += numMap[orderArr[i]];
    }
    
    let possibleSeeds = [];
    for (let i in tData.complete) {
        for (let ii = 0; ii < tData.complete[i].length; ii += lengthPerCompleteSeed) {
            if (!(tData.complete[i].slice(ii, ii + orderStr.length) == orderStr)) {
                continue;
            }

            const index = ii / lengthPerCompleteSeed;
            possibleSeeds.push(i + index);
        }
    }

    return compileOutput(possibleSeeds);
}

const lengthPerMinimalSeed = 50; //actually 25 in practice, accomodates for a minimum ranges allocation resolution of 2 parts (e.g. for 0-0.5, 0.5-1), eliminates collisions fairly hard
const simplifyingMap = {
    2: 2,
    3: 2,
    4: 4,
    5: 2,
    6: 2,
    7: 2,
    8: 8,
    9: 4,
    10: 4,
    11: 4,
    12: 8,
    13: 8,
    14: 8,
    15: 8,
    16: 8,
    17: 8,
    18: 8
}
function getCrossings(original, toFit) {
    //slightly buggy rn
    if (original % toFit === 0) { return []; }
    const crossings = [];
    for (let i = 0; i < original; i++) {
        const startBucket = Math.floor((i * toFit) / original);
        const endBucket = Math.floor(((i + 1) * toFit) / original);
        if (endBucket > startBucket && endBucket != toFit) {
            crossings.push(i);
        }
    }
    return crossings;
}
//getSeedFromGrandmaTypes([0, 3, 3, 2], [0, 1, 2, 3]);
//cnwjx: getSeedFromGrandmaTypes(convertTypesToNumbers(['workerGrandma', 'farmerGrandma', 'alteredGrandma', 'grandmasGrandma', 'grandmasGrandma', 'workerGrandma', 'transmutedGrandma', 'alteredGrandma', 'workerGrandma', 'minerGrandma', 'grandma', 'grandma', 'grandma', 'grandmasGrandma', 'alteredGrandma', 'grandma']), [0, 1, 2, 3, 4, 5, 6, 7])
function decodeFirst(char) {
    const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_+`;
    const f = alphabet.indexOf(char).toString(8);
    return parseInt(f[f.length - 2] ?? 0);
}
function decodeSecond(char) {
    const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_+`;
    const f = alphabet.indexOf(char).toString(8);
    return parseInt(f[f.length - 1])
}
function getSeedFromSimplified(orderArr, amount) {
    //assumes 8, 4, or 2 types, discards unusable inputs
    const simplifiedDivide = simplifyingMap[amount];
    const crossings = getCrossings(amount, simplifiedDivide);
    orderArr = orderArr.slice(0, Math.min(orderArr.length, lengthPerMinimalSeed));

    console.log(orderArr, crossings);

    for (let i in orderArr) {
        if (crossings.includes(orderArr[i] / amount)) { orderArr[i] = null; continue; }
        orderArr[i] = Math.floor(orderArr[i] / amount * simplifiedDivide);
    }
    if (orderArr.length % 2 !== 0) {
        orderArr.push(null);
    }
    //console.log(orderArr);

    let possibleSeeds = [];
    for (let i in tData.simplified) {
        loop:
        for (let ii = 0; ii < tData.simplified[i].length; ii += lengthPerMinimalSeed) {
            const content = tData.simplified[i].slice(ii, ii + lengthPerMinimalSeed);
            for (let iii = 0; iii < orderArr.length / 2; iii++) {
                if (orderArr[iii] === null) { continue; }
                if (Math.floor(decodeFirst(content[iii]) * simplifiedDivide / 8) !== orderArr[iii * 2]) {
                    continue loop;
                }
                if (Math.floor(decodeSecond(content[iii]) * simplifiedDivide / 8) !== orderArr[iii * 2 + 1]) {
                    continue loop;
                }
            }

            const index = ii / lengthPerMinimalSeed;
            possibleSeeds.push(i + index);
        }
    }

    return compileOutput(possibleSeeds);
}
 
function test(seed) {
    let dataN = '';
    for (let i = 0; i < lengthPerNearCompleteSeed; i++) {
        Math.seedrandom(seed + ' 1 ' + i);
        Math.random(); Math.random(); 
        dataN += Math.floor(Math.random() * 19) + '\n';
    }
    return dataN;
}
function verify(arr) {
    let str = '';
    const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_+`;
    for (let i = 0; i < arr.length; i += 2) {
        str += alphabet[arr[i] * 8 + arr[i + 1]];
    }
    return str;
}



//test('cnxjw');
//getSeedFromGrandmaTypes(convertTypesToNumbers(['alteredGrandma', 'minerGrandma', 'witchGrandma', 'metaGrandma', 'scriptGrandma']), allNormalsPresent)
const Gnames = ['Granny','Gusher','Ethel','Edna','Doris','Maud','Hilda','Gladys','Michelle','Michele','Phyllis','Millicent','Muriel','Myrtle','Mildred','Mavis','Helen','Gloria','Sheila','Betty','Gertrude','Agatha','Beryl','Agnes','Pearl','Precious','Ruby','Vera','Bonnie','Ada','Bunny','Cookie','Darling','Gaga','GamGam','Memaw','Mimsy','Peanut','Nana','Nan','Tootsie','Warty','Stinky','Heinous'];
const numMap = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^_*()+[]{}|;:,.<>?'.split('');
//remember to replaceall the amps with _
let data = {}; //a: ... b: ... c: ... etc.
const lengthPerSeed = 10; //chances of collision is essentially zero

(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a,a.navigator.plugins,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);

const script = document.createElement('script');
script.src = './dataLoader.js';
script.onload = () => {
    loadData();
};
document.head.appendChild(script);

function findMatchingSeeds(names) {
    let nameStr = '';
    for (let i = 0; i < names.length; i++) {
        nameStr += numMap[Gnames.indexOf(names[i])];
    }
    let possibleSeeds = [];

    for (let i in data) {
        for (let ii = 0; ii < data[i].length; ii += lengthPerSeed) {
            if (!(data[i].slice(ii, ii + lengthPerSeed).indexOf(nameStr) == 0)) {
                continue;
            }

            const index = ii / lengthPerSeed;
            possibleSeeds.push(i + index);
        }
    }

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
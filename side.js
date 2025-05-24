let grandmaLvl = 0;
let currentTime = ((Date.now()-new Date(2013,7,8))/(1000*60*60*24*365));
//overrides Math.seedrandom
(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a,a.navigator.plugins,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);

function crackSeed(grandmaNames) {
    currentTime = ((Date.now()-new Date(2013,7,8))/(1000*60*60*24*365));
    return helper('', grandmaNames);
}

function crackSeedIterative(grandmaNames) {
    currentTime = ((Date.now()-new Date(2013,7,8))/(1000*60*60*24*365));
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const stack = ['']; // Start with an empty string
    const possibleSeeds = [];

    while (stack.length > 0) {
        const current = stack.pop();

        if (current.length === 5) {
            const result = checkSeed(current, grandmaNames);
            if (result) {
                possibleSeeds.push(result);
            }
        } else {
            for (let i = 0; i < alphabet.length; i++) {
                stack.push(current + alphabet[i]);
            }
        }
    }

    return possibleSeeds;
}

function helper(str, grandmaNames) {
    if (str.length === 5) {
        return checkSeed(str, grandmaNames);
    }
    let possibleSeeds = [];
    for (let i of 'abcdefghijklmnopqrstuvwxyz') {
        const result = helper(str + i, grandmaNames);
        if (result && result.length) {
            possibleSeeds = possibleSeeds.concat(result);
        }
    }
    return possibleSeeds;
}

function checkSeed(seed, names) {
    //does this seed correspond to this set of names?
    for (let i in names) {
        Math.seedrandom(seed + ' ' + i);
        Math.random();
        const randomName = Gnames[Math.floor(Math.random() * Gnames.length)];
        if (names[i] !== randomName) {
            return false;
        }
    }
    return seed;
}

function computeData(initial) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const stack = ['']; // Start with an empty string
    let dataN = '';

    while (stack.length > 0) {
        const current = stack.pop();

        if (stack.length % 10000 === 0) { console.log(stack.length); }

        if (current.length === 4) {
            for (let i = 0; i < lengthPerSeed; i++) {
                Math.seedrandom(initial + current + ' ' + i);
                Math.random();
                dataN += numMap[Math.floor(Math.random() * Gnames.length)];
            }
        } else {
            for (let i = 0; i < alphabet.length; i++) {
                stack.unshift(current + alphabet[i]);
            }
        }
    }

    return dataN;
}

//test
//crackSeed(['Doris', 'Cookie', 'Ethel']);
//optimize test 
//let time = Date.now();
//recursive: 
//crackSeed(['Doris', 'Cookie', 'Ethel', 'Michele', 'Gertrude']);
//iterative: 
//crackSeedIterative(['Doris', 'Cookie', 'Ethel']); 
//let timeNew = Date.now(); 
/*
(function() { 
    const c = 0;
    for (let i = 0; i < 13; i++) {
        console.log('doing ' + numMap[i + c]);
        document.getElementById('result' + i).textContent = data[numMap[i + c]].replaceAll('&amp;', '_');
    }
})();*/

//(function() { document.getElementById('result0').textContent = data.a.replaceAll('&amp;', '_'); })()

//Math.seedrandom('cnxjw' + ' 1 19'); Math.random(); Math.random(); Math.random(); Math.random(); console.log(grandmaTypes[Math.floor(Math.random() * 3)], grandmaTypes[Math.floor(Math.random() * 3)], grandmaTypes[Math.floor(Math.random() * 3)], grandmaTypes[Math.floor(Math.random() * 3)], grandmaTypes[Math.floor(Math.random() * 3)], grandmaTypes[Math.floor(Math.random() * 3)]);

function computeTypesData(initial, amount) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const stack = ['']; // Start with an empty string
    let dataN = '';

    while (stack.length > 0) {
        const current = stack.pop();

        if (stack.length % 10000 === 0) { console.log(stack.length); }

        if (current.length === 4) {
            for (let i = 0; i < lengthPerCompleteSeed; i++) {
                Math.seedrandom(initial + current + ' 1 ' + i);
                Math.random(); Math.random(); 
                dataN += numMap[Math.floor(Math.random() * amount)];
            }
        } else {
            for (let i = 0; i < alphabet.length; i++) {
                stack.unshift(current + alphabet[i]);
            }
        }
    }

    return dataN;
}

function computeDualTypesData(initial) {
    const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_+`;
    const stack = ['']; // Start with an empty string
    let dataN = '';

    while (stack.length > 0) {
        const current = stack.pop();

        if (stack.length % 10000 === 0) { console.log(stack.length); }

        if (current.length === 4) {
            for (let i = 0; i < lengthPerMinimalSeed; i += 2) {
                Math.seedrandom(initial + current + ' 1 ' + i);
                Math.random(); Math.random(); 
                const f = Math.floor(Math.random() * 8);
                Math.seedrandom(initial + current + ' 1 ' + (i + 1));
                Math.random(); Math.random(); 
                dataN += alphabet[f * 8 + Math.floor(Math.random() * 8)];
            }
        } else {
            for (let i = 0; i < 26; i++) {
                stack.unshift(current + alphabet[i]);
            }
        }
    }

    return dataN;
}

(function() { 
    const c = 25;
    for (let i = 0; i < 1; i++) {
        console.log('doing ' + numMap[i + c]);
        const buttonElement = document.createElement('button');
        buttonElement.textContent = `Copy ${numMap[i + c]}`;
        tData.simplified[numMap[i + c]] = computeDualTypesData(numMap[i + c]);
        buttonElement.onclick = () => {
            navigator.clipboard.writeText(tData.simplified[numMap[i + c]]).then(() => {
            console.log(`Copied ${numMap[i + c]} data to clipboard`);
            }).catch(err => {
            console.error('Failed to copy text: ', err);
            });
        };
        document.body.appendChild(buttonElement);
    }
})();


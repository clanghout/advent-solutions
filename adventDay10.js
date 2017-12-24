const input10 = "102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216";
const testIn = "1,2,3";

function computeAdvent10(inp, size) {
    if (!size) {
        size = 256;
    }

    let asciiInput = inp.split('').map(a => a.charCodeAt(0));
    const defaultAppend = [17, 31, 73, 47, 23];
    asciiInput = _.concat(asciiInput,defaultAppend);

    // create array from 0 to size
    let curList = [...Array(size).keys()];
    let skipSize = 0;
    let curPos = 0;

    for(let round = 0;round<64;round++){
        for (let i = 0; i < asciiInput.length; i++) {
            curList = doHashRound(curList, asciiInput[i], curPos);
            curPos = (curPos + (asciiInput[i] + skipSize)) % curList.length;
            skipSize++;
        }
    }

    let charList = [];
    while(curList.length > 0){
        charList.push(curList.splice(0,16));
    }
    const hashChars = charList.map(a => computeXor(a).toString(16));

    return hashChars.reduce((acc, curr) => {
            if (curr.length === 1) {
                acc += "0"
            }
            acc += curr;
            return acc;
        }
    );
}

function doHashRound(curState, i, curPos) {
    let startLength = curState.length;
    let toRotate = curState.splice(curPos,i);
    // fill toRotate with the rest...
    if(toRotate.length < i){

        let extraRotate = curState.splice(0,i-toRotate.length);
        toRotate = _.concat(toRotate,extraRotate);
    }
    toRotate.reverse();
    let result = curState.slice();
    for(let j = curPos;j<(curPos+toRotate.length);j++){
        let rotateI = j-curPos;
        if(j<startLength){
            // Add to the position j until end of 'startList' is reached.
            result.splice(j,0,toRotate[rotateI]);}
        else{
            // Add to start of list, because of loop
            result.splice(j-(startLength),0,toRotate[rotateI]);
        }
    }
    return result;
}

// testAdvent(input10, false, computeAdvent10);

function computeXor(list) {
    let res = 0;
    list.forEach(a => res = res ^ a);
    return res;
}

let testXor = [65 , 27 , 9 , 1 , 4 , 3 , 40 , 50 , 91 , 7 , 6 , 0 , 2 , 5 , 68 , 22];
// console.log(`text xor ${computeXor(testXor)} : 64`);
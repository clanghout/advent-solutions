let test13 = ["0: 3", "1: 2", "4: 4", "6: 4"];
let input13 = ["0: 4","1: 2","2: 3","4: 4","6: 8","8: 5","10: 8","12: 6","14: 6","16: 8","18: 6","20: 6","22: 12","24: 12","26: 10","28: 8","30: 12","32: 8","34: 12","36: 9","38: 12","40: 8","42: 12","44: 17","46: 14","48: 12","50: 10","52: 20","54: 12","56: 14","58: 14","60: 14","62: 12","64: 14","66: 14","68: 14","70: 14","72: 12","74: 14","76: 14","80: 14","84: 18","88: 14"];

// Layer, two modulo lists, take minimum



function bucketIndex(range, step){
    if(range <= 1){
        return 0;
    }
    let actRange = range-1;
    let minB = step % (actRange*2);
    let maxB = actRange*2 - step % (actRange*2);
    return Math.min(minB,maxB);
}

function computeAdvent13(inp) {
    let lastIndex = 0;
    let parsedInp = {};
    inp.forEach(a => {
        let inps = a.split(": ");
        parsedInp[parseInt(inps[0])] = parseInt(inps[1]);
        lastIndex = inps[0];
    });

    return computeSeverity(parsedInp,lastIndex,0)[0];
}

function computeSeverity(parsedI, lastIndex, delay){
    let severity = 0;
    let caught = false;
    for(let i = 0;i<=lastIndex;i++){
        if(parsedI.hasOwnProperty(i)){
            let range = parsedI[i];
            if(bucketIndex(range,i+delay) === 0){
                severity += (range*i);
                caught = true;
            }
        }
    }
    return [severity,caught];
}

function computeAdvent13part2(inp) {
    let delay = 0;
    let lastIndex = 0;
    let parsedInp = {};
    inp.forEach(a => {
        let inps = a.split(": ");
        parsedInp[parseInt(inps[0])] = parseInt(inps[1]);
        lastIndex = inps[0];
    });
    // console.log(computeSeverity(parsedInp,lastIndex,4));
    let curResult = computeSeverity(parsedInp,lastIndex,delay);
    while(curResult[1] && delay < 10000000){
        delay++;
        curResult = computeSeverity(parsedInp,lastIndex,delay);
    }
    // console.log(curResult);
    return delay;
}

testAdvent(test13,24,computeAdvent13);
testAdvent(input13,false,computeAdvent13);

testAdvent(test13,10,computeAdvent13part2);
testAdvent(input13,false,computeAdvent13part2);

// test for bucketIndex
// for(let i = 0;i<10;i++){
//     console.log(`depth 1 step ${i} : ${bucketIndex(1,i)}`);
// }
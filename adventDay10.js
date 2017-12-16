let input10 = [102, 255, 99, 252, 200, 24, 219, 57, 103, 2, 226, 254, 1, 0, 69, 216];
let testIn = [3, 4, 1, 5];

function computeAdvent10(inp, size) {
    if (!size) {
        size = 256;
    }

    // create array from 0 to size
    let curList = [...Array(size).keys()];
    let skipSize = 0;
    let curPos = 0;

    for (let i = 0; i < inp.length; i++) {
        // console.log('i', inp[i]);
        curList = doHashRound(curList, inp[i], curPos);
        // console.log("newList",curList);
        // console.log(`${curPos} = (${inp[i]} + ${skipSize}) % ${curList.length};`)
        curPos = (curPos + (inp[i] + skipSize)) % curList.length;
        // console.log(`new curpos ${curPos}`);
        skipSize++;
    }
    return curList[0]*curList[1];
}

function doHashRound(curState, i, curPos) {
    // console.log(`beginState, i ${i}, curpos ${curPos}`,curState);
    let startLength = curState.length;
    let toRotate = curState.splice(curPos,i);
    // fill toRotate with the rest...
    if(toRotate.length < i){

        let extraRotate = curState.splice(0,i-toRotate.length);
        // console.log(`first rotate ${toRotate}, extra ${extraRotate}`);
        toRotate = _.concat(toRotate,extraRotate);
    }
    // console.log(`before Rotate ${toRotate}`)
    toRotate.reverse();
    // console.log('Rotate',toRotate);
    // console.log('curState',curState);
    let result = curState.slice();
    // console.log("result",result);
    //TODO for loop needs to start at correct index
    for(let j = curPos;j<(curPos+toRotate.length);j++){
        // debugger;
        let rotateI = j-curPos;
        // console.log(`beforeAdding j=${j} startLength=${startLength}`)
        if(j<startLength){
            // Add to the position j until end of 'startList' is reached.
            // console.log("default adding");
            result.splice(j,0,toRotate[rotateI]);}
        else{
            // console.log("adding to front");
            // Add to start of list, because of loop
            result.splice(j-(startLength),0,toRotate[rotateI]);
        }
        // console.log("resulti",result);
    }
    // console.log("result2",result);
    return result;
}

console.log(`Test with list size 5 should give 12: ${computeAdvent10(testIn, 5)}`);
testAdvent(input10, false, computeAdvent10);

let input10 = [102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216];
let testIn = [3, 4, 1, 5];

function computeAdvent10(inp,size) {
    if(!size){
        size = 256;
    }

    // create array from 0 to size
    let curList = [...Array(size).keys()];

}

function doHashRound(curState,inp){

}

console.log(`Test with list size 5 should give 12: ${computeAdvent10(testIn,5)}`);
testAdvent(input10,false,computeAdvent10);

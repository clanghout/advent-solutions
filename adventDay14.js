let test14 = "flqrgnkx";
let input14 = "amgozmfv";

function computeAdvent14(inp) {
    let res = 0;
    for (let i = 0; i < 128; i++) {
        let hashVal = computeAdvent10(inp + "-" + i);
        let binVals = hashVal.split('').map(a => Hex2Bin(a).toString());
        binVals.forEach(bv => res += bv.split('').filter(a => a === '1').length);
    }
    return res;
}

function computeAdvent14part2(inp) {
    let res = 0;
    let binSet = [];
    for (let i = 0; i < 128; i++) {
        let hashVal = computeAdvent10(inp + "-" + i);
        let binVal = hashVal.split('').map(a => makeFullBin(Hex2Bin(a))).reduce((a, b) => a + b);
        if(binVal.length===124){
            binVal = "0000"+binVal;
        }
        binSet.push(binVal);
    }
    let coordinates = new Set([]);
    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 128; j++) {
            coordinates.add([i, j]);
        }
    }
    let groups = 0;
    while (coordinates.size>0){
        let curCoord = coordinates.values().next().value;
        if(binSet[curCoord[1]].charAt(curCoord[0])==="1"){
            // recursively remove all coordinates belonging to a group from the set
            removeGroup(curCoord,coordinates,binSet);
            groups++;
        }
        else{
            coordinates.delete(curCoord);
        }

    }
    return groups;
}

function removeGroup(coord, coordinates, binset) {
    // check if value is in the set and is a one (so part of group)
    if([...coordinates].filter(x => x[0] == coord[0] && x[1]== coord[1]).length>0 && binset[coord[1]].charAt(coord[0])==="1") {
        neigbours = new Set([]);
            neigbours.add([coord[0] - 1, coord[1]]);// add left neighbour
            neigbours.add([coord[0] + 1, coord[1]]);// add right neighbour
            neigbours.add([coord[0], coord[1] - 1]);// add top neighbour
            neigbours.add([coord[0], coord[1] + 1]);// add bot neighbour
        coordinates.delete([...coordinates].find(x => x[0] == coord[0] && x[1]== coord[1]));
        neigbours.forEach(c => removeGroup(c,coordinates,binset))
    }
    // try and remove the value, even if its a 0, so it will not be parsed again
    coordinates.delete([...coordinates].find(x => x[0] == coord[0] && x[1]== coord[1]));
}

function makeFullBin(inpstr) {
    while (inpstr.length < 4) {
        inpstr = "0" + inpstr;
    }
    return inpstr;
}

// testAdvent(test14,8108,computeAdvent14);
// testAdvent(input14,false,computeAdvent14);//8208 too low


// takes a while to compute
console.log("Please stand by while your answers for 14 are being calculated");
testAdvent(test14, 1242, computeAdvent14part2);
testAdvent(input14,false,computeAdvent14part2);

function Hex2Bin(n) {
    if (!checkHex(n)) return 0;
    return parseInt(n, 16).toString(2)
}

function checkHex(n) {
    return /^[0-9A-Fa-f]{1,64}$/.test(n)
}

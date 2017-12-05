let input3 = 368078;
function computeAdvent3(ind){
    if(ind === 1){
        return 0;
    }
    let steps = 0;
    let ring = determineRing(ind);


    return ring[0] + distToMidle(ind, ring[0],ring[1]);
}

function determineRing(ind){
    let ring = 1;
    let index = 0;
    while (ind > (ring*ring)){
        ring += 2;
        index++;
    }
    return [index,ring];
}
function distToMidle(value, ringIndex, sideLength){
    let lastCorner = Math.pow(sideLength,2);
    let maxDist = (Math.floor(sideLength/2));
    let Middle = [lastCorner - maxDist,
        (lastCorner-(sideLength-1)) - maxDist,
        (lastCorner-((sideLength-1)*2)) - maxDist,
        (lastCorner-((sideLength-1)*3)) - maxDist
    ];
    debugger;
    // Lastcorner is definately bigger than value
    // now we need to find closest middle
    let minDistMid = maxDist;
    for(let i in Middle){
        let prob = Math.abs(Middle[i]-value);
        if(prob < minDistMid){
            minDistMid = prob;
        }
    }
    return minDistMid;
}

console.log("test 1 : 0",computeAdvent3(1));
console.log("test 12 : 3",computeAdvent3(12));
console.log("test 23 : 2",computeAdvent3(23));
console.log("test 1024 : 31",computeAdvent3(1024));
console.log("input",computeAdvent3(input3));


// 37 36  35  34  33  32 31
// 38 17  16  15  14  13 30
// 39 18   5   4   3  12 29
// 40 19   6   1   2  11 28
// 41 20   7   8   9  10 27
// 42 21  22  23   24 25 26
// 43 44  45  46   47 48 49

// rings are size 1*1, 3*3, 5*5, 7*7 ...

// 1 2 3 4 5 6 7 8 9 10 11 12 13 14
// 0 1 2 1 2 1 2 1 2 3  2  3  4
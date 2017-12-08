let test8 = ["b inc 5 if a > 1",
"a inc 1 if b < 5",
"c dec -10 if a >= 1",
"c inc -20 if c == 10"];

function parseLine(line){
    let splitted = line.split(" ");
    if(splitted[3] !== "if"){
        console.log("wtf doe je");
    }
    return {
        "register": splitted[0],
        "operation": splitted[1],
        "opAmount": splitted[2],
        "ifInd": splitted[4],
        "ifComp": splitted[5],
        "ifVal": splitted[6]
    }
}

function computeAdvent8(inp) {
    let parsedInp = inp.map(a => parseLine(a));
    console.log(parsedInp);
    let memory = [];
    parsedInp.forEach(a => doComputation(a,memory));
    console.log("mem: ",memory);
    let maxValue = 0;
    console.log(memory.length);
    for(let i = 0;i<memory.length;i++){
        console.log("memory not empty??");
        if(memory[i]>maxValue)
            maxValue = memory[i];
    }
    return maxValue;
}

function doComputation(operation, memory){
    if(!memory.hasOwnProperty(operation.register)){
        memory[operation.register] = 0;
    }

    if(!memory.hasOwnProperty(operation.ifInd)){
        memory[operation.ifInd] = 0;
    }
    if(doCompare(memory[operation.ifInd],operation.ifComp,operation.ifVal)){
        // console.log(operation.register + operation.operation + operation.opAmount);
        if(operation.operation === "inc"){
            memory[operation.register]+= parseInt(operation.opAmount);
        }
        if(operation.operation === "dec"){
            memory[operation.register]-= parseInt(operation.opAmount);
        }
    }
}

function doCompare(val1, operator, val2){
    // console.log("comparing: " + val1 + operator + val2);
    switch (operator) {
        case ">":
            return val1 > val2;
        case "<":
            return val1 < val2;
        case "<=":
            return val1 <= val2;
        case ">=":
            return val1 >= val2;
        case "==":
            return val1 == val2;
        case "!=":
            return val1 != val2;
    }
}

console.log(computeAdvent8(test8));
function testAdvent(input, expected, funct){
    let result = funct(input);
    if(expected === false){
        console.log(`Answer for advent input is ${result}`);
        return true;
    }
    if(result === expected){
        console.log(`Input gives expected result ${expected}`);
        return true;
    }
    console.log(`Error: Input returned ${result} but ${expected} was expected.`,input);
    return false;
}
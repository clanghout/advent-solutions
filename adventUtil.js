// Define your custom commands and emoji
const commands = [
    { emoji: '🦄', name: 'unicorn' },
    { emoji: '🍕', name: 'pizza' },
    { emoji: '🍺', name: 'beer' },
    { emoji: '💩', name: 'poo' },
    { emoji: '✅', name: 'check'}
];

// Create custom commands
commands.forEach(({ name, emoji }) => window.console[name] = (...args) => console.log(emoji + ' ' + args.join(', ')));

function testAdvent(input, expected, funct){
    let result = funct(input);
    if(expected === false){
        console.check(`Answer for advent input is ${result}`);
        return true;
    }
    if(result === expected){
        console.check(`Input gives expected result ${expected}`);
        return true;
    }
    console.poo(`Error: Input returned ${result} but ${expected} was expected`);
    return false;
}
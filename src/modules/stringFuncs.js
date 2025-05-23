
function UppercaseFirstLetters(string) {
    const split = string.split(' ');
    let NewString = split[0].charAt(0).toUpperCase() + split[0].slice(1);
    for (let i = 1; i < split.length; i++) {
        let word = split[i];
        NewString += ' ' + word.charAt(0).toUpperCase() + word.slice(1);
    }
    return NewString;
}

function CommaNumbers(Num) {
    return Num;
}

export { UppercaseFirstLetters }

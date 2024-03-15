function lzw_encode(chars: string) {
    const dict: Record<string, number> = {};
    const out: number[] = [];
    let currentChar;
    let phrase: string = chars[0];
    let code = 256;
    for (let i = 1; i < chars.length; i++) {
        currentChar=chars[i];
        if (dict[phrase + currentChar] != null) {
            phrase += currentChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currentChar] = code;
            code++;
            phrase=currentChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    return out.map(x => String.fromCharCode(x)).join("");
}

function lzw_decode(chars: string) {
    let dict: Record<number, string> = {};
    let currentChar = chars[0];
    let oldPhrase = currentChar;
    let out = [currentChar];
    let code = 256;
    let phrase: string;
    for (let i = 1; i < chars.length; i++) {
        const currCode = chars.charCodeAt(i);
        if (currCode < 256) {
            phrase = chars[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currentChar);
        }
        out.push(phrase);
        currentChar = phrase.charAt(0);
        dict[code] = oldPhrase + currentChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

export {lzw_encode, lzw_decode};

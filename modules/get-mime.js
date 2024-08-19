export function getMIME(dataType, fixCharset = "") {
    let finalString = "";
    switch (dataType) {
        case "html": finalString = "application/x-www-form-urlencoded"; break;
        case "json": finalString = "application/json"; break;
    }
    return finalString + fixCharset;
}
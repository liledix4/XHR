import { getMIME } from "./get-mime.js";

const failureMessage = "Please tell liledix4 that something is wrong with AJAX. Thank you!";

function getFullObject(xhrRequest) {
    if (!xhrRequest.method) {xhrRequest.method = "GET"}
    if (!xhrRequest.dataType) {xhrRequest.dataType = "html"}
    if (!xhrRequest.contentType) {xhrRequest.contentType = getMIME(xhrRequest.dataType, "; charset=UTF-8")}
    // "xhrRequest.data" is an object with query strings, basically.
    return xhrRequest;
}

export function readTextFile(xhrRequest, callback) {
    xhrRequest = getFullObject(xhrRequest);
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType(getMIME(xhrRequest.dataType));
    rawFile.open(xhrRequest.method, xhrRequest.url, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

export function jqueryAJAX(xhrRequest) {
    xhrRequest = getFullObject(xhrRequest);
    return $
        .ajax(xhrRequest)
        .fail(() => {console.log(failureMessage)});
}
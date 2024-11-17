import { mimePreset } from './mime-presets.js';

const failureMessage = 'Please tell liledix4 that something is wrong with AJAX. Thank you!';

function getFullObject(xhrRequest) {
    if (!xhrRequest.method) {xhrRequest.method = 'GET';}
    if (!xhrRequest.mime) {xhrRequest.mime = mimePreset.html;}
    if (!xhrRequest.contentType) {xhrRequest.contentType = xhrRequest.mime + '; charset=UTF-8';}
    // "xhrRequest.data" is an object with query strings, basically.
    return xhrRequest;
}

export function readTextFile(xhrRequest, callback) {
    xhrRequest = getFullObject(xhrRequest);
    const xhr = new XMLHttpRequest();

    console.log(xhrRequest.method);

    xhr.overrideMimeType(xhrRequest.mime);
    xhr.open(
        xhrRequest.method,
        xhrRequest.url,
        true
    );
    if (xhrRequest.headers) {
        xhrRequest.headers.forEach(header => {
            console.log(header);
            if (header !== undefined) {
                xhr.setRequestHeader(
                    header.property,
                    header.value
                );
            }
        });
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == '200') {
            callback(xhr.responseText);
        }
    }
    xhr.send(null);
}

export function jqueryAJAX(xhrRequest) {
    xhrRequest = getFullObject(xhrRequest);
    return $
        .ajax(xhrRequest)
        .fail(() => {console.log(failureMessage)});
}
import { getMIME } from "./get-mime.js";

let ajaxObject = {
    method: "POST",
    data: {preloaded: true},
    headers: {"User-Agent": "request"}
};

export function readTextFile(file, dataType, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType(getMIME(dataType));
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

export function ajax(url, dataType = "html") {
    ajaxObject.url = url;
    ajaxObject.dataType = dataType;
    ajaxObject.contentType = getMIME(dataType, "; charset=UTF-8");

    return $
        .ajax(ajaxObject)
        .fail(
            function() {
                console.log("Please tell liledix4 that something is wrong with AJAX. Thank you!");
            }
        );
}
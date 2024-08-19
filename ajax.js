let ajaxObject = {
    method: "POST",
    data: {preloaded: true},
    headers: {"User-Agent": "request"}
};

function getContentType(dataType) {
    const fixCharset = "; charset=UTF-8";
    switch (dataType) {
        case "html": return `application/x-www-form-urlencoded${fixCharset}`;
        case "json": return `application/json${fixCharset}`;
    }
}

export function ajax(url, dataType = "html") {
    ajaxObject.url = url;
    ajaxObject.dataType = dataType;
    ajaxObject.contentType = getContentType(dataType);

    return $
        .ajax(ajaxObject)
        .fail(
            function() {
                console.log("Please tell liledix4 that something is wrong with AJAX. Thank you!");
            }
        );
}
let currentAJAXpage;

let ajaxObject = {
    method: "POST",
    data: {preloaded: true},
    dataType: 'html',
    headers: {'User-Agent': 'request'},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};

export function ajax(url, htmlElementToReturnDataTo, execute) {
    ajaxObject.url = url;

    currentAJAXpage = $
        .ajax(ajaxObject)
        .done(
            function(data) {
                htmlElementToReturnDataTo.html(data);
            }
        )
        .fail(
            function() {
                console.log("Please tell liledix4 that something is wrong with AJAX. Thank you!");
            }
        )
        .always(
            function(data, status, xhr) {
                if (execute) {execute();}
                console.log([data, status, xhr]);
            }
        );

    console.log(currentAJAXpage);
}
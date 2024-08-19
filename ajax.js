import { ghRep } from "./github-repository.js";

let currentAJAXpage;

let ajaxObject = {
    method: "POST",
    data: {preloaded: true},
    dataType: 'html',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};

export function ajax(url, htmlElementToReturnDataTo, execute) {
    ajaxObject.url = `https://raw.githubusercontent.com/${ghRep.user}/${ghRep.rep}/${ghRep.branch}/${url}`;

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
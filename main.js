import { ajax, readTextFile } from "./modules/ajax.js";
import { ghRep } from "./github-repository.js";

const addTo = $("body > .content");

function addContentFromAJAX(data, status, xhr) {
    console.log([data, status, xhr]);
    if (status === "success") {
        switch (typeof data) {
            case "string":
                addTo.html(data);
                break;
            case "object":
                addTo.html(data.text);
                break;
        }
    }
}

$("a").click(function(e) {
    const attr = {
        url: $(this).attr("href"),
        domainType: $(this).attr("domain"),
        dataTypeToGet: $(this).attr("type")
    };
    let dataTypeToGet = "html";
    let finalUrl;
    if (attr.dataTypeToGet) {dataTypeToGet = attr.dataTypeToGet;}

    e.preventDefault();

    switch (attr.domainType) {
        case "ghio":
            finalUrl = `${ghRep.website}/${attr.url}`;
            break;
        case "ghraw":
            finalUrl = `https://raw.githubusercontent.com/${ghRep.user}/${ghRep.rep}/${ghRep.branch}/${attr.url}`;
            break;
        case "relative":
            finalUrl = attr.url;
            break;
    }

    ajax(finalUrl, dataTypeToGet).then(addContentFromAJAX);
});

readTextFile("./hello.json", "json", jsonExtra => {
    addTo.html(jsonExtra);
});
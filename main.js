import { ajax  } from "./ajax.js";
import { ghRep } from "./github-repository.js";

function addContentFromAJAX(data, status, xhr) {
    const addTo = $("body > .content");
    console.log([data, status, xhr]);
    if (status === "success") {
        addTo.html(data);
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
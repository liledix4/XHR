import { ajax } from "./ajax.js";
import { ghRep } from "./github-repository.js";

$("a").click(function(e) {
    const href = $(this).attr("href");
    const domainType = $(this).attr("domain");
    const addTo = $("body > .content");
    e.preventDefault();
    switch (domainType) {
        case "ghio":
            ajax(`${ghRep.website}/${href}`, addTo);
            break;
        case "ghraw":
            ajax(`https://raw.githubusercontent.com/${ghRep.user}/${ghRep.rep}/${ghRep.branch}/${href}`, addTo);
            break;
        case "relative":
            ajax(href, addTo);
            break;
    }
});
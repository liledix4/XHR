import { ajax } from "./ajax.js";

$("a").click(function(e) {
    const href = $(this).attr("href");
    e.preventDefault();
    ajax(href, $("body > .content"));
});
define([
    'dojo/_base/declare',
    "../../Affix",
    "dojo/text!./templates/MyAffix.html"
], function (
    declare,
    Affix,
    template
) {
    return declare([Affix], {
        templateString: template
    });
});
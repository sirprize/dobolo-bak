define([
    '../../Alert',
    "dojo/_base/declare",
    "dojo/text!./templates/MyAlert.html"
], function (
    Alert,
    declare,
    template
) {
    return declare([Alert], {
        templateString: template
    });
});
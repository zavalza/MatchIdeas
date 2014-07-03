var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Facebook = require("facebook");

Alloy.Globals.Cloud = require("ti.cloud");

Alloy.Globals.FbUser = null;

Alloy.Globals.NormalUser = null;

Alloy.Globals.getUserId = function() {
    if (Alloy.Globals.Facebook.loggedIn) {
        alert("Face");
        return Alloy.Globals.FbUser;
    }
    Alloy.Globals.Cloud.Users.showMe(function(e) {
        e.success ? alert("Email") : alert("No hay usuario con sesión");
    });
    return Alloy.Globals.NormalUser;
};

Alloy.createController("index");
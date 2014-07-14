var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Facebook = require("facebook");

Alloy.Globals.Cloud = require("ti.cloud");

Alloy.Globals.FbUser = null;

Alloy.Globals.NormalUser = null;

Alloy.Globals.userToShow = null;

Alloy.Globals.ideaToShow = null;

Alloy.Globals.getUserId = function() {
    if (Alloy.Globals.Facebook.loggedIn) return Alloy.Globals.FbUser;
    Alloy.Globals.Cloud.Users.showMe(function(e) {
        e.success ? Alloy.Globals.NormalUser = e.users[0].id : alert("No hay usuario con sesión");
    });
    return Alloy.Globals.NormalUser;
};

if (Ti.App.Properties.hasProperty("storedSession")) {
    alert("Hay una sesión guardada");
    alert(Ti.App.Properties.getString("storedSession"));
    Alloy.Globals.Cloud.sessionId = Ti.App.Properties.getString("storedSession");
    Alloy.createController("main").getView().open();
}

var fb = Alloy.Globals.Facebook;

fb.appid = 305737346271076;

fb.permissions = [ "public_profile" ];

fb.forceDialogAuth = false;

fb.addEventListener("login", function(e) {
    e.success ? Alloy.Globals.Cloud.SocialIntegrations.externalAccountLogin({
        type: "facebook",
        token: fb.accessToken
    }, function(e) {
        if (e.success) {
            var user = e.users[0];
            Alloy.Globals.FbUser = user.id;
            var main = Alloy.createController("main").getView();
            main.open();
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    }) : e.error ? alert(e.error) : e.cancelled && alert("Cancelado");
});

fb.addEventListener("logout", function() {
    Alloy.createController("index").getView().open();
});

Alloy.createController("index");
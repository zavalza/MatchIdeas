var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Facebook = require("facebook");

Alloy.Globals.Cloud = require("ti.cloud");

Alloy.Globals.UserId = null;

Alloy.Globals.Scrollable = null;

Alloy.Globals.Menu = null;

Alloy.Globals.Ideas = null;

Alloy.Globals.NewIdea = null;

Alloy.Globals.userToShow = null;

Alloy.Globals.ideaToShow = null;

Alloy.Globals.Cloud.sessionId = Ti.App.Properties.getString("storedSession");

Alloy.Globals.Cloud.Users.showMe(function(e) {
    if (e.success) {
        Alloy.Globals.UserId = e.users[0].id;
        Alloy.createController("main").getView().open();
    } else Alloy.createController("index").getView().open();
});

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
            Alloy.Globals.UserId = e.users[0].id;
            var sessionId = Alloy.Globals.Cloud.sessionId;
            alert(sessionId);
            Ti.App.Properties.setString("storedSession", sessionId);
            var main = Alloy.createController("main").getView();
            main.open();
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    }) : e.error ? alert(e.error) : e.cancelled && alert("Cancelado");
});

fb.addEventListener("logout", function() {
    fb.logout();
    Alloy.Globals.Cloud.Users.logout(function(e) {
        if (e.success) {
            Titanium.App.Properties.removeProperty("storedSession");
            alert("se ha removido la sesión");
            Alloy.createController("index").getView().open();
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
});

Alloy.createController("index");
function Controller() {
    function showProfile() {
        Titanium.API.info("show profile");
        Alloy.Globals.userToShow = Alloy.Globals.getUserId();
        Alloy.createController("userProfile").getView().open();
    }
    function showSettings() {
        Titanium.API.info("show settings");
        Alloy.createController("settings").getView().open();
    }
    function showIdeas() {
        Titanium.API.info("show ideas");
        Alloy.Globals.Scrollable.scrollToView(Alloy.Globals.Ideas);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        top: "30",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId11 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 50,
        top: 0,
        left: 0,
        id: "__alloyId11"
    });
    $.__views.content.add($.__views.__alloyId11);
    showProfile ? $.__views.__alloyId11.addEventListener("click", showProfile) : __defers["$.__views.__alloyId11!click!showProfile"] = true;
    $.__views.profile = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        color: "#cc0a98",
        id: "profile",
        text: "Mi perfil"
    });
    $.__views.__alloyId11.add($.__views.profile);
    $.__views.__alloyId12 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 50,
        top: 0,
        left: 0,
        id: "__alloyId12"
    });
    $.__views.content.add($.__views.__alloyId12);
    showSettings ? $.__views.__alloyId12.addEventListener("click", showSettings) : __defers["$.__views.__alloyId12!click!showSettings"] = true;
    $.__views.config = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        color: "#04cbca",
        id: "config",
        text: "Configuración"
    });
    $.__views.__alloyId12.add($.__views.config);
    $.__views.__alloyId13 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 50,
        top: 0,
        left: 0,
        id: "__alloyId13"
    });
    $.__views.content.add($.__views.__alloyId13);
    showIdeas ? $.__views.__alloyId13.addEventListener("click", showIdeas) : __defers["$.__views.__alloyId13!click!showIdeas"] = true;
    $.__views.moreIdeas = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        color: "#cbc01f",
        id: "moreIdeas",
        text: "Más ideas"
    });
    $.__views.__alloyId13.add($.__views.moreIdeas);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    var fb = Alloy.Globals.Facebook;
    if (fb.loggedIn) $.content.add(fb.createLoginButton({
        top: 10,
        style: fb.BUTTON_STYLE_WIDE
    })); else {
        var button = Titanium.UI.createButton({
            title: "Salir",
            top: 10,
            width: 100,
            height: 50
        });
        button.addEventListener("click", function() {
            Alloy.Globals.Cloud.Users.logout(function(e) {
                if (e.success) {
                    Titanium.App.Properties.removeProperty("storedSession");
                    alert("se ha removido la sesión");
                    Alloy.createController("index").getView().open();
                } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        });
        $.content.add(button);
    }
    __defers["$.__views.__alloyId11!click!showProfile"] && $.__views.__alloyId11.addEventListener("click", showProfile);
    __defers["$.__views.__alloyId12!click!showSettings"] && $.__views.__alloyId12.addEventListener("click", showSettings);
    __defers["$.__views.__alloyId13!click!showIdeas"] && $.__views.__alloyId13.addEventListener("click", showIdeas);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
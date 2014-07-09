function Controller() {
    function showProfile() {
        Titanium.API.info("show profile");
        Alloy.Globals.userToShow = Alloy.Globals.getUserId();
        Alloy.createController("userProfile").getView().open();
    }
    function showIdeas() {
        Titanium.API.info("show ideas");
        Alloy.createController("main").getView().open();
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
    $.__views.__alloyId16 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        borderColor: "#bbb",
        borderWidth: 1,
        id: "__alloyId16"
    });
    $.__views.content.add($.__views.__alloyId16);
    $.__views.profile = Ti.UI.createLabel({
        color: "#cc0a98",
        id: "profile",
        text: "Mi perfil",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId16.add($.__views.profile);
    showProfile ? $.__views.profile.addEventListener("click", showProfile) : __defers["$.__views.profile!click!showProfile"] = true;
    $.__views.__alloyId17 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        borderColor: "#bbb",
        borderWidth: 1,
        id: "__alloyId17"
    });
    $.__views.content.add($.__views.__alloyId17);
    $.__views.ideas = Ti.UI.createLabel({
        color: "#04cbca",
        id: "ideas",
        text: "Más ideas",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId17.add($.__views.ideas);
    showIdeas ? $.__views.ideas.addEventListener("click", showIdeas) : __defers["$.__views.ideas!click!showIdeas"] = true;
    $.__views.__alloyId18 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        borderColor: "#bbb",
        borderWidth: 1,
        id: "__alloyId18"
    });
    $.__views.content.add($.__views.__alloyId18);
    $.__views.ideas = Ti.UI.createLabel({
        color: "#cbc01f",
        id: "ideas",
        text: "Nueva idea",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId18.add($.__views.ideas);
    showIdeas ? $.__views.ideas.addEventListener("click", showIdeas) : __defers["$.__views.ideas!click!showIdeas"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    var fb = Alloy.Globals.Facebook;
    fb.addEventListener("logout", function(e) {
        e.success ? Alloy.createController("index").getView().open() : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
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
                e.success ? Alloy.createController("index").getView().open() : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        });
        $.content.add(button);
    }
    __defers["$.__views.profile!click!showProfile"] && $.__views.profile.addEventListener("click", showProfile);
    __defers["$.__views.ideas!click!showIdeas"] && $.__views.ideas.addEventListener("click", showIdeas);
    __defers["$.__views.ideas!click!showIdeas"] && $.__views.ideas.addEventListener("click", showIdeas);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
function Controller() {
    function showMenu() {
        Titanium.API.info("Quit menu");
        $.win.close();
    }
    function showNewIdea() {
        Titanium.API.info("show new idea");
        var newIdea = Alloy.createController("newIdea").getView();
        newIdea.open();
    }
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
    $.__views.__alloyId11 = Ti.UI.createView({
        backgroundColor: "darkgray",
        top: 0,
        width: Titanium.UI.FILL,
        height: 100,
        id: "__alloyId11"
    });
    $.__views.win.add($.__views.__alloyId11);
    $.__views.menu = Ti.UI.createButton({
        id: "menu",
        backgroundImage: "/images/menuIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white",
        left: "5"
    });
    $.__views.__alloyId11.add($.__views.menu);
    showMenu ? $.__views.menu.addEventListener("click", showMenu) : __defers["$.__views.menu!click!showMenu"] = true;
    $.__views.newIdea = Ti.UI.createButton({
        id: "newIdea",
        backgroundImage: "/images/newIdeaIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId11.add($.__views.newIdea);
    showNewIdea ? $.__views.newIdea.addEventListener("click", showNewIdea) : __defers["$.__views.newIdea!click!showNewIdea"] = true;
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        top: "50",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId12 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId12"
    });
    $.__views.content.add($.__views.__alloyId12);
    $.__views.profile = Ti.UI.createLabel({
        id: "profile",
        color: "#900",
        shadowColor: "#aaa",
        text: "Mi perfil",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId12.add($.__views.profile);
    showProfile ? $.__views.profile.addEventListener("click", showProfile) : __defers["$.__views.profile!click!showProfile"] = true;
    $.__views.__alloyId13 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId13"
    });
    $.__views.content.add($.__views.__alloyId13);
    $.__views.ideas = Ti.UI.createLabel({
        id: "ideas",
        color: "#900",
        shadowColor: "#aaa",
        text: "Más ideas",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId13.add($.__views.ideas);
    showIdeas ? $.__views.ideas.addEventListener("click", showIdeas) : __defers["$.__views.ideas!click!showIdeas"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
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
    __defers["$.__views.menu!click!showMenu"] && $.__views.menu.addEventListener("click", showMenu);
    __defers["$.__views.newIdea!click!showNewIdea"] && $.__views.newIdea.addEventListener("click", showNewIdea);
    __defers["$.__views.profile!click!showProfile"] && $.__views.profile.addEventListener("click", showProfile);
    __defers["$.__views.ideas!click!showIdeas"] && $.__views.ideas.addEventListener("click", showIdeas);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
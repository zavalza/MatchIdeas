function Controller() {
    function showMenu() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    function showNewIdea() {
        Titanium.API.info("show new idea");
        var newIdea = Alloy.createController("newIdea").getView();
        newIdea.open();
    }
    function passReset() {
        Alloy.Globals.Cloud.Users.requestResetPassword({
            email: "paulz_91@hotmail.com"
        }, function(e) {
            e.success ? alert("Success: Reset Request Sent") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "editProfile";
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
    $.__views.__alloyId0 = Ti.UI.createView({
        width: "100%",
        height: 50,
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.menu = Ti.UI.createButton({
        id: "menu",
        backgroundImage: "/images/menuIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white",
        left: "5"
    });
    $.__views.__alloyId0.add($.__views.menu);
    showMenu ? $.__views.menu.addEventListener("click", showMenu) : __defers["$.__views.menu!click!showMenu"] = true;
    $.__views.newIdea = Ti.UI.createButton({
        id: "newIdea",
        backgroundImage: "/images/newIdeaIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId0.add($.__views.newIdea);
    showNewIdea ? $.__views.newIdea.addEventListener("click", showNewIdea) : __defers["$.__views.newIdea!click!showNewIdea"] = true;
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        top: "50",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 120,
        top: 0,
        left: 0,
        id: "__alloyId1"
    });
    $.__views.content.add($.__views.__alloyId1);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/someImage.png",
        width: "150",
        height: "100"
    });
    $.__views.__alloyId1.add($.__views.userImage);
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId2"
    });
    $.__views.content.add($.__views.__alloyId2);
    $.__views.firstName = Ti.UI.createTextField({
        id: "firstName",
        color: "#900",
        shadowColor: "#aaa",
        hintText: "Nombre",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId2.add($.__views.firstName);
    $.__views.__alloyId3 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId3"
    });
    $.__views.content.add($.__views.__alloyId3);
    $.__views.lastName = Ti.UI.createTextField({
        id: "lastName",
        color: "#900",
        shadowColor: "#aaa",
        hintText: "Apellido",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId3.add($.__views.lastName);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId4"
    });
    $.__views.content.add($.__views.__alloyId4);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        color: "#900",
        shadowColor: "#aaa",
        hintText: "Correo electrónico",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId4.add($.__views.email);
    $.__views.__alloyId5 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId5"
    });
    $.__views.content.add($.__views.__alloyId5);
    $.__views.passReset = Ti.UI.createButton({
        id: "passReset",
        title: "Cambiar password",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.__alloyId5.add($.__views.passReset);
    passReset ? $.__views.passReset.addEventListener("click", passReset) : __defers["$.__views.passReset!click!passReset"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentUser = null;
    var userId = Alloy.Globals.getUserId();
    Alloy.Globals.Cloud.Users.show({
        user_id: userId
    }, function(e) {
        if (e.success) {
            currentUser = e.users[0];
            alert(currentUser);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    __defers["$.__views.menu!click!showMenu"] && $.__views.menu.addEventListener("click", showMenu);
    __defers["$.__views.newIdea!click!showNewIdea"] && $.__views.newIdea.addEventListener("click", showNewIdea);
    __defers["$.__views.passReset!click!passReset"] && $.__views.passReset.addEventListener("click", passReset);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
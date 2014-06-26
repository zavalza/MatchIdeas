function Controller() {
    function showMenu() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    function done() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.main = Ti.UI.createWindow({
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.menu = Ti.UI.createButton({
        id: "menu",
        backgroundImage: "/images/menuIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white",
        left: "5"
    });
    $.__views.main.add($.__views.menu);
    showMenu ? $.__views.menu.addEventListener("click", showMenu) : __defers["$.__views.menu!click!showMenu"] = true;
    $.__views.__alloyId0 = Ti.UI.createScrollView({
        height: "80%",
        width: "80%",
        id: "__alloyId0"
    });
    $.__views.main.add($.__views.__alloyId0);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView"
    });
    $.__views.__alloyId0.add($.__views.mainView);
    $.__views.label1 = Ti.UI.createLabel({
        id: "label1",
        color: "#900",
        shadowColor: "#aaa",
        text: "A simple label",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "30",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.mainView.add($.__views.label1);
    $.__views.label2 = Ti.UI.createLabel({
        text: "A long label with\na few line breaks\nand unicode (UTF8)\nsymbols such as\na white chess piece ♕\nand the euro symbol €\nlooks like this!\n",
        id: "label2",
        color: "blue",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: "30",
        width: "300",
        height: "200"
    });
    $.__views.mainView.add($.__views.label2);
    $.__views.__alloyId1 = Ti.UI.createView({
        id: "__alloyId1"
    });
    $.__views.main.add($.__views.__alloyId1);
    $.__views.ok = Ti.UI.createButton({
        id: "ok",
        title: "Acepto",
        top: "350",
        width: "200",
        height: "50",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.__alloyId1.add($.__views.ok);
    done ? $.__views.ok.addEventListener("click", done) : __defers["$.__views.ok!click!done"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.menu!click!showMenu"] && $.__views.menu.addEventListener("click", showMenu);
    __defers["$.__views.ok!click!done"] && $.__views.ok.addEventListener("click", done);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
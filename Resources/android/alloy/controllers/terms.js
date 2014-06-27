function Controller() {
    function done() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "terms";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.terms = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "terms"
    });
    $.__views.terms && $.addTopLevelView($.__views.terms);
    $.__views.__alloyId7 = Ti.UI.createScrollView({
        height: "80%",
        width: "80%",
        id: "__alloyId7"
    });
    $.__views.terms.add($.__views.__alloyId7);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView"
    });
    $.__views.__alloyId7.add($.__views.mainView);
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
    $.__views.__alloyId8 = Ti.UI.createView({
        id: "__alloyId8"
    });
    $.__views.terms.add($.__views.__alloyId8);
    $.__views.ok = Ti.UI.createButton({
        id: "ok",
        title: "Acepto",
        top: "350",
        width: "200",
        height: "50",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.__alloyId8.add($.__views.ok);
    done ? $.__views.ok.addEventListener("click", done) : __defers["$.__views.ok!click!done"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.ok!click!done"] && $.__views.ok.addEventListener("click", done);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
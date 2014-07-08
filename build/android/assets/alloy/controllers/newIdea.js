function Controller() {
    function showMenu() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    function closeNewIdea() {
        Titanium.API.info("close new idea");
        $.win.close();
    }
    function done() {
        Titanium.API.info("Quit terms");
        var userId = Alloy.Globals.getUserId();
        var dict = {
            classname: "ideas",
            fields: {
                pitch: $.pitch.value,
                matches: 0,
                noMatches: 0,
                comments: [],
                votedBy: [ userId ]
            },
            acl_name: "ideasACL",
            user_id: userId
        };
        $.shareFb.value && alert("Idea compartida en Fb");
        Alloy.Globals.Cloud.Objects.create(dict, function(e) {
            if (e.success) {
                var main = Alloy.createController("main").getView();
                main.open();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "newIdea";
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
    $.__views.__alloyId19 = Ti.UI.createView({
        backgroundColor: "darkgray",
        top: 0,
        width: Titanium.UI.FILL,
        height: 100,
        id: "__alloyId19"
    });
    $.__views.win.add($.__views.__alloyId19);
    $.__views.menu = Ti.UI.createButton({
        id: "menu",
        backgroundImage: "/images/menuIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white",
        left: "5"
    });
    $.__views.__alloyId19.add($.__views.menu);
    showMenu ? $.__views.menu.addEventListener("click", showMenu) : __defers["$.__views.menu!click!showMenu"] = true;
    $.__views.newIdea = Ti.UI.createButton({
        id: "newIdea",
        backgroundImage: "/images/newIdeaIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId19.add($.__views.newIdea);
    closeNewIdea ? $.__views.newIdea.addEventListener("click", closeNewIdea) : __defers["$.__views.newIdea!click!closeNewIdea"] = true;
    $.__views.__alloyId20 = Ti.UI.createScrollView({
        top: "50",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        id: "__alloyId20"
    });
    $.__views.win.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 150,
        top: 0,
        left: 0,
        borderWidth: 0,
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.pitch = Ti.UI.createTextArea({
        id: "pitch",
        borderWidth: "2",
        top: "5",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        hintText: "Nueva idea...",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        width: "100%",
        height: "100%"
    });
    $.__views.__alloyId21.add($.__views.pitch);
    $.__views.__alloyId22 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        borderWidth: 0,
        id: "__alloyId22"
    });
    $.__views.__alloyId20.add($.__views.__alloyId22);
    $.__views.fb = Ti.UI.createLabel({
        id: "fb",
        color: "#900",
        shadowColor: "#aaa",
        text: "Compartir en facebook",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId22.add($.__views.fb);
    $.__views.__alloyId23 = Ti.UI.createView({
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.shareFb = Ti.UI.createSwitch({
        value: true,
        id: "shareFb",
        left: "10"
    });
    $.__views.__alloyId23.add($.__views.shareFb);
    $.__views.__alloyId24 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        borderWidth: 0,
        id: "__alloyId24"
    });
    $.__views.__alloyId20.add($.__views.__alloyId24);
    $.__views.done = Ti.UI.createButton({
        id: "done",
        width: "150",
        height: "50",
        text: "Hecho",
        color: "white",
        backgroundColor: "orange"
    });
    $.__views.__alloyId24.add($.__views.done);
    done ? $.__views.done.addEventListener("click", done) : __defers["$.__views.done!click!done"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    __defers["$.__views.menu!click!showMenu"] && $.__views.menu.addEventListener("click", showMenu);
    __defers["$.__views.newIdea!click!closeNewIdea"] && $.__views.newIdea.addEventListener("click", closeNewIdea);
    __defers["$.__views.done!click!done"] && $.__views.done.addEventListener("click", done);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
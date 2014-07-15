function Controller() {
    function saveIdea() {
        var userId = Alloy.Globals.UserId;
        var pitchText = $.pitch.value;
        var hashtags = pitchText.match(/#\S+/g);
        for (var i = 0; hashtags.length > i; i++) hashtags[i] = hashtags[i].slice(1);
        var dict = {
            classname: "ideas",
            fields: {
                pitch: pitchText,
                matches: 0,
                noMatches: 0,
                votedBy: [ userId ]
            },
            acl_name: "ideasACL",
            tags: hashtags,
            user_id: userId
        };
        Alloy.Globals.Cloud.Objects.create(dict, function(e) {
            e.success ? Alloy.Globals.Scrollable.scrollToView(Alloy.Globals.Ideas) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
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
    $.__views.__alloyId14 = Ti.UI.createScrollView({
        top: "30",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        id: "__alloyId14"
    });
    $.__views.win.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 120,
        top: 0,
        left: 0,
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.pitch = Ti.UI.createTextArea({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        id: "pitch",
        color: "#888",
        textAlign: "left",
        hintText: "Nueva idea...",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        width: "90%",
        height: "90%"
    });
    $.__views.__alloyId15.add($.__views.pitch);
    $.__views.__alloyId16 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId16"
    });
    $.__views.__alloyId14.add($.__views.__alloyId16);
    $.__views.done = Ti.UI.createButton({
        id: "done",
        width: "150",
        height: "50",
        title: "Guardar",
        color: "#fefefe",
        backgroundColor: "#04cbca"
    });
    $.__views.__alloyId16.add($.__views.done);
    saveIdea ? $.__views.done.addEventListener("click", saveIdea) : __defers["$.__views.done!click!saveIdea"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    __defers["$.__views.done!click!saveIdea"] && $.__views.done.addEventListener("click", saveIdea);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
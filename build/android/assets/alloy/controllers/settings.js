function Controller() {
    function saveContactData() {
        "undefined" == typeof currentUser.contactData ? "undefined" != typeof currentUser.external_accounts[0] : alert(currentUser.contactData);
        Alloy.createController("main").getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
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
    $.__views.__alloyId20 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId20"
    });
    $.__views.content.add($.__views.__alloyId20);
    $.__views.contactLabel = Ti.UI.createLabel({
        color: "#cc0a98",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "contactLabel",
        text: "DATOS DE CONTACTO",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId20.add($.__views.contactLabel);
    $.__views.__alloyId21 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId21"
    });
    $.__views.content.add($.__views.__alloyId21);
    $.__views.nameToShow = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        id: "nameToShow",
        color: "#900",
        shadowColor: "#aaa",
        hintText: "Nombre",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "80%",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId21.add($.__views.nameToShow);
    $.__views.__alloyId22 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId22"
    });
    $.__views.content.add($.__views.__alloyId22);
    $.__views.emailOfContact = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        id: "emailOfContact",
        color: "#900",
        shadowColor: "#aaa",
        hintText: "Correo electrónico",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "80%",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId22.add($.__views.emailOfContact);
    $.__views.__alloyId23 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId23"
    });
    $.__views.content.add($.__views.__alloyId23);
    $.__views.done = Ti.UI.createButton({
        id: "done",
        width: "150",
        height: "50",
        title: "Guardar",
        color: "#fefefe",
        backgroundColor: "#04cbca"
    });
    $.__views.__alloyId23.add($.__views.done);
    saveContactData ? $.__views.done.addEventListener("click", saveContactData) : __defers["$.__views.done!click!saveContactData"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentUser = null;
    var userId = Alloy.Globals.UserId;
    Alloy.Globals.Cloud.Users.show({
        user_id: userId
    }, function(e) {
        if (e.success) {
            currentUser = e.users[0];
            if ("undefined" == typeof currentUser.contactData) if ("undefined" != typeof currentUser.external_accounts[0]) Alloy.Globals.Facebook.requestWithGraphPath(currentUser.external_accounts[0].external_id, {}, "GET", function(e) {
                if (e.success) {
                    var fbUser = JSON.parse(e.result);
                    $.nameToShow.hintText = fbUser.first_name + " " + fbUser.last_name;
                    $.emailOfContact.hintText = fbUser.email;
                } else e.error ? alert(e.error) : alert("Unknown response");
            }); else {
                $.nameToShow.hintText = currentUser.first_name + " " + currentUser.last_name;
                $.emailOfContact.hintText = " ";
            } else alert(currentUser.contactData);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    __defers["$.__views.done!click!saveContactData"] && $.__views.done.addEventListener("click", saveContactData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
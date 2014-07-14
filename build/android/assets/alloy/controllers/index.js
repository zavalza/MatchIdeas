function Controller() {
    function tryLogin() {
        Titanium.API.info("Trying login...");
        var cloud = Alloy.Globals.Cloud;
        cloud.Users.login({
            login: $.email.value,
            password: $.password.value
        }, function(e) {
            if (e.success) {
                var sessionId = Alloy.Globals.Cloud.sessionId;
                alert(sessionId);
                Ti.App.Properties.setString("storedSession", sessionId);
                var main = Alloy.createController("main").getView();
                main.open();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function newUserForm() {
        Titanium.API.info("Show new user form");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    function terms() {
        Titanium.API.info("Show terms");
        var terms = Alloy.createController("terms").getView();
        terms.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.index.add($.__views.content);
    $.__views.__alloyId5 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 120,
        top: 0,
        left: 0,
        id: "__alloyId5"
    });
    $.__views.content.add($.__views.__alloyId5);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        image: "/images/logoMatchIdeas.png",
        width: "180",
        height: "120"
    });
    $.__views.__alloyId5.add($.__views.logo);
    $.__views.fbLogin = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "fbLogin"
    });
    $.__views.content.add($.__views.fbLogin);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId6"
    });
    $.__views.content.add($.__views.__alloyId6);
    $.__views.email = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "email",
        autocorrect: "false",
        color: "#336699",
        width: "70%",
        height: "35",
        hintText: "correo electrónico"
    });
    $.__views.__alloyId6.add($.__views.email);
    $.__views.__alloyId7 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId7"
    });
    $.__views.content.add($.__views.__alloyId7);
    $.__views.password = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "password",
        passwordMask: "true",
        color: "#336699",
        width: "70%",
        height: "35",
        hintText: "contraseña"
    });
    $.__views.__alloyId7.add($.__views.password);
    $.__views.__alloyId8 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId8"
    });
    $.__views.content.add($.__views.__alloyId8);
    $.__views.tryLogin = Ti.UI.createButton({
        id: "tryLogin",
        title: "Entrar",
        width: "130",
        height: "50",
        left: "20",
        color: "#fefefe",
        backgroundColor: "#cc0a98"
    });
    $.__views.__alloyId8.add($.__views.tryLogin);
    tryLogin ? $.__views.tryLogin.addEventListener("click", tryLogin) : __defers["$.__views.tryLogin!click!tryLogin"] = true;
    $.__views.newUser = Ti.UI.createButton({
        id: "newUser",
        title: "Registrarme",
        width: "130",
        height: "50",
        right: "20",
        color: "#fefefe",
        backgroundColor: "#04cbca"
    });
    $.__views.__alloyId8.add($.__views.newUser);
    newUserForm ? $.__views.newUser.addEventListener("click", newUserForm) : __defers["$.__views.newUser!click!newUserForm"] = true;
    $.__views.__alloyId9 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId9"
    });
    $.__views.content.add($.__views.__alloyId9);
    $.__views.terms = Ti.UI.createButton({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "terms",
        title: "TERMINOS Y CONDICIONES",
        width: "200",
        height: "50",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.__alloyId9.add($.__views.terms);
    terms ? $.__views.terms.addEventListener("click", terms) : __defers["$.__views.terms!click!terms"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var fb = Alloy.Globals.Facebook;
    $.fbLogin.add(fb.createLoginButton({
        style: fb.BUTTON_STYLE_WIDE
    }));
    __defers["$.__views.tryLogin!click!tryLogin"] && $.__views.tryLogin.addEventListener("click", tryLogin);
    __defers["$.__views.newUser!click!newUserForm"] && $.__views.newUser.addEventListener("click", newUserForm);
    __defers["$.__views.terms!click!terms"] && $.__views.terms.addEventListener("click", terms);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
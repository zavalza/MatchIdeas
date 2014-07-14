function Controller() {
    function createUser() {
        Titanium.API.info("Creating user with ACS");
        var cloud = Alloy.Globals.Cloud;
        cloud.Users.create({
            email: $.email.value,
            first_name: $.firstName.value,
            last_name: $.lastName.value,
            password: $.password.value,
            password_confirmation: $.passwordConfirmation.value
        }, function(e) {
            if (e.success) {
                var sessionId = Alloy.Globals.Cloud.sessionId;
                alert(sessionId);
                Ti.App.Properties.setString("storedSession", sessionId);
                var newIdea = Alloy.createController("newIdea").getView();
                newIdea.open();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function terms() {
        Titanium.API.info("Show terms");
        var terms = Alloy.createController("terms").getView();
        terms.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "newUser";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.newUser = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "newUser"
    });
    $.__views.newUser && $.addTopLevelView($.__views.newUser);
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.newUser.add($.__views.content);
    $.__views.header = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 120,
        top: 0,
        left: 0,
        id: "header"
    });
    $.__views.content.add($.__views.header);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        image: "/images/logoMatchIdeas.png",
        width: "180",
        height: "120"
    });
    $.__views.header.add($.__views.logo);
    $.__views.fbLogin = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "fbLogin"
    });
    $.__views.content.add($.__views.fbLogin);
    $.__views.__alloyId17 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId17"
    });
    $.__views.content.add($.__views.__alloyId17);
    $.__views.firstName = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "firstName",
        color: "#336699",
        width: "80%",
        height: "35",
        hintText: "Nombre"
    });
    $.__views.__alloyId17.add($.__views.firstName);
    $.__views.__alloyId18 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId18"
    });
    $.__views.content.add($.__views.__alloyId18);
    $.__views.lastName = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "lastName",
        color: "#336699",
        width: "80%",
        height: "35",
        hintText: "Apellido"
    });
    $.__views.__alloyId18.add($.__views.lastName);
    $.__views.__alloyId19 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId19"
    });
    $.__views.content.add($.__views.__alloyId19);
    $.__views.email = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "email",
        color: "#336699",
        width: "80%",
        height: "35",
        hintText: "Correo electrónico"
    });
    $.__views.__alloyId19.add($.__views.email);
    $.__views.__alloyId20 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId20"
    });
    $.__views.content.add($.__views.__alloyId20);
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
        width: "80%",
        height: "35",
        hintText: "Contraseña"
    });
    $.__views.__alloyId20.add($.__views.password);
    $.__views.__alloyId21 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId21"
    });
    $.__views.content.add($.__views.__alloyId21);
    $.__views.passwordConfirmation = Ti.UI.createTextField({
        borderColor: "#e9e9e9",
        borderWidth: "2",
        borderRadius: "5",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "passwordConfirmation",
        passwordMask: "true",
        color: "#336699",
        width: "80%",
        height: "35",
        hintText: "Confirma contraseña"
    });
    $.__views.__alloyId21.add($.__views.passwordConfirmation);
    $.__views.__alloyId22 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId22"
    });
    $.__views.content.add($.__views.__alloyId22);
    $.__views.createUser = Ti.UI.createButton({
        id: "createUser",
        title: "Registrarme",
        width: "150",
        height: "50",
        color: "#fefefe",
        backgroundColor: "#04cbca"
    });
    $.__views.__alloyId22.add($.__views.createUser);
    createUser ? $.__views.createUser.addEventListener("click", createUser) : __defers["$.__views.createUser!click!createUser"] = true;
    $.__views.__alloyId23 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId23"
    });
    $.__views.content.add($.__views.__alloyId23);
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
    $.__views.__alloyId23.add($.__views.terms);
    terms ? $.__views.terms.addEventListener("click", terms) : __defers["$.__views.terms!click!terms"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var fb = Alloy.Globals.Facebook;
    $.fbLogin.add(fb.createLoginButton({
        style: fb.BUTTON_STYLE_WIDE
    }));
    __defers["$.__views.createUser!click!createUser"] && $.__views.createUser.addEventListener("click", createUser);
    __defers["$.__views.terms!click!terms"] && $.__views.terms.addEventListener("click", terms);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
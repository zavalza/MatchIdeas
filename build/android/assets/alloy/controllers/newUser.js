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
                var user = e.users[0];
                alert("Success:\nid: " + user.id + "\n" + "sessionId: " + cloud.sessionId + "\n" + "first name: " + user.first_name + "\n" + "last name: " + user.last_name);
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
    $.__views.mainView = Ti.UI.createView({
        id: "mainView"
    });
    $.__views.newUser.add($.__views.mainView);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        image: "/images/logoMatchIdeas.png",
        top: "10",
        width: "150",
        height: "100"
    });
    $.__views.mainView.add($.__views.logo);
    $.__views.firstName = Ti.UI.createTextField({
        id: "firstName",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "150",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Nombre"
    });
    $.__views.mainView.add($.__views.firstName);
    $.__views.lastName = Ti.UI.createTextField({
        id: "lastName",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "180",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Apellido"
    });
    $.__views.mainView.add($.__views.lastName);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "210",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Correo electrónico"
    });
    $.__views.mainView.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        id: "password",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: "true",
        color: "#336699",
        top: "240",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Contraseña"
    });
    $.__views.mainView.add($.__views.password);
    $.__views.passwordConfirmation = Ti.UI.createTextField({
        id: "passwordConfirmation",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: "true",
        color: "#336699",
        top: "270",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Confirma contraseña"
    });
    $.__views.mainView.add($.__views.passwordConfirmation);
    $.__views.createUser = Ti.UI.createButton({
        id: "createUser",
        title: "Registrarme",
        top: "300",
        width: "150",
        height: "50"
    });
    $.__views.mainView.add($.__views.createUser);
    createUser ? $.__views.createUser.addEventListener("click", createUser) : __defers["$.__views.createUser!click!createUser"] = true;
    $.__views.terms = Ti.UI.createButton({
        id: "terms",
        title: "Terminos y condiciones",
        top: "350",
        width: "200",
        height: "50",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.mainView.add($.__views.terms);
    terms ? $.__views.terms.addEventListener("click", terms) : __defers["$.__views.terms!click!terms"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var fb = Alloy.Globals.Facebook;
    fb.appid = 305737346271076;
    fb.permissions = [ "public_profile" ];
    fb.addEventListener("login", function(e) {
        e.success ? alert("Logged In") : e.error ? alert(e.error) : e.cancelled && alert("Canceled");
    });
    fb.authorize();
    $.mainView.add(fb.createLoginButton({
        top: 110,
        style: fb.BUTTON_STYLE_WIDE
    }));
    __defers["$.__views.createUser!click!createUser"] && $.__views.createUser.addEventListener("click", createUser);
    __defers["$.__views.terms!click!terms"] && $.__views.terms.addEventListener("click", terms);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
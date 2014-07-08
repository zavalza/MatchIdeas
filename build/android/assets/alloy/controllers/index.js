function Controller() {
    function tryLogin() {
        Titanium.API.info("Trying login...");
        var cloud = Alloy.Globals.Cloud;
        cloud.Users.login({
            login: $.email.value,
            password: $.password.value
        }, function(e) {
            if (e.success) {
                Alloy.Globals.NormalUser = e.users[0].id;
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
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        image: "/images/logoMatchIdeas.png",
        top: "10",
        width: "150",
        height: "100"
    });
    $.__views.index.add($.__views.logo);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        autocorrect: "false",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "150",
        left: "10",
        width: "300",
        height: "35",
        hintText: "correo electrónico"
    });
    $.__views.index.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        id: "password",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: "true",
        color: "#336699",
        top: "180",
        left: "10",
        width: "300",
        height: "35",
        hintText: "password"
    });
    $.__views.index.add($.__views.password);
    $.__views.tryLogin = Ti.UI.createButton({
        id: "tryLogin",
        title: "Entrar",
        top: "210",
        width: "130",
        height: "50",
        left: "20"
    });
    $.__views.index.add($.__views.tryLogin);
    tryLogin ? $.__views.tryLogin.addEventListener("click", tryLogin) : __defers["$.__views.tryLogin!click!tryLogin"] = true;
    $.__views.newUser = Ti.UI.createButton({
        id: "newUser",
        title: "Registrarme",
        top: "210",
        width: "130",
        height: "50",
        right: "20"
    });
    $.__views.index.add($.__views.newUser);
    newUserForm ? $.__views.newUser.addEventListener("click", newUserForm) : __defers["$.__views.newUser!click!newUserForm"] = true;
    $.__views.terms = Ti.UI.createButton({
        id: "terms",
        title: "Terminos y condiciones",
        top: "260",
        width: "200",
        height: "50",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.index.add($.__views.terms);
    terms ? $.__views.terms.addEventListener("click", terms) : __defers["$.__views.terms!click!terms"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var fb = Alloy.Globals.Facebook;
    fb.appid = 305737346271076;
    fb.permissions = [ "public_profile" ];
    fb.forceDialogAuth = false;
    fb.addEventListener("login", function(e) {
        e.success ? Alloy.Globals.Cloud.SocialIntegrations.externalAccountLogin({
            type: "facebook",
            token: fb.accessToken
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                Alloy.Globals.FbUser = user.id;
                var main = Alloy.createController("main").getView();
                main.open();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }) : e.error ? alert(e.error) : e.cancelled && alert("Cancelado");
    });
    $.index.add(fb.createLoginButton({
        top: 110,
        style: fb.BUTTON_STYLE_WIDE
    }));
    Alloy.Globals.Cloud.Users.showMe(function(e) {
        if (e.success) {
            var main = Alloy.createController("main").getView();
            main.open();
        } else if (fb.loggedIn) {
            var main = Alloy.createController("main").getView();
            main.open();
        } else $.index.open();
    });
    __defers["$.__views.tryLogin!click!tryLogin"] && $.__views.tryLogin.addEventListener("click", tryLogin);
    __defers["$.__views.newUser!click!newUserForm"] && $.__views.newUser.addEventListener("click", newUserForm);
    __defers["$.__views.terms!click!terms"] && $.__views.terms.addEventListener("click", terms);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
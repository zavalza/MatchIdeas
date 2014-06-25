function Controller() {
    function tryLogin() {
        Titanium.API.info("Trying login...");
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
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: "/images/logoMatchIdeas.png"
    });
    $.__views.index.add($.__views.image);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "100",
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
        top: "150",
        left: "10",
        width: "300",
        height: "35",
        hintText: "password"
    });
    $.__views.index.add($.__views.password);
    $.__views.tryLogin = Ti.UI.createButton({
        id: "tryLogin",
        title: "Entrar",
        top: "180",
        width: "100",
        height: "50"
    });
    $.__views.index.add($.__views.tryLogin);
    tryLogin ? $.__views.tryLogin.addEventListener("click", tryLogin) : __defers["$.__views.tryLogin!click!tryLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var fb = Alloy.Globals.Facebook;
    fb.appid = 305737346271076;
    fb.permissions = [ "public_profile" ];
    fb.addEventListener("login", function(e) {
        e.success ? alert("Logged In") : e.error ? alert(e.error) : e.cancelled && alert("Canceled");
    });
    fb.authorize();
    $.index.add(fb.createLoginButton({
        top: 40,
        style: fb.BUTTON_STYLE_WIDE
    }));
    $.index.open();
    __defers["$.__views.tryLogin!click!tryLogin"] && $.__views.tryLogin.addEventListener("click", tryLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
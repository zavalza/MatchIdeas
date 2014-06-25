function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "newUserForm";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.newUserForm = Ti.UI.createWindow({
        id: "newUserForm"
    });
    $.__views.newUserForm && $.addTopLevelView($.__views.newUserForm);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: "/images/logoMatchIdeas.png",
        top: "20",
        width: "150",
        height: "100"
    });
    $.__views.newUserForm.add($.__views.image);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "180",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Nombre"
    });
    $.__views.newUserForm.add($.__views.email);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "210",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Apellido"
    });
    $.__views.newUserForm.add($.__views.email);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "240",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Correo electrónico"
    });
    $.__views.newUserForm.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        id: "password",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: "true",
        color: "#336699",
        top: "270",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Contraseña"
    });
    $.__views.newUserForm.add($.__views.password);
    $.__views.passwordConfirmation = Ti.UI.createTextField({
        id: "passwordConfirmation",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: "true",
        color: "#336699",
        top: "300",
        left: "10",
        width: "300",
        height: "35",
        hintText: "Confirma contraseña"
    });
    $.__views.newUserForm.add($.__views.passwordConfirmation);
    $.__views.newUser = Ti.UI.createButton({
        id: "newUser",
        title: "Registrarme",
        top: "330",
        width: "100",
        height: "50"
    });
    $.__views.newUserForm.add($.__views.newUser);
    newUserForm ? $.__views.newUser.addEventListener("click", newUserForm) : __defers["$.__views.newUser!click!newUserForm"] = true;
    $.__views.terms = Ti.UI.createButton({
        id: "terms",
        title: "Terminos y condiciones",
        top: "360",
        width: "200",
        height: "50",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.newUserForm.add($.__views.terms);
    terms ? $.__views.terms.addEventListener("click", terms) : __defers["$.__views.terms!click!terms"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.newUser!click!newUserForm"] && $.__views.newUser.addEventListener("click", newUserForm);
    __defers["$.__views.terms!click!terms"] && $.__views.terms.addEventListener("click", terms);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
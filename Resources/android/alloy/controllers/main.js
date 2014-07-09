function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId15 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId15,
        id: "scrollableView",
        top: "30",
        showPagingControl: "false"
    });
    $.__views.win.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var menuButton = Titanium.UI.createButton({
        backgroundImage: "/images/menuIcon.png",
        backgroundColor: "white",
        left: 20,
        top: 5,
        width: 50,
        height: 50
    });
    var ideasButton = Titanium.UI.createButton({
        backgroundImage: "/images/ideaIcon.png",
        backgroundColor: "white",
        top: 5,
        width: 50,
        height: 50
    });
    var newButton = Titanium.UI.createButton({
        backgroundImage: "/images/newIcon.png",
        backgroundColor: "white",
        right: 20,
        top: 5,
        width: 50,
        height: 50
    });
    $.win.add(menuButton);
    $.win.add(ideasButton);
    $.win.add(newButton);
    var view1 = Alloy.createController("menu").getView();
    var view2 = Alloy.createController("ideaProfile").getView();
    var view3 = Alloy.createController("newIdea").getView();
    $.scrollableView.views = [ view1, view2, view3 ];
    menuButton.addEventListener("click", function() {
        Titanium.API.info("Go to menu view");
        $.scrollableView.scrollToView(view1);
    });
    ideasButton.addEventListener("click", function() {
        Titanium.API.info("Go to ideas view");
        $.scrollableView.scrollToView(view2);
    });
    newButton.addEventListener("click", function() {
        Titanium.API.info("Go to newIdea view");
        $.scrollableView.scrollToView(view3);
    });
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    $.scrollableView.scrollToView(view2);
    $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
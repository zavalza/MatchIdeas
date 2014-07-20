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
        id: "win",
        exitOnClose: "true"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId5 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId5,
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
    Alloy.Globals.Menu = Alloy.createController("menu").getView();
    Alloy.Globals.Ideas = Alloy.createController("ideaProfile").getView();
    Alloy.Globals.NewIdea = Alloy.createController("newIdea").getView();
    $.scrollableView.views = [ Alloy.Globals.Menu, Alloy.Globals.Ideas, Alloy.Globals.NewIdea ];
    Alloy.Globals.Scrollable = $.scrollableView;
    menuButton.addEventListener("click", function() {
        Titanium.API.info("Go to menu view");
        $.scrollableView.scrollToView(Alloy.Globals.Menu);
    });
    ideasButton.addEventListener("click", function() {
        Titanium.API.info("Go to ideas view");
        $.scrollableView.scrollToView(Alloy.Globals.Ideas);
    });
    newButton.addEventListener("click", function() {
        Titanium.API.info("Go to newIdea view");
        $.scrollableView.scrollToView(Alloy.Globals.NewIdea);
    });
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    $.scrollableView.scrollToView(Alloy.Globals.Ideas);
    $.win.orientationModes = [ Titanium.UI.PORTRAIT ];
    $.win.activity.onCreateOptionsMenu = function(e) {
        var menu = e.menu;
        var menuItem = menu.add({
            title: "Compose",
            icon: "images/searchIcon.png",
            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
        });
        menuItem.addEventListener("click", function() {
            Ti.API.info("Action Item Clicked!");
        });
    };
    $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
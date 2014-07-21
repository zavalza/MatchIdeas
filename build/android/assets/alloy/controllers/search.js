function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "search";
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
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var search = Ti.UI.Android.createSearchView({
        hintText: "Buscar idea"
    });
    $.win.activity.onCreateOptionsMenu = function(e) {
        var menu = e.menu;
        var menuItem = menu.add({
            title: "Buscar idea",
            actionView: search,
            icon: "images/searchIcon.png",
            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
        });
        menuItem.expandActionView();
        menuItem.addEventListener("collapse", function() {
            $.win.close();
        });
    };
    var data = [];
    data.push(Ti.UI.createTableViewRow({
        title: "Apple"
    }));
    data.push(Ti.UI.createTableViewRow({
        title: "Banana"
    }));
    data.push(Ti.UI.createTableViewRow({
        title: "Orange"
    }));
    data.push(Ti.UI.createTableViewRow({
        title: "Raspberry"
    }));
    var tableview = Titanium.UI.createTableView({
        data: data,
        search: search,
        searchAsChild: false
    });
    $.win.add(tableview);
    $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
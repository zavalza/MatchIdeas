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
    var data = [];
    var search = Ti.UI.Android.createSearchView({
        hintText: "Buscar idea"
    });
    search.addEventListener("submit", function() {
        Alloy.Globals.tagsToSearch = search.value.split(" ");
        Alloy.createController("searchResults").getView();
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
    Alloy.Globals.Cloud.Objects.query({
        classname: "ideas",
        limit: 50,
        where: {
            user_id: Alloy.Globals.UserId,
            tags: {
                $exists: true
            }
        },
        sel: {
            all: [ "tags" ]
        }
    }, function(e) {
        if (e.success) if (e.ideas.length > 0) {
            var tagsToShow = [];
            for (var i = 0; e.ideas.length > i; i++) if ("undefined" != typeof e.ideas[i].tags) for (var j = 0; e.ideas[i].tags.length > j; j++) if (-1 == tagsToShow.indexOf(e.ideas[i].tags[j])) {
                tagsToShow.push(e.ideas[i].tags[j]);
                var tagRow = Ti.UI.createTableViewRow({
                    title: e.ideas[i].tags[j],
                    width: "100%",
                    height: Ti.UI.SIZE
                });
                tagRow.addEventListener("click", function(e) {
                    search.value = search.value + " " + e.rowData.title;
                    var tableview = Titanium.UI.createTableView({
                        data: data,
                        search: search,
                        searchAsChild: false
                    });
                    $.win.add(tableview);
                });
                data.push(tagRow);
            }
            var tableview = Titanium.UI.createTableView({
                data: data,
                search: search,
                searchAsChild: false
            });
            $.win.add(tableview);
            $.win.open();
        } else alert("No ha usado tags"); else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
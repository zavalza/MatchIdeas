function Controller() {
    function createIdea(id, pitch) {
        var idea = Ti.UI.createView({
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            width: "100%",
            height: Ti.UI.SIZE,
            top: 0,
            left: 0
        });
        var textLabel = Ti.UI.createLabel({
            text: '"' + pitch + '"',
            color: "#04cbca",
            top: 10,
            left: "10%",
            width: "80%"
        });
        idea.add(textLabel);
        idea.addEventListener("click", function() {
            Alloy.Globals.ideaToShow = id;
            Alloy.createController("main").getView().open();
        });
        return idea;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "searchResults";
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
        top: "30",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId19 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId19"
    });
    $.__views.content.add($.__views.__alloyId19);
    $.__views.ideasTitle = Ti.UI.createLabel({
        color: "#cbc01f",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "ideasTitle",
        text: "IDEAS ENCONTRADAS",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId19.add($.__views.ideasTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Cloud.Objects.query({
        classname: "ideas",
        where: {
            tags: {
                $in: Alloy.Globals.tagsToSearch
            }
        },
        limit: 20,
        order: "make,created_at"
    }, function(e) {
        if (e.success) {
            for (var i = 0; e.ideas.length > i; i++) {
                var ideasView = createIdea(e.ideas[i].id, e.ideas[i].pitch);
                $.content.add(ideasView);
            }
            $.win.open();
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
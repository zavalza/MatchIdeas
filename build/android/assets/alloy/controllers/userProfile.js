function Controller() {
    function createIdea(pitch) {
        var idea = Ti.UI.createView({
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            width: "100%",
            height: 70,
            top: 0,
            left: 0
        });
        var textLabel = Ti.UI.createLabel({
            text: pitch,
            top: 10,
            left: "10%",
            width: "80%",
            height: 60
        });
        idea.add(textLabel);
        return idea;
    }
    function showMenu() {
        Titanium.API.info("menu");
        Alloy.createController("menu").getView().open();
    }
    function showNewIdea() {
        Titanium.API.info("show new idea");
        var newIdea = Alloy.createController("newIdea").getView();
        newIdea.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "userProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId22 = Ti.UI.createView({
        backgroundColor: "darkgray",
        top: 0,
        width: Titanium.UI.FILL,
        height: 100,
        id: "__alloyId22"
    });
    $.__views.win.add($.__views.__alloyId22);
    $.__views.menu = Ti.UI.createButton({
        id: "menu",
        backgroundImage: "/images/menuIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white",
        left: "5"
    });
    $.__views.__alloyId22.add($.__views.menu);
    showMenu ? $.__views.menu.addEventListener("click", showMenu) : __defers["$.__views.menu!click!showMenu"] = true;
    $.__views.newIdea = Ti.UI.createButton({
        id: "newIdea",
        backgroundImage: "/images/newIdeaIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId22.add($.__views.newIdea);
    showNewIdea ? $.__views.newIdea.addEventListener("click", showNewIdea) : __defers["$.__views.newIdea!click!showNewIdea"] = true;
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        top: "50",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId23 = Ti.UI.createView({
        backgroundColor: "white",
        borderWidth: 0,
        width: "100%",
        height: 150,
        top: 0,
        left: 0,
        id: "__alloyId23"
    });
    $.__views.content.add($.__views.__alloyId23);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/someImage.png",
        width: "150",
        height: "100"
    });
    $.__views.__alloyId23.add($.__views.userImage);
    $.__views.__alloyId24 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 30,
        top: 0,
        left: 0,
        id: "__alloyId24"
    });
    $.__views.content.add($.__views.__alloyId24);
    $.__views.name = Ti.UI.createLabel({
        id: "name",
        color: "#900",
        shadowColor: "#aaa",
        text: "Anónimo",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId24.add($.__views.name);
    $.__views.__alloyId25 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 30,
        top: 0,
        left: 0,
        id: "__alloyId25"
    });
    $.__views.content.add($.__views.__alloyId25);
    $.__views.fb = Ti.UI.createLabel({
        id: "fb",
        color: "#900",
        shadowColor: "#aaa",
        text: "Facebook",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId25.add($.__views.fb);
    $.__views.__alloyId26 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 30,
        top: 0,
        left: 0,
        id: "__alloyId26"
    });
    $.__views.content.add($.__views.__alloyId26);
    $.__views.email = Ti.UI.createLabel({
        id: "email",
        color: "#900",
        shadowColor: "#aaa",
        text: "zse.paul@gmail.com",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId26.add($.__views.email);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentUser = null;
    var userId = Alloy.Globals.userToShow;
    Alloy.Globals.Cloud.Users.show({
        user_id: userId
    }, function(e) {
        if (e.success) {
            currentUser = e.users[0];
            Alloy.Globals.Cloud.Objects.query({
                classname: "ideas",
                where: {
                    user_id: currentUser.id
                },
                order: "make,created_at"
            }, function(e) {
                if (e.success) for (var i = 0; e.ideas.length > i; i++) {
                    var ideasView = createIdea(e.ideas[i].pitch);
                    $.content.add(ideasView);
                } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    if (userId == Alloy.Globals.getUserId()) {
        var row = Ti.UI.createView({
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            width: "100%",
            height: 70,
            top: 0,
            left: 0
        });
        var editButton = Titanium.UI.createButton({
            title: "Editar",
            top: 10,
            width: 100,
            height: 50
        });
        editButton.addEventListener("click", function() {
            Alloy.createController("editProfile").getView().open();
        });
        row.add(editButton);
        $.content.add(row);
    }
    __defers["$.__views.menu!click!showMenu"] && $.__views.menu.addEventListener("click", showMenu);
    __defers["$.__views.newIdea!click!showNewIdea"] && $.__views.newIdea.addEventListener("click", showNewIdea);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
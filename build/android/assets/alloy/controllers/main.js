function Controller() {
    function match() {
        Titanium.API.info("Match");
        alert("53af6e839444600821028619");
        Alloy.Globals.Cloud.Objects.update({
            classname: "ideas",
            id: currentIdea.id,
            fields: {
                votedBy: {
                    $push: currentUser
                },
                points: {
                    $inc: 1
                }
            },
            user_id: "53af6e839444600821028619"
        }, function(e) {
            if (e.success) {
                var idea = e.ideas[0];
                alert("Success:\nid: " + idea.id + "\n" + "votedBy: " + idea.votedBy + "\n" + "points: " + idea.points + "\n");
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function noMatch() {
        Titanium.API.info("No Match");
    }
    function showMenu() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    function done() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    function showNewIdea() {
        Titanium.API.info("show new idea");
        var newIdea = Alloy.createController("newIdea").getView();
        newIdea.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
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
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "darkgray",
        top: 0,
        width: Titanium.UI.FILL,
        height: 100,
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.menu = Ti.UI.createButton({
        id: "menu",
        backgroundImage: "/images/menuIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white",
        left: "5"
    });
    $.__views.__alloyId0.add($.__views.menu);
    showMenu ? $.__views.menu.addEventListener("click", showMenu) : __defers["$.__views.menu!click!showMenu"] = true;
    $.__views.newIdea = Ti.UI.createButton({
        id: "newIdea",
        backgroundImage: "/images/newIdeaIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId0.add($.__views.newIdea);
    showNewIdea ? $.__views.newIdea.addEventListener("click", showNewIdea) : __defers["$.__views.newIdea!click!showNewIdea"] = true;
    $.__views.__alloyId1 = Ti.UI.createScrollView({
        top: "50",
        bottom: "50",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        id: "__alloyId1"
    });
    $.__views.win.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        image: "/images/someImage.png",
        width: "150",
        height: "100"
    });
    $.__views.__alloyId2.add($.__views.logo);
    $.__views.__alloyId3 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.label1 = Ti.UI.createLabel({
        id: "label1",
        color: "#900",
        shadowColor: "#aaa",
        text: "A simple label",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId3.add($.__views.label1);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId4"
    });
    $.__views.__alloyId1.add($.__views.__alloyId4);
    $.__views.label2 = Ti.UI.createLabel({
        text: "A long label with\na few line breaks\nand unicode (UTF8)\nsymbols such as\na white chess piece ♕\nand the euro symbol €\nlooks like this!\n",
        id: "label2",
        color: "blue",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: "200",
        height: "200"
    });
    $.__views.__alloyId4.add($.__views.label2);
    $.__views.__alloyId5 = Ti.UI.createView({
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId5"
    });
    $.__views.__alloyId1.add($.__views.__alloyId5);
    $.__views.label3 = Ti.UI.createLabel({
        text: "A long label with\na few line breaks\nand unicode (UTF8)\nsymbols such as\na white chess piece ♕\nand the euro symbol €\nlooks like this!\n",
        id: "label3",
        color: "blue",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: "200",
        height: "200"
    });
    $.__views.__alloyId5.add($.__views.label3);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundColor: "white",
        bottom: 0,
        width: Titanium.UI.FILL,
        height: 100,
        id: "__alloyId6"
    });
    $.__views.win.add($.__views.__alloyId6);
    $.__views.match = Ti.UI.createButton({
        id: "match",
        backgroundImage: "/images/like.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "green",
        left: "50"
    });
    $.__views.__alloyId6.add($.__views.match);
    match ? $.__views.match.addEventListener("click", match) : __defers["$.__views.match!click!match"] = true;
    $.__views.comment = Ti.UI.createButton({
        id: "comment",
        backgroundImage: "/images/comment.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId6.add($.__views.comment);
    done ? $.__views.comment.addEventListener("click", done) : __defers["$.__views.comment!click!done"] = true;
    $.__views.noMatch = Ti.UI.createButton({
        id: "noMatch",
        backgroundImage: "/images/dislike.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "red",
        right: "50"
    });
    $.__views.__alloyId6.add($.__views.noMatch);
    noMatch ? $.__views.noMatch.addEventListener("click", noMatch) : __defers["$.__views.noMatch!click!noMatch"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentUser = null;
    var currentIdea = null;
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    Alloy.Globals.Facebook.loggedIn ? currentUser = Alloy.Globals.FbUser : Alloy.Globals.Cloud.Users.showMe(function(e) {
        if (e.success) {
            var user = e.users[0];
            currentUser = user.id;
        } else alert("Algo estuvo mal, no pudimos obtener ideas");
    });
    Alloy.Globals.Cloud.Objects.query({
        classname: "ideas",
        limit: 1,
        per_page: 10,
        where: {
            user_id: {
                $ne: currentUser
            }
        }
    }, function(e) {
        if (e.success) {
            currentIdea = e.ideas[0];
            alert("id: " + currentIdea.id + "\n" + "pitch: " + currentIdea.pitch + "\n" + "created_at: " + currentIdea.created_at);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    __defers["$.__views.menu!click!showMenu"] && $.__views.menu.addEventListener("click", showMenu);
    __defers["$.__views.newIdea!click!showNewIdea"] && $.__views.newIdea.addEventListener("click", showNewIdea);
    __defers["$.__views.match!click!match"] && $.__views.match.addEventListener("click", match);
    __defers["$.__views.comment!click!done"] && $.__views.comment.addEventListener("click", done);
    __defers["$.__views.noMatch!click!noMatch"] && $.__views.noMatch.addEventListener("click", noMatch);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
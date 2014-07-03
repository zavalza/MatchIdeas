function Controller() {
    function createComment(commentText) {
        var comment = Ti.UI.createView({
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            width: "100%",
            height: 70,
            top: 0,
            left: 0
        });
        var inputTextField = Ti.UI.createTextField({
            hintText: commentText,
            top: 10,
            left: "10%",
            width: "80%",
            height: 60
        });
        comment.add(inputTextField);
        return comment;
    }
    function getCurrentIdea(userId) {
        Alloy.Globals.Cloud.Objects.query({
            classname: "ideas",
            limit: 1,
            per_page: 10,
            where: {
                votedBy: {
                    $nin: [ userId ]
                }
            }
        }, function(e) {
            if (e.success) if (null != e.ideas[0]) {
                currentIdea = e.ideas[0];
                $.pitch.text = currentIdea.pitch;
                $.match.title = String(currentIdea.matches);
                $.noMatch.title = String(currentIdea.noMatches);
                for (var i = 0; currentIdea.comments.legth >= i; i++) {
                    var comment = createComment(currentIdea.comments[i]);
                    $.content.add(comment);
                }
                var newComment = Ti.UI.createView({
                    backgroundColor: "white",
                    borderColor: "#bbb",
                    borderWidth: 1,
                    width: "100%",
                    height: 150,
                    top: 0,
                    left: 0
                });
                newComment.add(commentArea);
                $.content.add(newComment);
            } else {
                $.pitch.text = "No hay ideas";
                $.match.title = "0";
                $.noMatch.title = "0";
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function findIdea(ideaId) {
        Alloy.Globals.Cloud.Objects.query({
            classname: "ideas",
            limit: 1,
            per_page: 10,
            where: {
                id: ideaId
            }
        }, function(e) {
            e.success ? currentIdea = e.ideas[0] : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function match() {
        Titanium.API.info("Match");
        if (null != currentIdea) {
            findIdea(currentIdea.id);
            var votes = JSON.stringify(currentIdea.votedBy);
            votes = votes.substring(1, votes.length - 1);
            votes = votes + "," + '"' + currentUser + '"';
            votes = "[" + votes + "]";
            votes = JSON.parse(votes);
            var dict = {
                classname: "ideas",
                id: currentIdea.id,
                fields: {
                    votedBy: votes,
                    matches: {
                        $inc: 1
                    }
                },
                acl_name: "ideasACL",
                user_id: currentIdea.user.id
            };
            Alloy.Globals.Cloud.Objects.update(dict, function(e) {
                e.success ? getCurrentIdea(currentUser) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        } else alert("Necesitas ideas para votar");
    }
    function noMatch() {
        Titanium.API.info("No Match");
        if (null != currentIdea) {
            findIdea(currentIdea.id);
            var votes = JSON.stringify(currentIdea.votedBy);
            votes = votes.substring(1, votes.length - 1);
            votes = votes + "," + '"' + currentUser + '"';
            votes = "[" + votes + "]";
            votes = JSON.parse(votes);
            var dict = {
                classname: "ideas",
                id: currentIdea.id,
                fields: {
                    votedBy: votes,
                    noMatches: {
                        $inc: 1
                    }
                },
                acl_name: "ideasACL",
                user_id: currentIdea.user.id
            };
            Alloy.Globals.Cloud.Objects.update(dict, function(e) {
                e.success ? getCurrentIdea(currentUser) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        } else alert("Necesitas ideas para votar");
    }
    function showMenu() {
        Titanium.API.info("Quit terms");
        var newUser = Alloy.createController("newUser").getView();
        newUser.open();
    }
    function comment() {
        Titanium.API.info("comment");
        $.content.scrollTo(commentArea.getCenter().x, commentArea.getCenter().y);
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
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        top: "50",
        bottom: "30",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "white",
        borderWidth: 0,
        width: "100%",
        height: 150,
        top: 0,
        left: 0,
        id: "__alloyId1"
    });
    $.__views.content.add($.__views.__alloyId1);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/someImage.png",
        width: "150",
        height: "100"
    });
    $.__views.__alloyId1.add($.__views.userImage);
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
    $.__views.content.add($.__views.__alloyId2);
    $.__views.userName = Ti.UI.createLabel({
        id: "userName",
        color: "#900",
        shadowColor: "#aaa",
        text: "A simple label",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId2.add($.__views.userName);
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
    $.__views.content.add($.__views.__alloyId3);
    $.__views.pitch = Ti.UI.createLabel({
        text: "",
        id: "pitch",
        color: "blue",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: "200",
        height: "200"
    });
    $.__views.__alloyId3.add($.__views.pitch);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "white",
        bottom: 0,
        width: Titanium.UI.FILL,
        height: 50,
        id: "__alloyId4"
    });
    $.__views.win.add($.__views.__alloyId4);
    $.__views.match = Ti.UI.createButton({
        id: "match",
        backgroundImage: "/images/like.png",
        bottom: "5",
        width: "50",
        height: "50",
        backgroundColor: "green",
        left: "50"
    });
    $.__views.__alloyId4.add($.__views.match);
    match ? $.__views.match.addEventListener("click", match) : __defers["$.__views.match!click!match"] = true;
    $.__views.comment = Ti.UI.createButton({
        id: "comment",
        backgroundImage: "/images/comment.png",
        bottom: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId4.add($.__views.comment);
    comment ? $.__views.comment.addEventListener("click", comment) : __defers["$.__views.comment!click!comment"] = true;
    $.__views.noMatch = Ti.UI.createButton({
        id: "noMatch",
        backgroundImage: "/images/dislike.png",
        bottom: "5",
        width: "50",
        height: "50",
        backgroundColor: "red",
        right: "50"
    });
    $.__views.__alloyId4.add($.__views.noMatch);
    noMatch ? $.__views.noMatch.addEventListener("click", noMatch) : __defers["$.__views.noMatch!click!noMatch"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentIdea = null;
    var currentUser = null;
    var commentArea = Titanium.UI.createTextArea({
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
        hintText: "Nuevo comentario...",
        color: "black",
        textAlign: "left",
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        width: "80%",
        height: 100
    });
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    if (Alloy.Globals.Facebook.loggedIn) {
        currentUser = Alloy.Globals.FbUser;
        getCurrentIdea(currentUser);
    } else Alloy.Globals.Cloud.Users.showMe(function(e) {
        if (e.success) {
            currentUser = e.users[0].id;
            getCurrentIdea(currentUser);
        } else alert("Algo estuvo mal, no pudimos obtener ideas");
    });
    __defers["$.__views.menu!click!showMenu"] && $.__views.menu.addEventListener("click", showMenu);
    __defers["$.__views.newIdea!click!showNewIdea"] && $.__views.newIdea.addEventListener("click", showNewIdea);
    __defers["$.__views.match!click!match"] && $.__views.match.addEventListener("click", match);
    __defers["$.__views.comment!click!comment"] && $.__views.comment.addEventListener("click", comment);
    __defers["$.__views.noMatch!click!noMatch"] && $.__views.noMatch.addEventListener("click", noMatch);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
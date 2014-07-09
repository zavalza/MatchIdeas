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
        var textLabel = Ti.UI.createLabel({
            text: commentText,
            top: 10,
            left: "10%",
            width: "80%",
            height: 60
        });
        comment.add(textLabel);
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
                fillData();
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
            if (e.success) {
                currentIdea = e.ideas[0];
                fillData();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
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
                e.success ? Alloy.createController("main").getView().open() : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
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
                e.success ? Alloy.createController("main").getView().open() : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        } else alert("Necesitas ideas para votar");
    }
    function showProfile() {
        Titanium.API.info("show profile");
        Alloy.Globals.userToShow = currentIdea.user.id;
        Alloy.createController("userProfile").getView().open();
    }
    function fillData() {
        $.pitch.text = currentIdea.pitch;
        $.match.title = String(currentIdea.matches);
        $.noMatch.title = String(currentIdea.noMatches);
        $.userName.text = currentIdea.user.first_name ? currentIdea.user.first_name + " " + currentIdea.user.last_name : "Sin nombre";
        Alloy.Globals.Cloud.Objects.query({
            classname: "comments",
            where: {
                ideaId: currentIdea.id
            },
            order: "make,created_at"
        }, function(e) {
            if (e.success) {
                $.comment.title = e.comments.length;
                for (var i = 0; e.comments.length > i; i++) {
                    var commentView = createComment(e.comments[i].text);
                    $.content.add(commentView);
                }
                var commentArea = Titanium.UI.createTextArea({
                    id: "comment",
                    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                    hintText: "Nuevo comentario...",
                    color: "black",
                    textAlign: "left",
                    returnKeyType: Ti.UI.RETURNKEY_DONE,
                    width: "80%",
                    height: 100
                });
                commentArea.addEventListener("return", function() {
                    var textComment = commentArea.value;
                    var userId = Alloy.Globals.getUserId();
                    var dict = {
                        classname: "comments",
                        fields: {
                            text: textComment,
                            ideaId: currentIdea.id
                        },
                        acl_name: "commentsACL",
                        user_id: userId
                    };
                    Alloy.Globals.Cloud.Objects.create(dict, function(e) {
                        if (e.success) {
                            var main = Alloy.createController("main").getView();
                            main.open();
                        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                    });
                });
                newComment.add(commentArea);
                $.content.add(newComment);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function comment() {
        Titanium.API.info("comment");
        $.content.scrollTo(newComment.getCenter().x, newComment.getCenter().y);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ideaProfile";
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
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        top: "30",
        bottom: "30",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 150,
        top: 0,
        left: 0,
        id: "__alloyId6"
    });
    $.__views.content.add($.__views.__alloyId6);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/someImage.png",
        width: "150",
        height: "100"
    });
    $.__views.__alloyId6.add($.__views.userImage);
    showProfile ? $.__views.userImage.addEventListener("click", showProfile) : __defers["$.__views.userImage!click!showProfile"] = true;
    $.__views.__alloyId7 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId7"
    });
    $.__views.content.add($.__views.__alloyId7);
    $.__views.userName = Ti.UI.createLabel({
        id: "userName",
        color: "#900",
        shadowColor: "#aaa",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId7.add($.__views.userName);
    showProfile ? $.__views.userName.addEventListener("click", showProfile) : __defers["$.__views.userName!click!showProfile"] = true;
    $.__views.__alloyId8 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "__alloyId8"
    });
    $.__views.content.add($.__views.__alloyId8);
    $.__views.pitch = Ti.UI.createLabel({
        text: "",
        id: "pitch",
        color: "blue",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: "200",
        height: "200"
    });
    $.__views.__alloyId8.add($.__views.pitch);
    $.__views.__alloyId9 = Ti.UI.createView({
        width: "100%",
        height: 40,
        id: "__alloyId9"
    });
    $.__views.win.add($.__views.__alloyId9);
    $.__views.match = Ti.UI.createButton({
        id: "match",
        backgroundImage: "/images/like.png",
        bottom: "5",
        width: "50",
        height: "50",
        backgroundColor: "green",
        left: "50"
    });
    $.__views.__alloyId9.add($.__views.match);
    match ? $.__views.match.addEventListener("click", match) : __defers["$.__views.match!click!match"] = true;
    $.__views.comment = Ti.UI.createButton({
        id: "comment",
        backgroundImage: "/images/comment.png",
        bottom: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId9.add($.__views.comment);
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
    $.__views.__alloyId9.add($.__views.noMatch);
    noMatch ? $.__views.noMatch.addEventListener("click", noMatch) : __defers["$.__views.noMatch!click!noMatch"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentIdea = null;
    var currentUser = null;
    var newComment = Ti.UI.createView({
        center: {
            x: 160,
            y: 240
        },
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        width: "100%",
        height: 150,
        top: 0,
        left: 0
    });
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    currentUser = Alloy.Globals.getUserId();
    if (null != Alloy.Globals.ideaToShow) {
        findIdea(Alloy.Globals.ideaToShow);
        Alloy.Globals.ideaToShow = null;
    } else getCurrentIdea(currentUser);
    __defers["$.__views.userImage!click!showProfile"] && $.__views.userImage.addEventListener("click", showProfile);
    __defers["$.__views.userName!click!showProfile"] && $.__views.userName.addEventListener("click", showProfile);
    __defers["$.__views.match!click!match"] && $.__views.match.addEventListener("click", match);
    __defers["$.__views.comment!click!comment"] && $.__views.comment.addEventListener("click", comment);
    __defers["$.__views.noMatch!click!noMatch"] && $.__views.noMatch.addEventListener("click", noMatch);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
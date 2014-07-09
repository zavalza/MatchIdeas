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
        var textLabel = Ti.UI.createTextField({
            text: commentText,
            top: 10,
            left: "10%",
            width: "100%",
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
                $.matchCount.text = "0";
                $.noMatchCount.text = "0";
            } else alert("Error:" + (e.error && e.message || JSON.stringify(e)));
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
    function showProfile() {
        Titanium.API.info("show profile");
        Alloy.Globals.userToShow = currentIdea.user.id;
        Alloy.createController("userProfile").getView().open();
    }
    function fillData() {
        $.pitch.text = currentIdea.pitch;
        $.matchCount.text = String(currentIdea.matches);
        $.noMatchCount.text = String(currentIdea.noMatches);
        $.userName.text = currentIdea.user.first_name ? currentIdea.user.first_name + " " + currentIdea.user.last_name : "Sin nombre";
        Alloy.Globals.Cloud.Objects.query({
            classname: "comments",
            where: {
                ideaId: currentIdea.id
            },
            order: "make,created_at"
        }, function(e) {
            if (e.success) {
                $.commentCount.text = e.comments.length;
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
                        e.success ? findIdea(currentIdea.id) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
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
        bottom: "70",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 120,
        top: 0,
        left: 0,
        id: "__alloyId6"
    });
    $.__views.content.add($.__views.__alloyId6);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/someImage.png",
        top: "10",
        width: "150",
        height: "100"
    });
    $.__views.__alloyId6.add($.__views.userImage);
    showProfile ? $.__views.userImage.addEventListener("click", showProfile) : __defers["$.__views.userImage!click!showProfile"] = true;
    $.__views.__alloyId7 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId7"
    });
    $.__views.content.add($.__views.__alloyId7);
    $.__views.userName = Ti.UI.createLabel({
        color: "#cc0a98",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "userName",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId7.add($.__views.userName);
    showProfile ? $.__views.userName.addEventListener("click", showProfile) : __defers["$.__views.userName!click!showProfile"] = true;
    $.__views.__alloyId8 = Ti.UI.createView({
        width: "100%",
        top: "0",
        left: "0",
        borderWidth: "2",
        borderColor: "#e9e9e9",
        height: "120",
        id: "__alloyId8"
    });
    $.__views.content.add($.__views.__alloyId8);
    $.__views.pitch = Ti.UI.createLabel({
        color: "#04cbca",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        text: "",
        id: "pitch",
        width: "80%"
    });
    $.__views.__alloyId8.add($.__views.pitch);
    $.__views.__alloyId9 = Ti.UI.createView({
        width: "100%",
        height: 70,
        bottom: "0",
        id: "__alloyId9"
    });
    $.__views.win.add($.__views.__alloyId9);
    $.__views.match = Ti.UI.createButton({
        id: "match",
        backgroundImage: "/images/like.png",
        bottom: "20",
        width: "50",
        height: "50",
        backgroundColor: "#04cbca",
        left: "50"
    });
    $.__views.__alloyId9.add($.__views.match);
    match ? $.__views.match.addEventListener("click", match) : __defers["$.__views.match!click!match"] = true;
    $.__views.matchCount = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        color: "#04cbca",
        id: "matchCount",
        bottom: "0",
        left: "75"
    });
    $.__views.__alloyId9.add($.__views.matchCount);
    match ? $.__views.matchCount.addEventListener("click", match) : __defers["$.__views.matchCount!click!match"] = true;
    $.__views.comment = Ti.UI.createButton({
        id: "comment",
        backgroundImage: "/images/comment.png",
        bottom: "20",
        width: "50",
        height: "50",
        backgroundColor: "#cbc01f"
    });
    $.__views.__alloyId9.add($.__views.comment);
    comment ? $.__views.comment.addEventListener("click", comment) : __defers["$.__views.comment!click!comment"] = true;
    $.__views.commentCount = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        color: "#cbc01f",
        id: "commentCount",
        bottom: "0"
    });
    $.__views.__alloyId9.add($.__views.commentCount);
    comment ? $.__views.commentCount.addEventListener("click", comment) : __defers["$.__views.commentCount!click!comment"] = true;
    $.__views.noMatch = Ti.UI.createButton({
        id: "noMatch",
        backgroundImage: "/images/dislike.png",
        bottom: "20",
        width: "50",
        height: "50",
        backgroundColor: "#cc0a98",
        right: "50"
    });
    $.__views.__alloyId9.add($.__views.noMatch);
    noMatch ? $.__views.noMatch.addEventListener("click", noMatch) : __defers["$.__views.noMatch!click!noMatch"] = true;
    $.__views.noMatchCount = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        color: "#cc0a98",
        id: "noMatchCount",
        bottom: "0",
        right: "75"
    });
    $.__views.__alloyId9.add($.__views.noMatchCount);
    noMatch ? $.__views.noMatchCount.addEventListener("click", noMatch) : __defers["$.__views.noMatchCount!click!noMatch"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentIdea = null;
    var currentUser = null;
    var newComment = Ti.UI.createView({
        center: {
            x: Ti.UI.SIZE / 2,
            y: Ti.UI.SIZE
        },
        backgroundColor: "white",
        width: "80%",
        height: 100,
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
    __defers["$.__views.matchCount!click!match"] && $.__views.matchCount.addEventListener("click", match);
    __defers["$.__views.comment!click!comment"] && $.__views.comment.addEventListener("click", comment);
    __defers["$.__views.commentCount!click!comment"] && $.__views.commentCount.addEventListener("click", comment);
    __defers["$.__views.noMatch!click!noMatch"] && $.__views.noMatch.addEventListener("click", noMatch);
    __defers["$.__views.noMatchCount!click!noMatch"] && $.__views.noMatchCount.addEventListener("click", noMatch);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
function Controller() {
    function createComment(commentText, author) {
        var comment = Ti.UI.createView({
            backgroundColor: "white",
            width: "100%",
            height: Ti.UI.SIZE,
            top: 0
        });
        var textLabel = Ti.UI.createLabel({
            text: commentText,
            color: "black",
            top: 10,
            left: 5
        });
        var authorLabel = Ti.UI.createLabel({
            text: author,
            color: "blue",
            bottom: 0,
            right: 5
        });
        comment.add(textLabel);
        comment.add(authorLabel);
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
        if (null != currentIdea) if (currentIdea.user.id == Alloy.Globals.getUserId()) alert("Tú creaste la idea, no puedes votar"); else {
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
        if (null != currentIdea) if (currentIdea.user.id == Alloy.Globals.getUserId()) alert("Tú creaste la idea, no puedes votar"); else {
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
        $.pitch.text = '"' + currentIdea.pitch + '"';
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
                    var author = e.comments[i].user.first_name + " " + e.comments[i].user.last_name;
                    var commentView = createComment(e.comments[i].text, author);
                    $.content.add(commentView);
                }
                var commentArea = Titanium.UI.createTextArea({
                    id: "comment",
                    borderColor: "#04cbca",
                    borderWidth: 2,
                    hintText: "Nuevo comentario...",
                    color: "black",
                    textAlign: "left",
                    returnKeyType: Ti.UI.RETURNKEY_DONE,
                    width: "80%",
                    height: Ti.UI.SIZE
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
                            Alloy.Globals.ideaToShow = currentIdea.id;
                            Alloy.createController("main").getView().open();
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
        bottom: "70",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId0"
    });
    $.__views.content.add($.__views.__alloyId0);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/profilePic.png",
        top: "10",
        width: "120",
        height: "120"
    });
    $.__views.__alloyId0.add($.__views.userImage);
    showProfile ? $.__views.userImage.addEventListener("click", showProfile) : __defers["$.__views.userImage!click!showProfile"] = true;
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "__alloyId1"
    });
    $.__views.content.add($.__views.__alloyId1);
    $.__views.userName = Ti.UI.createLabel({
        color: "#cc0a98",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "userName"
    });
    $.__views.__alloyId1.add($.__views.userName);
    showProfile ? $.__views.userName.addEventListener("click", showProfile) : __defers["$.__views.userName!click!showProfile"] = true;
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        borderWidth: "2",
        borderColor: "#e9e9e9",
        id: "__alloyId2"
    });
    $.__views.content.add($.__views.__alloyId2);
    $.__views.pitchTitle = Ti.UI.createLabel({
        color: "#cbc01f",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "pitchTitle",
        text: "IDEA"
    });
    $.__views.__alloyId2.add($.__views.pitchTitle);
    $.__views.pitch = Ti.UI.createLabel({
        color: "#04cbca",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        text: "",
        id: "pitch",
        top: "30",
        width: "80%"
    });
    $.__views.__alloyId2.add($.__views.pitch);
    $.__views.__alloyId3 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        borderWidth: "2",
        borderColor: "#e9e9e9",
        id: "__alloyId3"
    });
    $.__views.content.add($.__views.__alloyId3);
    $.__views.comments = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "comments"
    });
    $.__views.content.add($.__views.comments);
    $.__views.commentsTitle = Ti.UI.createLabel({
        color: "#cbc01f",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "commentsTitle",
        text: "COMENTARIOS"
    });
    $.__views.comments.add($.__views.commentsTitle);
    $.__views.__alloyId4 = Ti.UI.createView({
        width: "100%",
        height: 70,
        bottom: "0",
        id: "__alloyId4"
    });
    $.__views.win.add($.__views.__alloyId4);
    $.__views.match = Ti.UI.createButton({
        id: "match",
        backgroundImage: "/images/like.png",
        bottom: "20",
        width: "50",
        height: "50",
        backgroundColor: "#04cbca",
        left: "50"
    });
    $.__views.__alloyId4.add($.__views.match);
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
    $.__views.__alloyId4.add($.__views.matchCount);
    match ? $.__views.matchCount.addEventListener("click", match) : __defers["$.__views.matchCount!click!match"] = true;
    $.__views.comment = Ti.UI.createButton({
        id: "comment",
        backgroundImage: "/images/comment.png",
        bottom: "20",
        width: "50",
        height: "50",
        backgroundColor: "#cbc01f"
    });
    $.__views.__alloyId4.add($.__views.comment);
    comment ? $.__views.comment.addEventListener("click", comment) : __defers["$.__views.comment!click!comment"] = true;
    $.__views.commentCount = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        color: "#cbc01f",
        id: "commentCount",
        bottom: "0"
    });
    $.__views.__alloyId4.add($.__views.commentCount);
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
    $.__views.__alloyId4.add($.__views.noMatch);
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
    $.__views.__alloyId4.add($.__views.noMatchCount);
    noMatch ? $.__views.noMatchCount.addEventListener("click", noMatch) : __defers["$.__views.noMatchCount!click!noMatch"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentIdea = null;
    var currentUser = null;
    var newComment = Ti.UI.createView({
        center: {
            x: 0,
            y: 1e4
        },
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 10,
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
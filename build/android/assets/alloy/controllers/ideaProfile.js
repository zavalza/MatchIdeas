function Controller() {
    function newRow() {
        var row = Titanium.UI.createView({
            backgroundColor: "white",
            width: "100%",
            height: Ti.UI.SIZE,
            top: 0,
            left: 0
        });
        return row;
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
            if (e.success) if (null != currentIdea) currentIdea = e.ideas[0]; else {
                currentIdea = e.ideas[0];
                fillData();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function match() {
        Titanium.API.info("Match");
        if (null != currentIdea) if (currentIdea.user.id == Alloy.Globals.UserId) alert("Tú creaste la idea, no puedes votar"); else {
            findIdea(currentIdea.id);
            var votes = JSON.stringify(currentIdea.votedBy);
            votes = votes.substring(1, votes.length - 1);
            votes = votes + "," + '"' + Alloy.Globals.UserId + '"';
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
        if (null != currentIdea) if (currentIdea.user.id == Alloy.Globals.UserId) alert("Tú creaste la idea, no puedes votar"); else {
            findIdea(currentIdea.id);
            var votes = JSON.stringify(currentIdea.votedBy);
            votes = votes.substring(1, votes.length - 1);
            votes = votes + "," + '"' + Alloy.Globals.UserId + '"';
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
        if (null != currentIdea) {
            var imageRow = newRow();
            var profilePic = Ti.UI.createImageView({
                image: "/images/profilePic.png",
                top: 10,
                width: 120,
                height: 120
            });
            profilePic.addEventListener("click", function() {
                showProfile();
            });
            imageRow.add(profilePic);
            scrollView.add(imageRow);
            var nameRow = newRow();
            var nameLabel = Ti.UI.createLabel({
                text: currentIdea.user.first_name + " " + currentIdea.user.last_name,
                font: {
                    fontFamily: "SourceSansPro-Regular"
                },
                color: "#cc0a98"
            });
            nameRow.add(nameLabel);
            scrollView.add(nameRow);
            var pitchRow = newRow();
            var pitchTitle = Ti.UI.createLabel({
                text: "IDEA",
                font: {
                    fontFamily: "SourceSansPro-Regular"
                },
                color: "#cbc01f",
                top: 5
            });
            pitchRow.add(pitchTitle);
            var text = '"' + currentIdea.pitch + '"';
            var words = text.split(" ");
            var winWidth = Titanium.Platform.displayCaps.platformWidth;
            var oneSpace = 100 * (7 / winWidth);
            var rowNumber = 0;
            var writtenChars = 0;
            var usedSpace = 7;
            for (var i = 0; words.length > i; i++) {
                if (usedSpace + words[i].length * oneSpace > 85) {
                    rowNumber += 1;
                    usedSpace = 7;
                    writtenChars = 0;
                }
                usedSpace = oneSpace * writtenChars + oneSpace;
                switch (words[i][0]) {
                  case "#":
                    var wordLabel = Ti.UI.createLabel({
                        color: "#04cbca",
                        font: {
                            fontFamily: "SourceSansPro-Regular"
                        },
                        text: words[i],
                        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                        top: 30 + 30 * rowNumber,
                        left: String(usedSpace) + "%"
                    });
                    break;

                  default:
                    var wordLabel = Ti.UI.createLabel({
                        color: "black",
                        font: {
                            fontFamily: "SourceSansPro-Regular"
                        },
                        text: words[i],
                        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                        top: 30 + 30 * rowNumber,
                        left: String(usedSpace) + "%"
                    });
                }
                writtenChars += words[i].length + 1;
                pitchRow.add(wordLabel);
            }
            scrollView.add(pitchRow);
            Alloy.Globals.Cloud.Objects.query({
                classname: "comments",
                where: {
                    ideaId: currentIdea.id
                },
                order: "make,created_at"
            }, function(e) {
                if (e.success) {
                    if (e.comments.length > 0) {
                        var commentsRow = newRow();
                        var commentsTitle = Ti.UI.createLabel({
                            font: {
                                fontFamily: "SourceSansPro-Regular"
                            },
                            color: "#cbc01f",
                            text: "COMENTARIOS"
                        });
                        commentsRow.add(commentsTitle);
                        scrollView.add(commentsRow);
                        for (var i = 0; e.comments.length > i; i++) {
                            var authorName = e.comments[i].user.first_name + " " + e.comments[i].user.last_name;
                            var authorId = e.comments[i].user.id;
                            var comment = Ti.UI.createView({
                                backgroundColor: "white",
                                width: "100%",
                                height: Ti.UI.SIZE,
                                top: 0
                            });
                            var textLabel = Ti.UI.createLabel({
                                text: e.comments[i].text,
                                color: "black",
                                top: 10,
                                left: 5
                            });
                            var authorLabel = Ti.UI.createLabel({
                                text: authorName,
                                color: "blue",
                                bottom: 0,
                                right: 5
                            });
                            authorLabel.addEventListener("click", function() {
                                Titanium.API.info("show user profile");
                                Alloy.Globals.userToShow = authorId;
                                Alloy.createController("userProfile").getView().open();
                            });
                            comment.add(textLabel);
                            comment.add(authorLabel);
                            scrollView.add(comment);
                        }
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
                        var userId = Alloy.Globals.UserId;
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
                                newComment.blur();
                                newComment = Ti.UI.createView({
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
                                scrollView.removeAllChildren();
                                fillData();
                            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                        });
                    });
                    newComment.add(commentArea);
                    scrollView.add(newComment);
                    $.win.add(scrollView);
                    var matchActions = Titanium.UI.createView({
                        backgroundColor: "white",
                        width: "100%",
                        height: "70",
                        bottom: 0
                    });
                    var matchButton = Titanium.UI.createButton({
                        backgroundImage: "/images/like.png",
                        bottom: 20,
                        width: 50,
                        height: 50,
                        backgroundColor: "#04cbca",
                        left: "25%"
                    });
                    matchButton.addEventListener("click", function() {
                        match();
                    });
                    var matchLabel = Ti.UI.createLabel({
                        text: String(currentIdea.matches),
                        font: {
                            fontFamily: "SourceSansPro-Regular"
                        },
                        color: "#04cbca",
                        bottom: 0,
                        left: "25%",
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                    });
                    matchActions.add(matchButton);
                    matchActions.add(matchLabel);
                    var commentButton = Titanium.UI.createButton({
                        backgroundImage: "/images/comment.png",
                        bottom: 20,
                        width: 50,
                        height: 50,
                        backgroundColor: "#cbc01f"
                    });
                    commentButton.addEventListener("click", function() {
                        Titanium.API.info("comment");
                        scrollView.scrollTo(newComment.getCenter().x, newComment.getCenter().y);
                    });
                    var commentLabel = Ti.UI.createLabel({
                        text: e.comments.length,
                        font: {
                            fontFamily: "SourceSansPro-Regular"
                        },
                        color: "#cbc01f",
                        bottom: 0,
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                    });
                    matchActions.add(commentButton);
                    matchActions.add(commentLabel);
                    var noMatchButton = Titanium.UI.createButton({
                        backgroundImage: "/images/dislike.png",
                        bottom: 20,
                        width: 50,
                        height: 50,
                        backgroundColor: "#cc0a98",
                        right: "25%"
                    });
                    noMatchButton.addEventListener("click", function() {
                        noMatch();
                    });
                    var noMatchLabel = Ti.UI.createLabel({
                        text: String(currentIdea.noMatches),
                        font: {
                            fontFamily: "SourceSansPro-Regular"
                        },
                        color: "#cc0a98",
                        bottom: 0,
                        right: "25%",
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                    });
                    matchActions.add(noMatchButton);
                    matchActions.add(noMatchLabel);
                    $.win.add(matchActions);
                } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ideaProfile";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentIdea = null;
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
    var scrollView = Ti.UI.createScrollView({
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: true,
        top: 30,
        bottom: 70
    });
    Ti.UI.Android && ($.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
    if (null != Alloy.Globals.ideaToShow) {
        findIdea(Alloy.Globals.ideaToShow);
        Alloy.Globals.ideaToShow = null;
    } else getCurrentIdea(Alloy.Globals.UserId);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
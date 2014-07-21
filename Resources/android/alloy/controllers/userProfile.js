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
    this.__controllerPath = "userProfile";
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
    $.__views.__alloyId27 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 120,
        top: 0,
        left: 0,
        id: "__alloyId27"
    });
    $.__views.content.add($.__views.__alloyId27);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/profilePic.png",
        width: "120",
        height: "120"
    });
    $.__views.__alloyId27.add($.__views.userImage);
    $.__views.__alloyId28 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId28"
    });
    $.__views.content.add($.__views.__alloyId28);
    $.__views.name = Ti.UI.createLabel({
        color: "#cc0a98",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "name",
        text: "Sin nombre",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId28.add($.__views.name);
    $.__views.networks = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "networks"
    });
    $.__views.content.add($.__views.networks);
    $.__views.__alloyId29 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId29"
    });
    $.__views.content.add($.__views.__alloyId29);
    $.__views.ideasTitle = Ti.UI.createLabel({
        color: "#cbc01f",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "ideasTitle",
        text: "IDEAS",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId29.add($.__views.ideasTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentUser = null;
    var userId = Alloy.Globals.userToShow;
    Alloy.Globals.Cloud.Users.show({
        user_id: userId
    }, function(e) {
        if (e.success) {
            currentUser = e.users[0];
            "undefined" != typeof currentUser.external_accounts[0] ? Alloy.Globals.Facebook.requestWithGraphPath(currentUser.external_accounts[0].external_id, {}, "GET", function(e) {
                if (e.success) {
                    var fbUser = JSON.parse(e.result);
                    $.name.text = fbUser.first_name + " " + fbUser.last_name;
                    var fbButton = Titanium.UI.createButton({
                        title: "Facebook",
                        top: 10,
                        bottom: 5,
                        color: "white",
                        backgroundColor: "blue",
                        width: 100,
                        height: 50
                    });
                    fbButton.addEventListener("click", function() {
                        var webview = Titanium.UI.createWebView({
                            url: fbUser.link
                        });
                        var window = Titanium.UI.createWindow();
                        window.add(webview);
                        window.open({
                            modal: true
                        });
                    });
                    $.networks.add(fbButton);
                } else e.error ? alert(e.error) : alert("Unknown response");
            }) : $.name.text = currentUser.first_name + " " + currentUser.last_name;
            Alloy.Globals.Cloud.Objects.query({
                classname: "ideas",
                where: {
                    user_id: currentUser.id
                },
                limit: 20,
                order: "make,created_at"
            }, function(e) {
                if (e.success) for (var i = 0; e.ideas.length > i; i++) {
                    var ideasView = createIdea(e.ideas[i].id, e.ideas[i].pitch);
                    $.content.add(ideasView);
                } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
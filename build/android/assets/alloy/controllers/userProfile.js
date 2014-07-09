function Controller() {
    function createIdea(id, pitch) {
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
        idea.addEventListener("click", function() {
            alert("idea " + id);
            Alloy.Globals.ideaToShow = id;
            Alloy.createController("main").getView().open();
        });
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
    $.__views.__alloyId34 = Ti.UI.createView({
        width: "100%",
        height: 50,
        id: "__alloyId34"
    });
    $.__views.win.add($.__views.__alloyId34);
    $.__views.menu = Ti.UI.createButton({
        id: "menu",
        backgroundImage: "/images/menuIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white",
        left: "5"
    });
    $.__views.__alloyId34.add($.__views.menu);
    showMenu ? $.__views.menu.addEventListener("click", showMenu) : __defers["$.__views.menu!click!showMenu"] = true;
    $.__views.newIdea = Ti.UI.createButton({
        id: "newIdea",
        backgroundImage: "/images/newIdeaIcon.png",
        top: "5",
        width: "50",
        height: "50",
        backgroundColor: "white"
    });
    $.__views.__alloyId34.add($.__views.newIdea);
    showNewIdea ? $.__views.newIdea.addEventListener("click", showNewIdea) : __defers["$.__views.newIdea!click!showNewIdea"] = true;
    $.__views.content = Ti.UI.createScrollView({
        id: "content",
        top: "50",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true"
    });
    $.__views.win.add($.__views.content);
    $.__views.__alloyId35 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 120,
        top: 0,
        left: 0,
        id: "__alloyId35"
    });
    $.__views.content.add($.__views.__alloyId35);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        image: "/images/someImage.png",
        width: "150",
        height: "100"
    });
    $.__views.__alloyId35.add($.__views.userImage);
    $.__views.__alloyId36 = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        id: "__alloyId36"
    });
    $.__views.content.add($.__views.__alloyId36);
    $.__views.name = Ti.UI.createLabel({
        id: "name",
        color: "#900",
        shadowColor: "#aaa",
        text: "Sin nombre",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId36.add($.__views.name);
    $.__views.networks = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: 70,
        top: 0,
        left: 0,
        id: "networks"
    });
    $.__views.content.add($.__views.networks);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentUser = null;
    var userId = Alloy.Globals.userToShow;
    Alloy.Globals.Cloud.Users.show({
        user_id: userId
    }, function(e) {
        if (e.success) {
            currentUser = e.users[0];
            currentUser.external_accounts ? Alloy.Globals.Facebook.requestWithGraphPath(currentUser.external_accounts[0].external_id, {}, "GET", function(e) {
                if (e.success) {
                    alert(e.result);
                    var fbUser = JSON.parse(e.result);
                    alert(fbUser);
                    $.name.text = fbUser.first_name + " " + fbUser.last_name;
                    var emailButton = Titanium.UI.createButton({
                        title: "Email",
                        top: 10,
                        left: 20,
                        width: 100,
                        height: 50
                    });
                    emailButton.addEventListener("click", function() {
                        var emailDialog = Ti.UI.createEmailDialog();
                        emailDialog.subject = "Contacto de MatchIdeas";
                        emailDialog.toRecipients = [ fbUser.email ];
                        emailDialog.messageBody = "Mensaje...";
                        emailDialog.open();
                    });
                    $.networks.add(emailButton);
                    var fbButton = Titanium.UI.createButton({
                        title: "Facebook",
                        top: 10,
                        right: 20,
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
            }) : currentUser.first_name && ($.name.text = currentUser.first_name + " " + currentUser.last_name);
            Alloy.Globals.Cloud.Objects.query({
                classname: "ideas",
                where: {
                    user_id: currentUser.id
                },
                order: "make,created_at"
            }, function(e) {
                if (e.success) for (var i = 0; e.ideas.length > i; i++) {
                    var ideasView = createIdea(e.ideas[i].id, e.ideas[i].pitch);
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
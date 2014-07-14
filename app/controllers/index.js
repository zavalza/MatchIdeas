
function tryLogin(e){
    Titanium.API.info("Trying login...");
    var cloud = Alloy.Globals.Cloud;
    cloud.Users.login({
    login: $.email.value,
    password: $.password.value
}, function (e) {
    if (e.success) {
    	var sessionId = Alloy.Globals.Cloud.sessionId;
    	alert(sessionId);
    	Ti.App.Properties.setString('storedSession', sessionId);
        var main = Alloy.createController('main').getView();
        main.open();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
};
function newUserForm(e){
    Titanium.API.info("Show new user form");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function terms(e){
    Titanium.API.info("Show terms");
    var terms = Alloy.createController('terms').getView();
    terms.open();
};


var fb  = Alloy.Globals.Facebook;

$.fbLogin.add(fb.createLoginButton({
    style : fb.BUTTON_STYLE_WIDE
}));


//$.index.open();
	
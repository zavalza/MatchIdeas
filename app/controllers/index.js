function tryLogin(e){
    //Displays log message on console
    Titanium.API.info("Trying login...");
    var cloud = Alloy.Globals.Cloud;
    cloud.Users.login({
    login: $.email.value,
    password: $.password.value
}, function (e) {
    if (e.success) {
        var main = Alloy.createController('main').getView();
        main.open();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
};
function newUserForm(e){
    //Displays log message on console
    Titanium.API.info("Show new user form");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function terms(e){
    //Displays log message on console
    Titanium.API.info("Show terms");
    var terms = Alloy.createController('terms').getView();
    terms.open();
};



var fb  = Alloy.Globals.Facebook;

//Check if user is logged in
Alloy.Globals.Cloud.Users.showMe(function (e) {
    if (e.success) 
    {//User is logged with email
        var main = Alloy.createController('main').getView();
        main.open();
    } 
    else
    { 
		 if(fb.loggedIn)
		{
			//user is logged with facebook
			var main = Alloy.createController('main').getView();
		        main.open();
		}
		else
		{
			//we require log in
			fb.authorize();
			$.index.open();
		}
    }
});


fb.appid = 305737346271076;
fb.permissions = ['public_profile']; // Permissions your app needs
fb.forceDialogAuth = false; //Uses the native app of Facebook if aviable
fb.addEventListener('login', function(e) {
    if (e.success) 
    {
        Alloy.Globals.Cloud.SocialIntegrations.externalAccountLogin({
		type: 'facebook',
		token: fb.accessToken
		}, function (e) {
		if (e.success) {
		var user = e.users[0];
		Alloy.Globals.FbUser = user.id;;
		var main = Alloy.createController('main').getView();
        main.open();
		} 
		else 
		{
		alert('Error:\n' +
		((e.error && e.message) || JSON.stringify(e)));
		}
		});
    } 
    else if (e.error) 
    {
        alert(e.error);
    } 
    else if (e.cancelled) 
    {
        alert("Cancelado");
    }
});


$.index.add(fb.createLoginButton({
    top : 110,
    style : fb.BUTTON_STYLE_WIDE
}));





/*var win = Ti.UI.createWindow({backgroundColor: 'white'});
var send = Titanium.UI.createButton({
    title : 'Send',
    style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
var cancel = Titanium.UI.createButton({
    systemButton : Titanium.UI.iPhone.SystemButton.CANCEL
});
var flexSpace = Titanium.UI.createButton({
    systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var textField = Titanium.UI.createTextField({
    borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
    hintText : 'correo electrónico',
    keyboardToolbar : [cancel, flexSpace, send],
    keyboardToolbarColor : '#999',
    keyboardToolbarHeight : 40,
    top : 30,
    width : 300, height : 35
});

win.add(textField);
// Add the Facebook button.  Note that it doesn't need a click event listener.
win.add(fb.createLoginButton({
    top : 10,
    style : fb.BUTTON_STYLE_WIDE
}));

win.open();*/
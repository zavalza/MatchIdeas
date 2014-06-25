function tryLogin(e){
    //Displays log message on console
    Titanium.API.info("Trying login...");
};


var fb  = Alloy.Globals.Facebook;;
fb.appid = 305737346271076;
fb.permissions = ['public_profile']; // Permissions your app needs
fb.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged In');
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
        alert("Canceled");
    }
});
fb.authorize();
$.index.add(fb.createLoginButton({
    top : 40,
    style : fb.BUTTON_STYLE_WIDE
}));
$.index.open();



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
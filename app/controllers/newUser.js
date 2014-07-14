function createUser(e){
    //Displays log message on console
    Titanium.API.info("Creating user with ACS");
    var cloud = Alloy.Globals.Cloud;
    cloud.Users.create({
    email: $.email.value,
    first_name: $.firstName.value,
    last_name: $.lastName.value,
    password: $.password.value,
    password_confirmation: $.passwordConfirmation.value
}, function (e) {
    if (e.success) {
        var sessionId = Alloy.Globals.Cloud.sessionId;
    	alert(sessionId);
    	Ti.App.Properties.setString('storedSession', sessionId);
        var newIdea = Alloy.createController('newIdea').getView();
        newIdea.open();
        
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
};

function terms(e){
    //Displays log message on console
    Titanium.API.info("Show terms");
    var terms = Alloy.createController('terms').getView();
    terms.open();
};

var fb  = Alloy.Globals.Facebook;
$.fbLogin.add(fb.createLoginButton({
    style : fb.BUTTON_STYLE_WIDE
}));
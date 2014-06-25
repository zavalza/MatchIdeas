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
        var user = e.users[0];
        alert('Success:\n' +
            'id: ' + user.id + '\n' +
            'sessionId: ' + cloud.sessionId + '\n' +
            'first name: ' + user.first_name + '\n' +
            'last name: ' + user.last_name);
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
$.mainView.add(fb.createLoginButton({
    top : 110,
    style : fb.BUTTON_STYLE_WIDE
}));
function showMenu(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function done(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function showNewIdea(e){
    //Displays log message on console
    Titanium.API.info("show new idea");
    var newIdea = Alloy.createController('newIdea').getView();
    newIdea.open();
}

if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}

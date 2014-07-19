var menuButton = Titanium.UI.createButton({
   backgroundImage: "/images/menuIcon.png",
   backgroundColor: 'white',
   left:20,
   top: 5,
   width: 50,
   height: 50
});

var ideasButton = Titanium.UI.createButton({
   backgroundImage: "/images/ideaIcon.png",
   backgroundColor: 'white',
   top: 5,
   width: 50,
   height: 50
});

var newButton = Titanium.UI.createButton({
   backgroundImage: "/images/newIcon.png",
   backgroundColor: 'white',
   right:20,
   top: 5,
   width: 50,
   height: 50
});


$.win.add(menuButton);
$.win.add(ideasButton);
$.win.add(newButton);

Alloy.Globals.Menu = Alloy.createController('menu').getView();
Alloy.Globals.Ideas = Alloy.createController('ideaProfile').getView();
Alloy.Globals.NewIdea = Alloy.createController('newIdea').getView();
$.scrollableView.views=[Alloy.Globals.Menu, Alloy.Globals.Ideas, Alloy.Globals.NewIdea];
Alloy.Globals.Scrollable = $.scrollableView;

menuButton.addEventListener('click',function(e)
{
   Titanium.API.info("Go to menu view");
   $.scrollableView.scrollToView(Alloy.Globals.Menu);
   
});

ideasButton.addEventListener('click',function(e)
{
   Titanium.API.info("Go to ideas view");
   $.scrollableView.scrollToView(Alloy.Globals.Ideas);
   
});

newButton.addEventListener('click',function(e)
{
   Titanium.API.info("Go to newIdea view");
   $.scrollableView.scrollToView(Alloy.Globals.NewIdea);
   
});


if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}
$.scrollableView.scrollToView(Alloy.Globals.Ideas);
$.win.orientationModes = [Titanium.UI.PORTRAIT]; //Limitar a una sola orientación
$.win.open();




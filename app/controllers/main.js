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

var view1 = Alloy.createController('menu').getView();
var view2 = Alloy.createController('ideaProfile').getView();
var view3 = Alloy.createController('newIdea').getView();
$.scrollableView.views=[view1, view2, view3];

menuButton.addEventListener('click',function(e)
{
   Titanium.API.info("Go to menu view");
   $.scrollableView.scrollToView(view1);
   
});

ideasButton.addEventListener('click',function(e)
{
   Titanium.API.info("Go to ideas view");
   $.scrollableView.scrollToView(view2);
   
});

newButton.addEventListener('click',function(e)
{
   Titanium.API.info("Go to newIdea view");
   $.scrollableView.scrollToView(view3);
   
});


if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}
$.win.open();




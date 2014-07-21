if (Ti.Platform.name === "android"){
	// Use action bar search view
	var search = Ti.UI.Android.createSearchView({
	    hintText: "Buscar idea"
	});
	$.win.activity.onCreateOptionsMenu = function(e) {
	    var menu = e.menu;
	    var menuItem = menu.add({
	        title: 'Buscar idea',
	        actionView : search,
	        icon: "images/searchIcon.png",
	        showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
	    });
	    
	    menuItem.expandActionView();
	    
	    menuItem.addEventListener("collapse", function(e) {
	    	$.win.close();
	    });
	};
	
	var data = [];
	data.push(Ti.UI.createTableViewRow({title:'Apple'}));
	data.push(Ti.UI.createTableViewRow({title:'Banana'}));
	data.push(Ti.UI.createTableViewRow({title:'Orange'}));
	data.push(Ti.UI.createTableViewRow({title:'Raspberry'}));
	
	var tableview = Titanium.UI.createTableView({
	    data: data,
	    search: search,
	    searchAsChild: false
	});
	
	$.win.add(tableview);
	$.win.open();
}
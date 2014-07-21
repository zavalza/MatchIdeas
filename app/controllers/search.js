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
	
	//get all the last 50 tags used by the User
	Alloy.Globals.Cloud.Objects.query({
    classname: 'ideas',
    limit: 50,
    where: {
		      user_id: Alloy.Globals.UserId,
		      tags: {"$exists" : true} 
		    },
   sel:{"all":["tags"]}
	},function (e) {
	    if (e.success) {
	    	if (e.ideas.length > 0) //if there are results
	    	{
	    		var data = [];
	    		
	    		for(var i=0; i < e.ideas.length; i++)
	    		{
	    			if(typeof e.ideas[i].tags != 'undefined')
	    			{
	    				for(var j = 0; j < e.ideas[i].tags.length; j++)
		    			{
		    				var tagRow = Ti.UI.createTableViewRow(
		    					{title: e.ideas[i].tags[j],
		    					 width:'100%',
		    					 height: Ti.UI.SIZE,
		    					}
		    					);
		    				tagRow.addEventListener('click', function(e){
		    					search.value = search.value + " "+ e.rowData.title;
		    				});
		    				data.push(tagRow);
		    			}
	    			}
	    			
	    		}
	    		
	    		var tableview = Titanium.UI.createTableView({
			    data: data,
			    search: search,
			    searchAsChild: false
			});
	
			$.win.add(tableview);
			$.win.open();
	    	}
	        else
	        {
	        	alert ("No ha usado tags");
	        }
	        
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	    });
	
	
}
function createIdea(id, pitch) {
  var idea = Ti.UI.createView({
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    width:'100%', height: Ti.UI.SIZE,
    top: 0, left: 0
  });
  var textLabel = Ti.UI.createLabel({
    text: "\""+pitch+"\"",
    color: "#04cbca",
    top: 10, left: '10%',
    width: '80%'
  });
  idea.add(textLabel);
  idea.addEventListener('click',function(e)
	{
		//alert('idea ' + id );
		Alloy.Globals.ideaToShow = id;
		Alloy.createController('main').getView().open();
		
	});
  return idea;
}

Alloy.Globals.Cloud.Objects.query({
		    classname: 'ideas',
		    where: {
		        tags: {$in:Alloy.Globals.tagsToSearch}
		    },
		    limit: 20,
		    order: "make,created_at"
		 }, function (e) {
		    if (e.success) {
		    	//alert("ideas encontradas");
		    	//alert(e.ideas.length);
		    	for(var i = 0; i < e.ideas.length; i++){
				var ideasView = createIdea(e.ideas[i].id, e.ideas[i].pitch);
				$.content.add(ideasView);
				}
				$.win.open();
			 } else {
			        alert('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			});	
 
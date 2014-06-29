var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Facebook = require("facebook");

Alloy.Globals.Cloud = require("ti.cloud");

Alloy.Globals.FbUser = null;

Alloy.createController("index");
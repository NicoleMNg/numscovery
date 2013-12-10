
define(['backbone', '$', 'underscore'],
function(Backbone, $, _) {

	var Game = Backbone.Model.extend({
		defaults: {
			target: 1,
			lives: 3
		}
	});

	return new Game();

});
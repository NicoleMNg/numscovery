define(['backbone'], function() {

	var GameSettings = Backbone.Model.extend({
		'url': 'js/data/gamesettings.json'
	});

	return new GameSettings();
})
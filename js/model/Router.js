define(['backbone', '$', 'underscore', 'model/AppState'],
function(Backbone, $, _, AppState) {

	var Router = Backbone.Router.extend({
		routes: {
			'' : 'intro',
			'game': 'game',
			'intro': 'intro',
			'settings': 'settings',
			'scores': 'scores'
		},

		/// Load game state
		game: function() {
			AppState.set('currentState', 'game');
		},
		settings: function() {
			AppState.set('currentState', 'settings');
		},

		intro: function() {
			AppState.set('currentState', 'intro');
		},
		scores: function() {
			AppState.set('currentState', 'scores');
		}
	});

	return new Router();
});
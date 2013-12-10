define(['backbone', 'view/MainView', 'model/GameSettings'],
function(Backbone, MainView, GameSettings) {
	
	function MainController() {

		function init () {
			Backbone.emulateHTTP = true;

			GameSettings.fetch({success: function() {

				MainView.getInstance();
			}})
		}


		var api = {
			init: init
		};

		return api;
	}

	return new MainController();
});
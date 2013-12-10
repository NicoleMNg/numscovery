define(['$', 'model/AppState', 'view/GameView', 'view/IntroScreen', 'view/SettingsScreen', 'view/ScoresView'], 
	function($, AppState, GameView, IntroScreen, SettingsScreen, ScoresView) {

	function RouterManager($cont) {

		AppState.on('change:currentState', loadNewState);
		
		var game = new GameView();
		game.render();

		var intro = new IntroScreen();
		intro.render();

		var settings = new SettingsScreen();
		settings.render();

		var scores = new ScoresView();
		scores.render();

		var currentState = null;

		function loadNewState(m, newState) {
			switch(newState) {
				case 'game' :
					changeState(game);
					break;
				case 'intro' : 
					changeState(intro);
					break;
				case 'settings' : 
					changeState(settings);
					break;
				case 'scores' : 
					changeState(scores);
					break;
			}
		}

		function changeState(newState) {
			if(currentState) {
				currentState.hide();
			}
			currentState = newState;
			$cont.append(currentState.$el);
			currentState.show();
		}
	}

	return RouterManager;
});
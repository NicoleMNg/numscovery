define(['$', 'underscore', 'model/Router', 'controller/RouteManager', 'view/intro/IntroMenu'],
function($, _, Router, RouteManager, IntroMenu) {
	
	function MainView() {
		var content, $el;

		$el = $('#contentMain');

		var introMenu = new IntroMenu();
			introMenu.render();

			$('.menu').append(introMenu.$el);

		var routerManager = new RouteManager($el);

		setInterval(function() {
		  var number = 0 + Math.floor(Math.random() * 8);
		    $('.random').text(number);
		},
		1000); // every 1 second

		setInterval(function() {
		  var number = 0 + Math.floor(Math.random() * 8);
		  $('.random1').text(number);
		},
		2000); // every 2 seconds

		setInterval(function() {
		  var number = 0 + Math.floor(Math.random() * 8);
		  $('.random2').text(number);
		},
		1500); // every 1.5 second

		Backbone.history.start();
	}

	/**
	 * A singleton pattern in javascript - 
	 * Globaly accessible and only one can ever be created
	 */
	var singleton = {
		getInstance : function(){
			return singleton.instance || (singleton.instance = new MainView());
		}
	};
	
	return singleton;
});
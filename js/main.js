require.config({

	paths : {
		/** core dependencies **/
		'json2' : 'libs/json2',
		'$' : 'libs/jquery',
		'underscore' : 'libs/underscore',
		'backbone' : 'libs/backbone',

		/** requirejs plugins **/
		'text' : 'libs/text',
		'i18n' : 'libs/i18n',

		'TweenMax': 'libs/TweenMax.min',
		'easel': 'libs/easeljs-0.7.0.min',
		'flipclock' : 'libs/flipclock/js/flipclock.min',
		'jqueryval' : 'libs/jquery.validate.min',
		'meta' : 'libs/jquery.metadata',
		'foundation' : 'foundation/foundation',
		'reveal' : 'foundation/foundation.reveal',
		'localstorage' : 'libs/backbone.localStorage'
	},

	shim: {
		/** core dependencies **/
		'$' : {
			exports : '$'
		},
		'underscore': {
			exports : '_'
		},
		'backbone': {
			deps : ['underscore', '$', 'json2'],
			exports : 'Backbone'
		},
		'easel': {
			exports: 'easel'
		},
		'TweenMax':{
			exports: 'TweenMax'
		},
		'flipclock': {
			deps: ['$'],
			exports: 'flipclock'
		},
		'jqueryval':{
			deps: ['$'],
			exports: 'jqueryval'
		},
		'meta':{
			deps: ['$'],
			exports: 'meta'
		},
		'foundation': {
			deps: ['$'],
			exports: 'foundation'
		},
		'reveal': {
			deps: ['foundation'],
			exports: 'reveal'
		},
		'localstorage': {
			deps: ['underscore', '$', 'json2'],
			exports: 'localstorage'
		}
	},

	callback : function(){
		require(['$', 'controller/MainController', 'TweenMax', 'easel', 'jqueryval', 'meta', 'foundation', 'reveal', 'localstorage'],
			
		function( $, Controller) {
			$(document).ready(function() {
							
				//-- startup app
				Controller.init();
			});
		});
	}
});
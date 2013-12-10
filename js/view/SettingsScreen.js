/**
 * SettingsScreen
 * Author: Vy & Nikki
 */

define(['backbone', 'underscore', '$', 'text!templates/settings.html', 'view/BaseView',
	'view/intro/IntroMenu', 'model/AppState', 'model/GameSettings', 'model/Router'],
 function(Backbone, _, $, template, BaseView, IntroMenu, AppState, GameSettings) {
	
	var SettingsScreen = BaseView.extend({
		template:_.template(template),
		className: 'settings',
		className: 'menu',
		events: {
			'click .difficultyButtons': 'onDifficultyChange',
			'click .level': 'levelSelected',
			'click .validate' : 'validation',
			'click menu1': 'onMenuClick',
			'click .onoffswitch-checkbox' : 'toggleSettings',

			'change #range': 'onRangeChange',
			'change #time': 'onTimeChange',
			'change .showView' : 'submitReady'
		},
		initialize: function(options) {
			_.bindAll(this, 'initVars', 'render');
			this.initVars(options || {});
			this.model = GameSettings;
			this.model.set('menu1', 'Play');
			window.m = this.model;
			
		},
		initVars: function(options) {
			if(!this.model) {
				this.model = new Backbone.Model();
			}
			if(options.lexicon) {
				this.model.set(options.lexicon);
			}
		},
		render: function() {
			this.$el.html(this.template(this.model.attributes));
			$(".showView").hide();

			this.$el.find('.level').on("click", function(event) {
				$('.level').removeClass('active');
            	$(this).addClass('active');
			});
		},

		/** --- Events **/

		onDifficultyChange: function(e) {
			e.preventDefault();
			var id = e.target.id;

			AppState.set('difficulty', id);
			var diffData = GameSettings.get('difficultySettings')[id];
			AppState.set('gameTimer', diffData.timer);
			AppState.set('numberRange', diffData.range);


			return false;
		},

		levelSelected: function(e) {
			e.preventDefault;
			$( "#settingSubmit" )

            //.bind("click", $( "a.start" ).attr("href", "#game") )

            .bind( "click", this.linkGame() )
            .text( "Ready..Set..GO GO GO!" );
            $( "#settingSubmit" ).addClass('ready');
		},

		linkGame: function(e) {
			$( "a.start" ).attr("href", "#game");
		},

		onRangeChange: function(e) {
			var rangeVal = $(e.target).val();
			AppState.set('numberRange', rangeVal);

		},

		onTimeChange: function(e) {
			var timeVal = $(e.target).val();
			AppState.set('gameTimer', timeVal);
		},

		toggleSettings: function() {
			$(".showView").slideToggle("slow");
	        $(".first-options").slideToggle("slow");
	        $('#settingSubmit').toggleClass( "validate" );

			if($('.onoffswitch-checkbox').is(':checked')){
				 $( "#settingSubmit" )
				.bind( "click", this.linkGame() )
				.text( "Choose your settings!" );
				$( "#settingSubmit" ).removeClass('ready');
			} 
		},

		submitReady: function(e) {
			if ($('#range').val() != "" && $('#time').val() != "") {
				$( ".submit" ).addClass('ready')
				.text( "Ready..Set..GO GO GO!" );
			} else {
				$( ".submit" ).removeClass('ready')
				.text( "Choose your settings" );
			}
		},

		validation: function(e) {
			if ($('#range').val() == "") {
				e.preventDefault();
				if($('#rangeval').length == 0) {
					$( '<p id="rangeval">Please select something!</p>' ).insertAfter( "#range" );
				}	
			} else {
				$('#rangeval').remove();
			}
			if ($('#time').val() == "") {
				e.preventDefault();
				if($('#timeval').length == 0) {
					$('<p id="timeval">Please select something!</p>').insertAfter( "#time" );
				}
			} else {
				$('#timeval').remove();
			}	

		}


	});

	return SettingsScreen;
}

);
/**
 * Game
 * Author: Vy & Nikki
 */

define(['backbone', 'underscore', '$', 'text!templates/scores.html', 'view/BaseView',
	'view/intro/IntroMenu', 'model/AppState', 'model/Scores', 'model/Router', 'localstorage'],
 function(Backbone, _, $, template, BaseView, IntroMenu, AppState, Scores, localstorage) {
	
	var ScoresView = BaseView.extend({
		template:_.template(template),

		initialize: function(options) {
			_.bindAll(this, 'initVars', 'render');
			this.initVars(options || {});
			this.listenTo(this.model, "change", this.render);
			this.model = Scores;
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
		}		
	});

	return ScoresView;

}

);
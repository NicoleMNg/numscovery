/**
 * BaseView
 * Author: Vy & Nikki
 */

define(['backbone', 'underscore', '$'], function(Backbone, _, $) {
	
	var BaseView = Backbone.View.extend({
		hide: function() {
			this.$el.hide();

		},
		show: function() {
			this.render();
			this.$el.fadeIn("slow");
		}
	});

	return BaseView;
}

);
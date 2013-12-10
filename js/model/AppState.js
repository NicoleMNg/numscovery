/**
 * AppState
 * Author: Vy & Nikki
 */

define(['backbone', 'underscore', '$'], function(Backbone, _, $) {
	
	var AppState = Backbone.Model.extend({
		defaults: {
			currentState: null
		}
		
	});

	return new AppState();
}

);
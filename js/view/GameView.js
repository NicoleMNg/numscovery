/**
 * Game
 * Author: Vy & Nikki
 */

define(['backbone', 'underscore', '$', 'text!templates/game.html', 'model/AppState', 'model/Game', 'view/BaseView', 'view/easel/Setup', 'flipclock'],
	function(Backbone, _, $, template, AppState, Game, BaseView, EaselSetup, flipclock) {
	
	GameView = BaseView.extend({
		template:_.template(template),

		self: null,
		s: null,
		canvas: null,
		stage: null,
		mouseTarget: null,	// the display object currently under the mouse, or being dragged
		dragStarted: null,	// indicates whether we are currently in a drag operation
		offset: null,
		update: null,
		lives: null,
		target: null,
		text: null,
		range: null,
		clock: null,
		time: null,
		currentTime: null,

		initialize: function(options) {
			_.bindAll(this, 'initVars', 'render', 'initCanvas', 'drawNumbers');
			this.initVars(options || {});
			this.model = Game;
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
			var self = this;
			this.lives = this.model.get('lives');
			this.target = this.model.get('target');
			this.time = AppState.get('gameTimer');
			this.$el.html(this.template(this.model.attributes));
			this.$el.find('#livesValue').text(this.lives);
			this.$el.find('#gameTarget').text(this.target);
			this.initCanvas();

			this.clock = $('#timer').FlipClock(this.time, {
				countdown: true,
				clockFace: 'MinuteCounter'
			});

			this.$el.find('.close-modal').on("click", function(event) {
				$('.reveal-modal').foundation('reveal', 'close');
			});
		},

		initCanvas: function() {
			// create stage and point it to the canvas:
			var $el = this.$el;
			canvas = $el.find("#testCanvas")[0];

			//check to see if we are running in a browser with touch support
			stage = new createjs.Stage(canvas);

			// enable touch interactions if supported on the current device:
			createjs.Touch.enable(stage);

			// enabled mouse over / out events
			stage.enableMouseOver(10);
			stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

			this.drawNumbers();
		},

		stop: function() {
			createjs.Ticker.removeEventListener("tick", this.tick);
		},

		drawNumbers: function() {
			var container = new createjs.Container();
			var self = this;
			update = true;
			stage.addChild(container);
			this.range = AppState.get('numberRange');

			// create and populate the screen with random numbers:
			for(var i = 1; i <= this.range; i++){
				if (i === 9 || i === 99) {
					this.text = new createjs.Text(i, "bold 50px Arial", "rgba(235,234,81,.7)");
				} else {
					this.text = new createjs.Text(i, "bold 50px Arial", "rgba(80,80,80,.5)");
				}
				//this.text = new createjs.Text(x, "bold 50px Arial", "rgba(80,80,80,.5)");
				var hitArea = new createjs.Shape();
				hitArea.graphics.beginFill("#000000").drawRect(0, 0, 50, 50);
				this.text.hitArea = hitArea;
				container.addChild(this.text);
				this.text.x = canvas.width * Math.random()|0;
				this.text.y = canvas.height * Math.random()|0;
				this.text.rotation = 360 * Math.random()|0;
				this.text.scaleX = this.text.scaleY = this.text.scale = Math.random()*0.7+0.4;
				s = this.text.scale;
				this.text.name = "bmp_"+i;
				this.text.cursor = "pointer";
				
				// using "on" binds the listener to the scope of the currentTarget by default
				// in this case that means it executes in the scope of the button.
				this.text.on("mousedown", function(evt) {
					this.parent.addChild(this);
					this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
				});
				
				// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
				this.text.on("pressmove", function(evt) {
					this.x = evt.stageX+ this.offset.x;
					this.y = evt.stageY+ this.offset.y;
					// indicate that the stage should be updated on the next tick:
					update = true;
				});
				
				this.text.on("dblclick", function(event) {
					//if (self.target <= self.range) {
						if (this.text == self.target) {
							this.color = "rgba(49,183,222,.7)";
							update = true;
							self.targetRender();
						} else {
							self.livesRender();
						}
					//}
				});
				
			}

			createjs.Ticker.addEventListener("tick", this.tick);
			

		},

		targetRender: function() {
			var self = this;
			if (self.target < self.range) {
				self.target = self.target + 1;
				self.$el.find('#gameTarget').text(self.target);
			} else if ( self.target == self.range ) {
				self.gameWin();
			}
		},

		livesRender: function() {
			var self = this;
			if (self.lives > 0) {
				self.lives = self.lives - 1;
				self.$el.find('#livesValue').text(self.lives);
			} else {
				self.gameOver();
			}
		},
		
		gameOver: function() {
			var self = this;
			self.clock.stop();
			$('#loseBox').foundation('reveal', 'open');
			self.lives = 3;
		},

		gameWin: function() {
			var self = this;
			self.clock.stop(function() {
				var timeLeft  = self.clock.getTime();
				self.currentTime = self.time - timeLeft;
				return self.currentTime;
			});
			if (self.lives > 1) {
				self.$el.find('#livesLeft').text(self.lives + ' lives');
			} else {
				self.$el.find('#livesLeft').text(self.lives + ' life');
			}
			self.$el.find('#winTime').text(self.currentTime);
			$('#winBox').foundation('reveal', 'open');
		},

		tick: function(event) {
			// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
			if (update) {
				update = false; // only update once
				stage.update(event);
			}	
		}

	});

	return GameView;
}

);
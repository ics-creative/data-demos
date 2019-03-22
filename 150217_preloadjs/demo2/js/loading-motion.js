var demo;

(function(demo) {
	demo.Loading = (function() {

		// canvas
		var canvas;

		 // createjs stage
		var stage;

		// 演出完了時に実行する関数
		var completeFunc;

		// %
		var per;

		// 前の%
		var beforePer;

		// 桁
		var dotNumberArr;

		// 桁 container
		var dotNumberContainer;

		var isShow = false;

		var isHide = false;

		/**
		 * Constructor
		 */
		var Loading = function (func) {
			completeFunc = func;
			canvas = document.getElementById("canvas");
			stage = new createjs.Stage("canvas");
			beforePer = 0;
		};

		Loading.prototype = {
			start: start,
			progress: progress,
			update: update
		};

		// //////////////////////////////
		// public
		// //////////////////////////////

		function start() {

			dotNumberContainer = new createjs.Container();
			stage.addChild(dotNumberContainer);

			dotNumberArr = [];
			// 桁の用意
			for(var i = 0; i < 3; i++) {
				var shape = new createjs.Shape();
				dotNumberContainer.addChild(shape);
				shape.x = 150 * i;

				var dotNumber = new demo.DotNumber();
				dotNumber.init(shape);
				dotNumberArr.push(dotNumber);

				dotNumber.setNumber(0);
			}

			// wait 2sec
			setTimeout(function() {isShow = true}, 2000);

			dotNumberContainer.setBounds(0, 0, 150 * (3 - 1) + dotNumber.L, dotNumber.L * 2);

			// resize
			window.onresize = resizeHandler;
			resizeHandler();

			// FPS60
			createjs.Ticker.setFPS(60);

			// loop
			createjs.Ticker.addEventListener("tick", update);
		}

		/**
		 *
		 * @param per	進捗(0~1)
		 */
		function progress(_per) {
			per = Math.floor(_per * 100);
			console.log("progress : " + per + "%");

		}

		// //////////////////////////////
		// private
		// //////////////////////////////
		/**
		 * 演出完了
		 */
		function complete() {
			createjs.Ticker.removeEventListener("tick", update);

			completeFunc();
		}


		/**
		 * 演出更新
		 */
		function update() {

			if(isShow) {
				if(beforePer != per && !dotNumberArr[ 0 ].isTween && !dotNumberArr[ 1 ].isTween && !dotNumberArr[ 2 ].isTween) { // %が変化していたら

					// 100の位
					var n100 = Math.floor(per / 100);
					// 10の位
					var n10 = Math.floor(per % 100 / 10);
					// 1の位
					var n1 = per % 10;

					var beforeN100 = Math.floor(beforePer / 100);
					var beforeN10 = Math.floor(beforePer % 100 / 10);
					var beforeN1 = beforePer % 10;

					// 変化した位以下を変更
					if(beforeN100 != n100) {
						beforeN100 = n100;
						// 100の位以下変更
						dotNumberArr[ 0 ].setNumber(n100);
						dotNumberArr[ 1 ].setNumber(n10);
						dotNumberArr[ 2 ].setNumber(n1);
					}
					else if(beforeN10 != n10) {
						beforeN10 = n10;
						// 10の位以下変更
						dotNumberArr[ 1 ].setNumber(n10);
						dotNumberArr[ 2 ].setNumber(n1);
					}
					else if(beforeN1 != n1) {
						beforeN10 = n10;
						// 1の位のみ変更
						dotNumberArr[ 2 ].setNumber(n1);
					}

					beforePer = per;
				}

				if(per == 100) hide();
			}

			var len = dotNumberArr.length;
			for(var i = 0; i < len; i++) {
				dotNumberArr[ i ].update();
			}

			stage.update();
		}

		/*
		* 非表示
		* */
		function hide() {
			if(isHide) return;
			isHide = true;

			setTimeout(function() {
				var len = dotNumberArr.length;
				for(var i = 0; i < len; i++) {
					dotNumberArr[ i ].remove();
				}

				setTimeout(complete, 1000);
			}, 2000);

		}

		/**
		 * resize
		 */
		function resizeHandler() {
			var windowW = window.innerWidth;
			var windowH = window.innerHeight;
			canvas.width = windowW;
			canvas.height = windowH;

			var bounds = dotNumberContainer.getBounds();

			dotNumberContainer.x = (windowW - bounds.width) / 2;
			dotNumberContainer.y = (windowH - bounds.height) / 2;

			stage.update();
		}

		return Loading;
	})();





	/*
	*
	* DotNumber
	*
	* */
	demo.DotNumber = function() {};
	demo.DotNumber.prototype = {
		// //////////////////////////////
		// property
		// //////////////////////////////

		// public
		// 1辺の長さ
		L: 100,

		isTween: false,

		// private
		// Dotの半径
		_R: 5,
		// 千の太さ
		_W: 5,
		_dotTmpArr: [
			[ [ 0, 1, 3, 5, 4, 2, 0 ] ],			// 0
			[ [ 1, 3, 5 ] ],						// 1
			[ [ 0, 1, 3, 2, 4, 5 ] ],				// 2
			[ [ 0, 1, 3, 5, 4 ], [ 2, 3 ] ],			// 3
			[ [ 0, 2, 3, 5 ], [ 1, 3 ] ],				// 4
			[ [ 1, 0, 2, 3, 5, 4 ] ],				// 5
			[ [ 2, 3, 5, 4, 2, 0, 1 ] ],			// 6
			[ [ 0, 1, 3, 5 ] ],					// 7
			[ [ 0, 1, 3, 2, 4, 5, 3, 2, 0 ] ],	// 8
			[ [ 3, 2, 0, 1, 3, 5, 4 ] ]			// 9
		],
		_firstDots: null,
		_shape: null,
		_tween: null,
		// 初期描画かどうか
		_isFirst: true,

		_isRemoveTween: false,

		// 描画する数字
		_num: null,
		_tweenObj: {},

		_centerX: 0,
		_centerY: 0,

		// //////////////////////////////
		// method
		// //////////////////////////////

		// public

		/**
		 * 初期化
		 * @param shape	描画するShape
		 */
		init: function(shape) {
			shape.setBounds(0, 0, this.L, this.L * 2);

			this._shape = shape;
			this._isFirst = true;

			this._centerX = this.L / 2;
			this._centerY = this.L;
		},

		/**
		 * 数字を設定
		 * @param num	0~9
		 */
		setNumber: function(num) {
			// 変化なしならスキップ
			//if(this._num == num) return;

			this._num = num;

			if(this._isFirst) { // 初期描画
				this._isFirst = false;

				// 描画する数字の設定
				this._changeNumber();
				this._showTween();
			}
			else { // 2回目以降の描画
				this._hideTween();
			}
		},

		/**
		 * 描画を更新
		 */
		update: function() {

			//if(!this.isTween) { // tween中でないなら
				// ランダムに揺らす
				var firstDots = this._firstDots;
				if(firstDots) {
					var len = firstDots.length;

					for(var i = 0; i < len; i++) {
						var dot = firstDots[ i ];

						do {
							if(Math.floor(Math.random()) * 100 == 0) {
								dot.x += (Math.random() * 2 - 1);
								dot.y += (Math.random() * 2 - 1);
							}

							dot.x += (dot.targetX - dot.x) * 0.02;
							dot.y += (dot.targetY - dot.y) * 0.02;

							dot = dot.next;
						} while(dot); // 次のDotが存在するなら
					}
				}
			//}

			this._draw();
		},

		/*
		* 削除モーション
		* */
		remove: function() {
			//return;

			this._isRemoveTween = true;

			var firstDots = this._firstDots;
			if(firstDots) {
				var len = firstDots.length;

				for(var i = 0; i < len; i++) {
					var dot = firstDots[ i ];

					do {

						if(dot.targetX < this._centerX) { // 中央より左なら
							dot.targetX -= (this.L * 1);
						}
						else if(dot.targetX > this._centerX) { // 中央より右なら
							dot.targetX += (this.L * 1);
						}

						if(dot.targetY < this._centerY) {// 中央より上なら
							dot.targetY -= (this.L * 1);
						}
						else if(dot.targetY > this._centerY) { // 中央より下なら
							dot.targetY += (this.L * 1);
						}

						dot = dot.next;
					} while(dot); // 次のDotが存在するなら
				}

				var _this = this;


				if(this._tween) {
					this._tween.removeEventListener("change", function() { _this._tweenChange() });

					createjs.Tween.removeTweens(this._tweenObj);

					this._tween = null;
				}

				this._tweenObj = { per: 0 };

				this._tween = createjs.Tween
					.get(this._tweenObj, { override: true });

				this._tween
					.addEventListener("change", function() { _this._removeTweenChange() });

				this._tween
					.to({ per: 1 }, 300, createjs.Ease.expoIn)
					.wait(500)
					//.call(_this._showTweenComplete, [], this)

				createjs.Tween.get(this._shape).to({ alpha: 0 }, 150);
			}
		},

		/*
		 * removeTween更新
		 * */
		_removeTweenChange: function() {
			var per = this._tweenObj.per;

			var firstDots = this._firstDots;
			if(firstDots) {
				var len = firstDots.length;

				for(var i = 0; i < len; i++) {
					var dot = firstDots[ i ];

					do {
						dot.x = dot.x + (dot.targetX - dot.x) * per;
						dot.y = dot.y + (dot.targetY - dot.y) * per;

						dot = dot.next;
					} while(dot); // 次のDotが存在するなら
				}
			}
		},

		// private

		/*
		* 数字を切り替え
		* */
		_changeNumber: function() {
			// Dotの座標情報を取得
			var dotTmp = this._dotTmpArr[ this._num ];

			this._firstDots = [];

			// Dotの生成
			var len = dotTmp.length;
			for(var i = 0; i < len; i++) {
				var dotObj;
				var beforeDotObj = null;
				var len2 = dotTmp[ i ].length;
				// Dot番号
				var dotNum;
				for(var j = 0; j < len2; j++) {
					dotNum = dotTmp[ i ][ j ];
					dotObj = {
						// 現在の座標
						x: this._centerX,
						y: this._centerY,
						// 目的座標
						targetX: dotNum % 2 * this.L,
						targetY: Math.floor(dotNum / 2) * this.L
					};

					// 最初のDotなら
					if(!beforeDotObj) this._firstDots.push(dotObj);
					// 2個目以降なら前のDotに自分を保持
					else beforeDotObj.next = dotObj;

					beforeDotObj = dotObj;
				}
			}
		},

		/*
		* 表示Tween
		* */
		_showTween: function() {
			var _this = this;
			this.isTween = true;

			if(this._tween) {
				this._tween.removeEventListener("change", function() { _this._tweenChange() });

				createjs.Tween.removeTweens(this._tweenObj);

				this._tween = null;
			}

			this._tweenObj = { per: 0 };

			this._tween = createjs.Tween
				.get(this._tweenObj, { override: true });

			this._tween
				.addEventListener("change", function() { _this._tweenChange() });

			this._tween
				.to({ per: 1 }, 200, createjs.Ease.easeInBack)
				.wait(500)
				.call(_this._showTweenComplete, [], this)
		},

		/*
		* 表示Tween終了
		* */
		_showTweenComplete: function() {
			//console.log("===================");
			//console.log("Show Tween Complete");
			//console.log("===================");
			this.isTween = false;
		},

		/*
		* 非表示Tween
		* */
		_hideTween: function() {
			var _this = this;
			this.isTween = true;

			if(this._tween) {
				this._tween.removeEventListener("change", function() { _this._tweenChange() });

				createjs.Tween.removeTweens(this._tweenObj);

				this._tween = null;
			}
			var firstDots = this._firstDots;
			if(firstDots) {
				var len = firstDots.length;

				for(var i = 0; i < len; i++) {
					var dot = firstDots[ i ];

					do {
						dot.targetX = this._centerX;
						dot.targetY = this._centerY;

						dot = dot.next;
					} while(dot); // 次のDotが存在するなら
				}
			}
			this._tweenObj = { per: 1 };

			this._tween = createjs.Tween
				.get(this._tweenObj, { override: true });

			this._tween
				.addEventListener("change", function() { _this._tweenChange() });

			this._tween
				.to({ per: 0 }, 200, createjs.Ease.cubicOut)
				.call(_this._hideTweenComplete, [], this);
		},

		/*
		* 非表示Tween終了
		* */
		_hideTweenComplete: function() {
			//console.log("===================");
			//console.log("Hide Tween Complete");
			//console.log("===================");

			// 描画する数字の設定
			this._changeNumber();
			this._showTween();
		},

		/*
		 * Tween更新
		 * */
		_tweenChange: function() {
			var per = this._tweenObj.per;

			var firstDots = this._firstDots;
			if(firstDots) {
				var len = firstDots.length;

				for(var i = 0; i < len; i++) {
					var dot = firstDots[ i ];

					do {
						dot.x = dot.x + (dot.targetX - dot.x) * per;
						dot.y = dot.y + (dot.targetY - dot.y) * per;

						dot = dot.next;
					} while(dot); // 次のDotが存在するなら
				}
			}
		},

		/**
		 * 描画
		 */
		_draw: function() {
			var shape = this._shape;

			// 描画リセット
			shape.graphics.clear();

			var firstDots = this._firstDots;

			if(firstDots) {
				var len = firstDots.length;

				for(var i = 0; i < len; i++) {
					if(!this._isRemoveTween) {
						shape.graphics.setStrokeStyle(this._W).beginStroke("#666666");

						var dot = firstDots[ i ];
						var isFirst = true;
						do {
							if(isFirst) {
								shape.graphics.moveTo(dot.x, dot.y);
							}
							else {
								shape.graphics.lineTo(dot.x, dot.y);
							}

							dot = dot.next;

							isFirst = false;
						} while(dot); // 次のDotが存在するなら

						shape.graphics.endStroke();
					}

					dot = firstDots[ i ];
					do {
						shape.graphics.beginFill("#eeeeee");
						shape.graphics.drawCircle(dot.x, dot.y, this._R);
						shape.graphics.endFill();

						dot = dot.next;
					} while(dot); // 次のDotが存在するなら
				}

			}
		}
	};
})(demo || (demo = {}));
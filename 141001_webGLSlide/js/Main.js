var utils;
(function (utils) {
    /**
    * 画像からピクセルカラー値を取得するユーティリティクラスです。
    * @auther Kentaro Kawakatsu
    */
    var ImageColorPicker = (function () {
        function ImageColorPicker() {
        }
        ImageColorPicker.init = function ($canvas) {
            ImageColorPicker.canvas2d = $canvas;
            ImageColorPicker.context2d = ImageColorPicker.canvas2d.getContext('2d');
        };

        ImageColorPicker.getImageDataArray = function (image) {
            ImageColorPicker.canvas2d.width = image.width;
            ImageColorPicker.canvas2d.height = image.height;
            ImageColorPicker.context2d.drawImage(image, 0, 0);
            return ImageColorPicker.context2d.getImageData(0, 0, image.width, image.height).data;
        };
        return ImageColorPicker;
    })();
    utils.ImageColorPicker = ImageColorPicker;
})(utils || (utils = {}));
var nineball;
(function (nineball) {
    (function (webgl) {
        /// <reference path="../libs/glMatrix.d.ts" />
        (function (engine) {
            /**
            * プロジェクション変換行列を取得するための簡易カメラクラスです。
            * @auther Kentaro Kawakatsu
            */
            var Camera = (function () {
                function Camera(fov, aspect, zNear, zFar) {
                    //
                    this._cameraUP = new Float32Array([0, 1, 0]);
                    //
                    this._projectionMtx = mat4.identity(mat4.create(null));
                    this._cameraMtx = mat4.identity(mat4.create(null));
                    this._lookMtx = mat4.identity(mat4.create(null));
                    //
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    mat4.perspective(this._projectionMtx, fov, aspect, zNear, zFar);
                }
                Camera.prototype.getCameraMtx = function () {
                    return this._cameraMtx;
                };

                Camera.prototype.lookAt = function (point) {
                    mat4.identity(this._lookMtx);
                    mat4.lookAt(this._lookMtx, new Float32Array([this.x, this.y, this.z]), point, this._cameraUP);
                    mat4.multiply(this._cameraMtx, this._projectionMtx, this._lookMtx);
                };
                Camera.DIRECTION = new Float32Array([0, 0, 1]);
                return Camera;
            })();
            engine.Camera = Camera;
        })(webgl.engine || (webgl.engine = {}));
        var engine = webgl.engine;
    })(nineball.webgl || (nineball.webgl = {}));
    var webgl = nineball.webgl;
})(nineball || (nineball = {}));
var nineball;
(function (nineball) {
    (function (webgl) {
        /// <reference path="Camera.ts" />
        (function (controller) {
            /**
            * Cameraクラスインスタンスをマウス、タッチ入力で制御するクラスです。
            * @auther Kentaro Kawakatsu
            */
            var RoundCameraController = (function () {
                function RoundCameraController(camera, stage) {
                    //parameter
                    this.radiusMin = 1.0;
                    this.radiusOffset = 0.1;
                    this.gestureRadiusFactor = 20;
                    //camera
                    this.radius = 2;
                    this._theta = 0;
                    this._oldX = 0;
                    this._phi = 90;
                    this._oldY = 0;
                    this.targetTheta = 0;
                    this.targetPhi = 90;
                    this._camera = camera;
                    this._stage = stage;
                    this._target = new Float32Array([0, 0, 0]);
                    this.enable();
                    this._upDateCamera();
                }
                RoundCameraController.prototype.enable = function () {
                    var _this = this;
                    document.addEventListener("keydown", function (event) {
                        _this._keyHandler(event);
                    });
                    document.addEventListener("mouseup", function (event) {
                        _this._upHandler(event);
                    });
                    this._stage.addEventListener("mousedown", function (event) {
                        _this._downHandler(event);
                    });
                    this._stage.addEventListener("mousemove", function (event) {
                        _this._moveHandler(event);
                    });
                    this._stage.addEventListener("mousewheel", function (event) {
                        _this._wheelHandler(event);
                    });

                    //touch
                    if ("ontouchstart" in window) {
                        this._stage.addEventListener("touchstart", function (event) {
                            _this._touchStartHandler(event);
                        });
                        this._stage.addEventListener("touchmove", function (event) {
                            _this._touchMoveHandler(event);
                        });
                        document.addEventListener("touchend", function (event) {
                            _this._touchEndHandler(event);
                        });
                    }
                    if ("ongesturestart" in window) {
                        this._stage.addEventListener("gesturestart", function (event) {
                            _this._gestureStartHandler(event);
                        });
                        this._stage.addEventListener("gesturechange", function (event) {
                            _this._gestureChangeHandler(event);
                        });
                        document.addEventListener("gestureend", function (event) {
                            _this._gestureEndHandler(event);
                        });
                    }
                };

                //
                RoundCameraController.prototype._keyHandler = function (e) {
                    switch (e.keyCode) {
                        case 38:
                            this.radius -= this.radiusOffset;
                            if (this.radius < this.radiusMin) {
                                this.radius = this.radiusMin;
                            }
                            this._upDateCamera();
                            break;
                        case 40:
                            this.radius += this.radiusOffset;
                            this._upDateCamera();
                            break;
                        default:
                            break;
                    }
                };

                RoundCameraController.prototype._upHandler = function (e) {
                    this.isMouseDown = false;
                };

                RoundCameraController.prototype._downHandler = function (e) {
                    this.isMouseDown = true;
                    var rect = e.target.getBoundingClientRect();
                    this._oldX = e.clientX - rect.left;
                    this._oldY = e.clientY - rect.top;
                };

                RoundCameraController.prototype._wheelHandler = function (e) {
                    if (e.wheelDelta > 0) {
                        this.radius -= this.radiusOffset;
                        if (this.radius < this.radiusMin) {
                            this.radius = this.radiusMin;
                        }
                    } else {
                        this.radius += this.radiusOffset;
                    }
                    this._upDateCamera();
                };

                RoundCameraController.prototype._moveHandler = function (e) {
                    if (this.isMouseDown) {
                        var rect = e.target.getBoundingClientRect();
                        var stageX = e.clientX - rect.left;
                        var stageY = e.clientY - rect.top;

                        this.inputXY(stageX, stageY);
                    }
                };

                RoundCameraController.prototype._touchStartHandler = function (e) {
                    e.preventDefault();
                    if (!this.isMouseDown) {
                        var touches = e.changedTouches;
                        var touch = touches[0];
                        this.isMouseDown = true;
                        this._identifier = touch.identifier;
                        var target = touch.target;
                        this._oldX = touch.pageX - target.offsetLeft;
                        this._oldY = touch.pageY - target.offsetTop;
                    }
                };

                RoundCameraController.prototype._touchMoveHandler = function (e) {
                    e.preventDefault();
                    if (this._isGestureChange) {
                        return;
                    }
                    var touches = e.changedTouches;
                    var touchLength = touches.length;
                    for (var i = 0; i < touchLength; i++) {
                        var touch = touches[i];
                        if (touch.identifier == this._identifier) {
                            var target = touch.target;
                            var stageX = touch.pageX - target.offsetLeft;
                            var stageY = touch.pageY - target.offsetTop;
                            this.inputXY(stageX, stageY);
                            break;
                        }
                    }
                };

                RoundCameraController.prototype._touchEndHandler = function (e) {
                    e.preventDefault();
                    this.isMouseDown = false;
                };

                RoundCameraController.prototype._gestureStartHandler = function (e) {
                    this._isGestureChange = true;
                    this.isMouseDown = true;
                    this._oldRadius = this.radius;
                };

                RoundCameraController.prototype._gestureChangeHandler = function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    this.radius = this._oldRadius + this.gestureRadiusFactor * this.radiusOffset * (1 - e.scale);
                    if (this.radius < this.radiusMin) {
                        this.radius = this.radiusMin;
                    }
                    this._upDateCamera();
                };

                RoundCameraController.prototype._gestureEndHandler = function (e) {
                    this._isGestureChange = false;
                    this.isMouseDown = false;
                    this._identifier = -1;
                };

                RoundCameraController.prototype.inputXY = function (newX, newY) {
                    this._theta -= (newX - this._oldX) * 0.3;
                    this._oldX = newX;
                    this._phi -= (newY - this._oldY) * 0.3;
                    this._oldY = newY;

                    //
                    if (this._phi < 20) {
                        this._phi = 20;
                    } else if (this._phi > 160) {
                        this._phi = 160;
                    }
                    this._upDateCamera();
                };

                RoundCameraController.prototype._upDateCamera = function () {
                    //			var t:number = this._theta * RoundCameraController.RAD;
                    //			var p:number = this._phi * RoundCameraController.RAD;
                    //			var rsin:number = this.radius * Math.sin(p);
                    //			this._camera.x = rsin * Math.sin(t) + this._target[0];
                    //			this._camera.z = rsin * Math.cos(t) + this._target[2];
                    //			this._camera.y = this.radius * Math.cos(p) + this._target[1];
                    //
                    //			this._camera.lookAt(this._target);
                };

                RoundCameraController.prototype.upDate = function () {
                    this.targetTheta += (this._theta - this.targetTheta) * 0.1;
                    this.targetPhi += (this._phi - this.targetPhi) * 0.1;
                    var t = this.targetTheta * RoundCameraController.RAD;
                    var p = this.targetPhi * RoundCameraController.RAD;

                    var rsin = this.radius * Math.sin(p);
                    this._camera.x = rsin * Math.sin(t) + this._target[0];
                    this._camera.z = rsin * Math.cos(t) + this._target[2];
                    this._camera.y = this.radius * Math.cos(p) + this._target[1];

                    this._camera.lookAt(this._target);
                };

                RoundCameraController.prototype.rotate = function (dTheta, dPhi) {
                    this._theta += dTheta;
                    this._phi += dPhi;
                    this._upDateCamera();
                };
                RoundCameraController.RAD = Math.PI / 180;
                return RoundCameraController;
            })();
            controller.RoundCameraController = RoundCameraController;
        })(webgl.controller || (webgl.controller = {}));
        var controller = webgl.controller;
    })(nineball.webgl || (nineball.webgl = {}));
    var webgl = nineball.webgl;
})(nineball || (nineball = {}));
var nineball;
(function (nineball) {
    (function (webgl) {
        (function (engine) {
            /**
            * シェーダーに渡すattribute情報をまとめたオブジェクトクラスです。
            * @auther Kentaro Kawakatsu
            */
            var VertexAttributeObject = (function () {
                function VertexAttributeObject($name, $stride) {
                    this.name = $name;
                    this.stride = $stride;
                }
                return VertexAttributeObject;
            })();
            engine.VertexAttributeObject = VertexAttributeObject;
        })(webgl.engine || (webgl.engine = {}));
        var engine = webgl.engine;
    })(nineball.webgl || (nineball.webgl = {}));
    var webgl = nineball.webgl;
})(nineball || (nineball = {}));
var nineball;
(function (nineball) {
    (function (webgl) {
        (function (engine) {
            /**
            * シェーダーに渡すuniform情報をまとめたオブジェクトクラスです。
            * @auther Kentaro Kawakatsu
            */
            var UniformObject = (function () {
                function UniformObject($type, $name) {
                    this.name = $name;
                    this.type = $type;
                }
                UniformObject.TYPE_VALUE = 0;
                UniformObject.TYPE_MATRIX = 1;
                return UniformObject;
            })();
            engine.UniformObject = UniformObject;
        })(webgl.engine || (webgl.engine = {}));
        var engine = webgl.engine;
    })(nineball.webgl || (nineball.webgl = {}));
    var webgl = nineball.webgl;
})(nineball || (nineball = {}));
var nineball;
(function (nineball) {
    (function (webgl) {
        /// <reference path="../libs/glMatrix.d.ts" />
        /// <reference path="VertexAttributeObject.ts" />
        /// <reference path="UniformObject.ts" />
        (function (engine) {
            /**
            * レンダリングするシェーダーをまとめたオブジェクトクラスです。
            * @auther Kentaro Kawakatsu
            */
            var ShaderObject = (function () {
                function ShaderObject($context) {
                    this.context = $context;

                    this.uniformList = [];
                    this.attributeList = [];
                    this.init();
                }
                ShaderObject.prototype.init = function () {
                };

                ShaderObject.prototype.createProgram = function () {
                    var vShader = this.creatShader(this.vShaderSource, this.context.VERTEX_SHADER);
                    var fShader = this.creatShader(this.fShaderSource, this.context.FRAGMENT_SHADER);

                    this.program = this.context.createProgram();
                    this.context.attachShader(this.program, vShader);
                    this.context.attachShader(this.program, fShader);

                    this.context.linkProgram(this.program);

                    var i;
                    var length;

                    length = this.attributeList.length;
                    for (i = 0; i < length; i++) {
                        var attribute = this.attributeList[i];
                        attribute.location = this.context.getAttribLocation(this.program, attribute.name);
                    }

                    length = this.uniformList.length;
                    for (i = 0; i < length; i++) {
                        var uniform = this.uniformList[i];
                        uniform.location = this.context.getUniformLocation(this.program, uniform.name);
                    }
                };

                ShaderObject.prototype.bindShader = function () {
                    this.bindProgram();
                    this.bindUniform();
                };

                ShaderObject.prototype.bindProgram = function () {
                    if (this.context.getProgramParameter(this.program, this.context.LINK_STATUS)) {
                        this.context.useProgram(this.program);
                    } else {
                        console.log(this.context.getProgramInfoLog(this.program));
                    }
                };

                ShaderObject.prototype.bindUniform = function () {
                    var length = this.uniformList.length;
                    for (var i = 0; i < length; i++) {
                        var uniform = this.uniformList[i];
                        switch (uniform.type) {
                            case engine.UniformObject.TYPE_MATRIX:
                                this.context.uniformMatrix4fv(uniform.location, false, uniform.matrix);
                                break;
                            case engine.UniformObject.TYPE_VALUE:
                                this.context.uniform1f(uniform.location, uniform.value);
                                break;
                            default:
                                break;
                        }
                    }
                };

                //
                ShaderObject.prototype.creatShader = function (source, type) {
                    var shader = this.context.createShader(type);
                    this.context.shaderSource(shader, source);
                    this.context.compileShader(shader);

                    if (this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
                        return shader;
                    } else {
                        console.log(type == this.context.VERTEX_SHADER, this.context.getShaderInfoLog(shader));
                        return null;
                    }
                };
                return ShaderObject;
            })();
            engine.ShaderObject = ShaderObject;
        })(webgl.engine || (webgl.engine = {}));
        var engine = webgl.engine;
    })(nineball.webgl || (nineball.webgl = {}));
    var webgl = nineball.webgl;
})(nineball || (nineball = {}));
var nineball;
(function (nineball) {
    (function (webgl) {
        /// <reference path="../libs/glMatrix.d.ts" />
        /// <reference path="ShaderObject.ts" />
        /// <reference path="VertexAttributeObject.ts" />
        (function (engine) {
            /**
            * レンダリング対象の情報をオブジェクトにまとめたクラスです。
            * @auther Kentaro Kawakatsu
            */
            var RenderingObject = (function () {
                function RenderingObject($context) {
                    this.context = $context;

                    this.vboList = [];
                    this.vboDataList = [];

                    this.init();
                }
                RenderingObject.prototype.init = function () {
                };

                RenderingObject.prototype.attachShader = function ($shader) {
                    this.shader = $shader;
                };

                RenderingObject.prototype.bindVertexbuffer = function () {
                    var length = this.shader.attributeList.length;
                    for (var i = 0; i < length; i++) {
                        var attribute = this.shader.attributeList[i];
                        if (attribute.location >= 0) {
                            this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vboList[i]);
                            this.context.enableVertexAttribArray(attribute.location);
                            this.context.vertexAttribPointer(attribute.location, attribute.stride, this.context.FLOAT, false, 0, 0);
                        }
                    }
                };
                return RenderingObject;
            })();
            engine.RenderingObject = RenderingObject;
        })(webgl.engine || (webgl.engine = {}));
        var engine = webgl.engine;
    })(nineball.webgl || (nineball.webgl = {}));
    var webgl = nineball.webgl;
})(nineball || (nineball = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../libs/glMatrix.d.ts" />
/// <reference path="ImageColorPicker.ts" />
/// <reference path="RenderingObject.ts" />
var project;
(function (project) {
    /**
    * 描画するパーティクルクラスです。
    * @auther Kentaro Kawakatsu
    */
    var Particles = (function (_super) {
        __extends(Particles, _super);
        function Particles($context, $imageList) {
            this.imageList = $imageList;
            _super.call(this, $context);
        }
        Particles.prototype.init = function () {
            this.currentIndex = this.imageList.length * Math.random() >> 0;
            var image = this.imageList[this.currentIndex];

            //image
            var imageWidth = image.width;
            var imageHeight = image.height;
            var numPixels = imageWidth * imageHeight;
            var rate = Math.sqrt(numPixels / Particles.NUM_PARTICLES);
            var posScale = 60 * rate;

            var imageArr = utils.ImageColorPicker.getImageDataArray(image);

            var r;
            var g;
            var b;
            var x0;
            var y0;
            var z0;
            var x1;
            var y1;
            var z1;

            var vPosition0 = [];
            var vPosition1 = [];
            var vColor = [];
            this.iboData = [];
            for (var i = 0; i < Particles.NUM_PARTICLES; i++) {
                var p = i;

                //
                //color
                var cIndex = p * 3;
                var imageindexX = (rate * i % imageWidth) >> 0;
                var imageindexY = imageHeight - rate * (rate * i / imageWidth >> 0) >> 0;
                var pixIndex = (imageindexX + imageWidth * imageindexY) >> 0;

                r = imageArr[pixIndex * 4] / 255;
                g = imageArr[pixIndex * 4 + 1] / 255;
                b = imageArr[pixIndex * 4 + 2] / 255;

                vColor[cIndex] = r;
                vColor[cIndex + 1] = g;
                vColor[cIndex + 2] = b;

                //
                var pIndex = p * 3;

                //並べられた位置(状態0)
                x0 = (rate * i % imageWidth) - imageWidth / 2;
                y0 = rate * (rate * i / imageWidth >> 0) - imageHeight / 2;
                z0 = 0;
                x0 /= posScale;
                y0 /= posScale;
                vPosition0[pIndex] = x0;
                vPosition0[pIndex + 1] = y0;
                vPosition0[pIndex + 2] = z0;

                //ランダムな位置(状態1)
                x1 = (-0.5 + Math.random()) * Particles.RADIUS;
                ;
                y1 = (-0.5 + Math.random()) * Particles.RADIUS;
                ;
                z1 = (-0.5 + Math.random()) * Particles.RADIUS;
                ;
                vPosition1[pIndex] = x1;
                vPosition1[pIndex + 1] = y1;
                vPosition1[pIndex + 2] = z1;
            }

            var attribute;
            var vbo;

            vbo = this.context.createBuffer();
            this.context.bindBuffer(this.context.ARRAY_BUFFER, vbo);
            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vPosition0), this.context.STATIC_DRAW);
            this.vboDataList[0] = vPosition0;
            this.vboList[0] = vbo;

            vbo = this.context.createBuffer();
            this.context.bindBuffer(this.context.ARRAY_BUFFER, vbo);
            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vPosition1), this.context.STATIC_DRAW);
            this.vboDataList[1] = vPosition1;
            this.vboList[1] = vbo;

            vbo = this.context.createBuffer();
            this.context.bindBuffer(this.context.ARRAY_BUFFER, vbo);
            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vColor), this.context.DYNAMIC_DRAW);
            this.vboDataList[2] = vColor;
            this.vboList[2] = vbo;
        };

        Particles.prototype.reset = function () {
            this.currentIndex += 1;
            this.currentIndex %= this.imageList.length;

            var vColor = this.vboDataList[2];

            var r;
            var g;
            var b;

            var image = this.imageList[this.currentIndex];
            var imageWidth = image.width;
            var imageHeight = image.height;
            var numPixels = imageWidth * imageHeight;
            var rate = Math.sqrt(numPixels / Particles.NUM_PARTICLES);
            var posScale = 60 * rate;
            var imageArr = utils.ImageColorPicker.getImageDataArray(image);
            for (var i = 0; i < Particles.NUM_PARTICLES; i++) {
                var p = i;

                //
                //color
                var cIndex = p * 3;
                vColor[cIndex] = 1;
                vColor[cIndex + 1] = 1;
                vColor[cIndex + 2] = 1;

                var imageindexX = (rate * i % imageWidth) >> 0;
                var imageindexY = imageHeight - rate * (rate * i / imageWidth >> 0) >> 0;
                var pixIndex = (imageindexX + imageWidth * imageindexY) >> 0;

                r = imageArr[pixIndex * 4] / 255;
                g = imageArr[pixIndex * 4 + 1] / 255;
                b = imageArr[pixIndex * 4 + 2] / 255;

                vColor[cIndex] = r;
                vColor[cIndex + 1] = g;
                vColor[cIndex + 2] = b;
            }
            var vbo = this.vboList[2];
            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vColor), this.context.DYNAMIC_DRAW);
        };
        Particles.RADIUS = 10;
        Particles.NUM_PARTICLES = 65535;
        return Particles;
    })(nineball.webgl.engine.RenderingObject);
    project.Particles = Particles;
})(project || (project = {}));
/// <reference path="ShaderObject.ts" />
/// <reference path="VertexAttributeObject.ts" />
/// <reference path="UniformObject.ts" />
var project;
(function (project) {
    /**
    * 描画するパーティクルのシェーダークラスです。
    * @auther Kentaro Kawakatsu
    */
    var ParticleShader = (function (_super) {
        __extends(ParticleShader, _super);
        function ParticleShader() {
            _super.apply(this, arguments);
        }
        ParticleShader.prototype.init = function () {
            this.vShaderSource = "attribute vec3 position0;" + "attribute vec3 position1;" + "attribute vec3 color;" + "varying vec4 vColor;" + "uniform mat4 mvpMatrix;" + "uniform float pointSize;" + "uniform float timeScale;" + "uniform float colorScale;" + "void main(void){" + "	vec3 diff=(vec3(1,1,1)-color)*colorScale;" + "	vColor=vec4(color+diff,1);" + "	vec3 position=position0+(position1-position0)*timeScale;" + "	gl_Position=mvpMatrix*vec4(position,1.0);" + "	gl_PointSize=pointSize;" + "}";

            this.fShaderSource = "precision mediump float;" + "varying vec4 vColor;" + "void main(void){" + "	gl_FragColor=vColor;" + "}";

            var uniform;
            uniform = new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_MATRIX, "mvpMatrix");
            this.uniformList[0] = uniform;

            uniform = new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_VALUE, "pointSize");
            this.uniformList[1] = uniform;

            uniform = new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_VALUE, "timeScale");
            this.uniformList[2] = uniform;

            uniform = new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_VALUE, "colorScale");
            this.uniformList[3] = uniform;

            var attribute;
            attribute = new nineball.webgl.engine.VertexAttributeObject("position0", 3);
            this.attributeList[0] = attribute;

            attribute = new nineball.webgl.engine.VertexAttributeObject("position1", 3);
            this.attributeList[1] = attribute;

            attribute = new nineball.webgl.engine.VertexAttributeObject("color", 3);
            this.attributeList[2] = attribute;

            this.createProgram();
        };
        return ParticleShader;
    })(nineball.webgl.engine.ShaderObject);
    project.ParticleShader = ParticleShader;
})(project || (project = {}));
/// <reference path="../libs/glMatrix.d.ts" />
/// <reference path="../libs/jquery.d.ts" />
/// <reference path="ImageColorPicker.ts" />
/// <reference path="Camera.ts" />
/// <reference path="RoundCameraController.ts" />
/// <reference path="Particles.ts" />
/// <reference path="ParticleShader.ts" />
var project;
(function (project) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.fpsCount = 0;
            this.max = 30;
            this.imageList = [];
            var length = 20;
            var loadCount = 0;
            for (var i = 0; i < length; i++) {
                this.imageList[i] = new Image();
                this.imageList[i].onload = function () {
                    loadCount += 1;
                    if (loadCount == length) {
                        _this.init();
                    }
                };
                this.imageList[i].src = "assets/" + i + ".jpg";
            }
        }
        Main.initialize = function () {
            var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
            var hoverFlag = false;
            parent.$("#test").hover(function () {
                hoverFlag = true;
            }, function () {
                hoverFlag = false;
            });

            parent.$('body,html').on(mousewheelevent, function (e) {
                if (hoverFlag)
                    e.preventDefault();
            });
            $(window).on('keydown', function (e) {
                if (hoverFlag)
                    e.preventDefault();
            }); //
            if (Main.canWebGL()) {
                new Main();
            } else {
                alert("WebGLが動作する環境で閲覧下さい");
            }
        };

        Main.canWebGL = function () {
            try  {
                return !!WebGLRenderingContext && (!!document.createElement("canvas").getContext("webgl") || !!document.createElement("canvas").getContext("experimental-webgl"));
            } catch (e) {
                return false;
            }
        };

        Main.prototype.init = function () {
            utils.ImageColorPicker.init(document.createElement("canvas"));

            this.initContext();
            this.initObjects();
            this.render();
        };

        Main.prototype.initContext = function () {
            Main.CANVAS_WIDTH = window.innerWidth;
            Main.CANVAS_HEIGHT = window.innerHeight;

            this.canvas = document.getElementById(("myCanvas"));
            this.canvas.width = Main.CANVAS_WIDTH;
            this.canvas.height = Main.CANVAS_HEIGHT;
            this.context = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");

            this.context.clearColor(0, 0, 0, 1);
            this.context.clearDepth(1.0);
            this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);

            this.context.enable(this.context.BLEND);
            this.context.blendFunc(this.context.ONE, this.context.ONE);
        };

        Main.prototype.initObjects = function () {
            this.camera = new nineball.webgl.engine.Camera(45, Main.CANVAS_WIDTH / Main.CANVAS_HEIGHT, 0.1, 100);
            this.particles = new project.Particles(this.context, this.imageList);
            this.particleShader = new project.ParticleShader(this.context);
            this.particles.attachShader(this.particleShader);

            this.controller = new nineball.webgl.controller.RoundCameraController(this.camera, this.canvas);
            this.controller.radius = 4;
            this.controller.rotate(0, 0);

            this.theta = 0;
            this.timeCount = 0;
            this.timePhase = 0;
        };

        Main.prototype.render = function () {
            var _this = this;
            if (!this.controller.isMouseDown) {
                //this.controller.rotate(0.5, 0);
            }
            if (this.timePhase == 0 || this.timePhase == 2) {
                this.theta += 0.02;
                if (this.timePhase == 0 && this.theta >= Math.PI / 2) {
                    this.theta = Math.PI / 2;
                    this.timeCount = 0;
                    this.timePhase = 1;
                    this.context.blendFunc(this.context.ONE, this.context.ZERO);
                }
                if (this.timePhase == 2 && this.theta >= 0) {
                    this.timeCount = 0;
                    this.timePhase = 0;
                    this.particles.reset();
                }
            } else {
                this.timeCount += 1;
                if (this.timeCount > 60) {
                    if (this.timePhase == 1) {
                        this.theta = -Math.PI / 2;
                        this.timePhase = 2;
                        this.context.blendFunc(this.context.ONE, this.context.ONE);
                    } else {
                        this.timePhase = 0;
                    }
                }
            }

            var mMatrix = mat4.identity(mat4.create(null));
            var mvpMatrix = mat4.identity(mat4.create(null));

            mat4.multiply(mvpMatrix, this.camera.getCameraMtx(), mMatrix);

            this.particleShader.uniformList[0].matrix = mvpMatrix;
            this.particleShader.uniformList[1].value = 10 / this.controller.radius;
            var timeScale = Math.cos(this.theta);
            this.particleShader.uniformList[2].value = timeScale;
            this.particleShader.uniformList[3].value = timeScale < 0.5 ? 0 : (timeScale - 0.5) * 2;
            this.particleShader.bindShader();
            this.particles.bindVertexbuffer();

            this.context.viewport(0.0, 0.0, Main.CANVAS_WIDTH, Main.CANVAS_HEIGHT);
            this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
            this.context.drawArrays(this.context.POINTS, 0, project.Particles.NUM_PARTICLES);

            this.context.flush();

            //
            this.fpsCount += 1;
            if (this.fpsCount === 1) {
                this.st = new Date().getTime();
            }
            if (this.fpsCount === this.max) {
                var fps = this.fpsCount / (new Date().getTime() - this.st) * 1000;

                //ログに出力
                //				document.getElementById("fps").innerHTML = Math.round(fps) + " fps";
                this.fpsCount = 0;
            }
            this.controller.upDate();

            //
            requestAnimationFrame(function () {
                return _this.render();
            });
        };
        Main.CANVAS_WIDTH = 960;
        Main.CANVAS_HEIGHT = 540;
        return Main;
    })();
    project.Main = Main;
})(project || (project = {}));
window.addEventListener("load", function () {
    project.Main.initialize();
});

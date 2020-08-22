---
title: Three.js 着色器学习（1）
tags: []
id: '123'
categories:
  - - 着色器
date: 2019-07-08 16:03:09
---

本文内容来自 《 OpenGL着色器语言 》书中的学习记录

《 OpenGL着色器语言 》PDF地址

**链接：https://pan.baidu.com/s/1D91aMCCJtxXNWSOID9ov0g  
提取码：p4lx**

* * *

下面代码为完整的three.js代码

 Three框架      body { margin: 0px; } div#canvas-frame { border: none; cursor: pointer; width: 100%; height: 600px; background-color: #EEEEEE; }   varying vec2 vUv; void main() { vUv = uv; vec4 mvPosition = modelViewMatrix \* vec4( position, 1.0 ); gl\_Position = projectionMatrix \* mvPosition; }   uniform float time; varying vec2 vUv; uniform float testSize; void main( void ) { vec2 position = testSize + 2.0 \* vUv; float red = abs( sin( position.x \* position.y + time / 5.0 ) ); float green = abs( sin( position.x \* position.y + time / 4.0 ) ); float blue = abs( sin( position.x \* position.y + time / 3.0 ) ); gl\_FragColor = vec4( red, green, blue, 1.0 ); }   uniform vec3 LightPosition; const float SpecularContribution = 0.3; const float DiffuseContribution = 1.0 - SpecularContribution; varying float LightIntensity; varying vec2 MCposition; void main(void) { vec3 ecPosition = vec3(modelViewMatrix \* vec4( position, 1.0 )); vec3 tnorm = normalize(normalMatrix \* normal); vec3 lightVec = normalize(LightPosition - ecPosition); vec3 reflectVec = reflect(-lightVec, tnorm); vec3 viewVec = normalize(-ecPosition); float diffuse = max(dot(lightVec, tnorm), 0.0); float spec = 0.0; if (diffuse > 0.0) { spec = max(dot(reflectVec, tnorm), 0.0); spec = pow(spec, 16.0); } LightIntensity = DiffuseContribution \* diffuse + SpecularContribution \* spec; MCposition = position.xy; // gl\_Position = ftransform(); gl\_Position = projectionMatrix \* vec4( ecPosition, 1.0 ); }   uniform vec3 BrickColor, MortarColor; uniform vec2 BrickSize; uniform vec2 BrickPct; varying vec2 MCposition; varying float LightIntensity; void main(void) { vec3 color; vec2 position, useBrick; position = MCposition / BrickSize; if (fract(position.y \* 0.5) > 0.5) { position.x += 0.5; } position = fract(position); useBrick = step(position, BrickPct); color = mix(MortarColor, BrickColor, useBrick.x \* useBrick.y); color \*= LightIntensity; gl\_FragColor = vec4(color, 1.0); }  var renderer; var stats; var clock; var uniforms1, zhuantouUniforms; var camera, mouseControls, guiControls; var scene; var light; var mesh, zhuantou; // 自定义物体 function initZhuantou() { zhuantouUniforms = { LightPosition: { value: new THREE.Vector3(1, 1, 1) }, BrickPct: {value : new THREE.Vector2(0.9, 0.95)}, BrickSize: { value : new THREE.Vector2(15, 9)}, BrickColor: { value : new THREE.Vector3(1.0, 0.3, 0.2)}, MortarColor: { value : new THREE.Vector3(0.85, 0.86, 0.84)} }; var params = zhuantouUniforms; // var geometry = new THREE.CylinderGeometry(100, 150, 400); var geometry = new THREE.CubeGeometry(100, 100, 10, 100); var material = new THREE.ShaderMaterial({ uniforms: params, vertexShader: document.getElementById('zhuantou\_vertex\_shader').textContent, fragmentShader: document.getElementById('zhuantou\_fragment\_shader').textContent }); zhuantou = new THREE.Mesh(geometry, material); zhuantou.position.set(0, 0, 0); scene.add(zhuantou); } //几何物体 function initObject() { uniforms1 = { time: { value: 1.0 }, testSize: { value: -1.0 } }; var params = uniforms1; // var geometry = new THREE.CylinderGeometry(100, 150, 400); var geometry = new THREE.CubeGeometry(100, 100, 100, 100); var material = new THREE.ShaderMaterial({ uniforms: params, vertexShader: document.getElementById('vertex\_shader').textContent, fragmentShader: document.getElementById('fragment\_shader').textContent }); mesh = new THREE.Mesh(geometry, material); // mesh.position = new THREE.Vector3(-100, 0, 0); mesh.position.set(-200, 200, 0); scene.add(mesh); initZhuantou(); } // 初始化调试工具 function initControl() { // 调用gui调试台 guiControls = new function() { this.testSize = -1.0; } // 辅助线 var axes = new THREE.AxisHelper(500); scene.add(axes); } function controlUpdate() { var delta = clock.getDelta(); uniforms1.time.value += delta \* 5; uniforms1.testSize.value = guiControls.testSize; } //初始化webgl function initThree() { width = document.getElementById('canvas-frame').clientWidth; height = document.getElementById('canvas-frame').clientHeight; renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setSize(width, height); document.getElementById('canvas-frame').appendChild(renderer.domElement); renderer.setClearColor(0xFFFFFF, 1.0); clock = new THREE.Clock(); } //设置相机 function initCamera() { camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000); camera.position.set(-100, 100, 200); camera.up = new THREE.Vector3(0,1,0); camera.lookAt(0,0,0); } //初始化场景 function initScene() { mouseControls = new THREE.OrbitControls(camera, renderer.domElement); scene = new THREE.Scene(); } //设置化灯光 function initLight() { light = new THREE.AmbientLight(0xFF0000); light.position.set(100, 100, 200); scene.add(light); } //运行webgl function threeStart() { initThree(); initCamera(); initScene(); initLight(); initObject(); initControl(); animation(); } //设置动态场景 function animation() { mouseControls.update(); controlUpdate(); renderer.render(scene, camera); requestAnimationFrame(animation); } 

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Three框架</title>
    <script src="https://cdn.bootcss.com/three.js/r83/three.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js"></script>
    <script type="text/javascript" src="https://cdn.bootcss.com/dat-gui/0.7.6/dat.gui.min.js"></script>
    <script type="text/javascript" src="http://www.yanhuangxueyuan.com/threejs/examples/js/controls/OrbitControls.js"></script>
    <style type="text/css">
        body {
            margin: 0px;
        }
        div#canvas-frame {
            border: none;
            cursor: pointer;
            width: 100%;
            height: 600px;
            background-color: #EEEEEE;
        }
    </style>
    <script id="vertex_shader" type="x-shader/x-vertex">
        varying vec2 vUv;

        void main()
        {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * mvPosition;
        }

    </script>
    <script id="fragment_shader" type="x-shader/x-fragment">
        uniform float time;

        varying vec2 vUv;

        uniform float testSize;

        void main( void ) {

            vec2 position = testSize + 2.0 * vUv;

            float red = abs( sin( position.x * position.y + time / 5.0 ) );
            float green = abs( sin( position.x * position.y + time / 4.0 ) );
            float blue = abs( sin( position.x * position.y + time / 3.0 ) );
            gl_FragColor = vec4( red, green, blue, 1.0 );

        }
    </script>

    <script id="zhuantou_vertex_shader" type="x-shader/x-vertex">
        uniform vec3 LightPosition;
        const float SpecularContribution = 0.3;
        const float DiffuseContribution = 1.0 - SpecularContribution;
        varying float LightIntensity;

        varying vec2 MCposition;

        void main(void) {
            vec3 ecPosition = vec3(modelViewMatrix * vec4( position, 1.0 ));
            vec3 tnorm = normalize(normalMatrix * normal);

            vec3 lightVec = normalize(LightPosition - ecPosition);
            vec3 reflectVec = reflect(-lightVec, tnorm);
            vec3 viewVec = normalize(-ecPosition);
            float diffuse = max(dot(lightVec, tnorm), 0.0);
            float spec = 0.0;

            if (diffuse > 0.0) {
                spec = max(dot(reflectVec, tnorm), 0.0);
                spec = pow(spec, 16.0);
            }
            LightIntensity = DiffuseContribution * diffuse + SpecularContribution * spec;

            MCposition = position.xy;
            // gl_Position = ftransform();
            gl_Position = projectionMatrix * vec4( ecPosition, 1.0 );
        }

    </script>

    <script id="zhuantou_fragment_shader" type="x-shader/x-fragment">
        uniform vec3 BrickColor, MortarColor;
        uniform vec2 BrickSize;
        uniform vec2 BrickPct;

        varying vec2 MCposition;

        varying float LightIntensity;

        void main(void) {
            vec3 color;
            vec2 position, useBrick;
            position = MCposition / BrickSize;

            if (fract(position.y * 0.5) > 0.5) {
                position.x += 0.5;
            }
            position = fract(position);

            useBrick = step(position, BrickPct);

            color = mix(MortarColor, BrickColor, useBrick.x * useBrick.y);
            color *= LightIntensity;
            gl_FragColor = vec4(color, 1.0);
        }

    </script>
    <script>

        var renderer;
        var stats;
        var clock;
        var uniforms1, zhuantouUniforms;
        var camera, mouseControls, guiControls;
        var scene;
        var light;
        var mesh, zhuantou;

        // 自定义物体
        function initZhuantou() {

            zhuantouUniforms = {
                LightPosition: { value: new THREE.Vector3(1, 1, 1) },
                BrickPct: {value : new THREE.Vector2(0.9, 0.95)},
                BrickSize: { value : new THREE.Vector2(15, 9)},
                BrickColor: { value : new THREE.Vector3(1.0, 0.3, 0.2)},
                MortarColor: { value : new THREE.Vector3(0.85, 0.86, 0.84)}
            };

            var params = zhuantouUniforms;
            // var geometry = new THREE.CylinderGeometry(100, 150, 400);
            var geometry = new THREE.CubeGeometry(100, 100, 10, 100);
            var material = new THREE.ShaderMaterial({

                uniforms: params,
                vertexShader: document.getElementById('zhuantou_vertex_shader').textContent,
                fragmentShader: document.getElementById('zhuantou_fragment_shader').textContent

            });
            zhuantou = new THREE.Mesh(geometry, material);
            zhuantou.position.set(0, 0, 0);
            scene.add(zhuantou);
        }

        //几何物体
        function initObject() {

            uniforms1 = {
                time: { value: 1.0 },
                testSize: { value: -1.0 }
            };

            var params = uniforms1;
            // var geometry = new THREE.CylinderGeometry(100, 150, 400);
            var geometry = new THREE.CubeGeometry(100, 100, 100, 100);
            var material = new THREE.ShaderMaterial({

                uniforms: params,
                vertexShader: document.getElementById('vertex_shader').textContent,
                fragmentShader: document.getElementById('fragment_shader').textContent

            });
            mesh = new THREE.Mesh(geometry, material);
            // mesh.position = new THREE.Vector3(-100, 0, 0);
            mesh.position.set(-200, 200, 0);
            scene.add(mesh);

            initZhuantou();
        }

        // 初始化调试工具
        function initControl() {
            // 调用gui调试台
            guiControls = new function() {
                this.testSize = -1.0;
            }
            var gui = new dat.GUI();
            gui.add(guiControls, 'testSize', -2, 2);

            // 辅助线
            var axes = new THREE.AxisHelper(500);
            scene.add(axes);
        }

        function controlUpdate() {
            var delta = clock.getDelta();
            uniforms1.time.value += delta * 5;
            uniforms1.testSize.value = guiControls.testSize;
        }

        //初始化webgl
        function initThree() {
            width = document.getElementById('canvas-frame').clientWidth;
            height = document.getElementById('canvas-frame').clientHeight;
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });

            renderer.setSize(width, height);
            document.getElementById('canvas-frame').appendChild(renderer.domElement);

            renderer.setClearColor(0xFFFFFF, 1.0);

            clock = new THREE.Clock();

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.getElementById('canvas-frame').appendChild(stats.domElement);
        }

        //设置相机
        function initCamera() {
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.set(-100, 100, 200);
            camera.up = new THREE.Vector3(0,1,0);

            camera.lookAt(0,0,0);
        }

        //初始化场景
        function initScene() {
            mouseControls = new THREE.OrbitControls(camera, renderer.domElement);

            scene = new THREE.Scene();
        }

        //设置化灯光
        function initLight() {
            light = new THREE.AmbientLight(0xFF0000);
            light.position.set(100, 100, 200);
            scene.add(light);
        }

        //运行webgl
        function threeStart() {
            initThree();
            initCamera();
            initScene();
            initLight();
            initObject();
            initControl();
            animation();
        }
        //设置动态场景
        function animation() {
            mouseControls.update();

            controlUpdate();

            renderer.render(scene, camera);
            requestAnimationFrame(animation);
            stats.update();
        }

    </script>
</head>

<body onload="threeStart();">
    <div id="canvas-frame"></div>
</body>
</html>
```

threejs使用的是webgl的 GLSL ES来完成的着色器，也就造成了一些变量与opengl中不同，不过在发生代码错误的时候，可以在页面的console中看到一些输出的 [宏定义 【点击查看】](http://www.upcknox.com/2019/07/08/three-js-着色器中宏内容记录/)

#### 本例中，使用到了step()方法

下面内容来自 [OpenGL常用方法](https://blog.csdn.net/wangyuchun_799/article/details/7770500)

> genType step (genType edge, genType x)，genType step (float edge, genType x)
> 
> 如果x < edge，返回0.0，否则返回1.0

![](http://www.upcknox.com/wp-content/uploads/2019/07/微信截图_20190708162147.png)

可以由上图看出，砖块的大小只会和BrickSize的x和y有关，BrickPct只是用来控制砖块和泥土的比例的，BrickPct.x = 0.9 时，代表 砖块的x方向长度和泥土x方向长度的比例为9:1
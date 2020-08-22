---
title: Three.js 着色器中宏内容记录
tags: []
id: '131'
categories:
  - - 着色器
date: 2019-07-08 16:16:27
---

precision highp float;
precision highp int;
#define SHADER\_NAME ShaderMaterial
#define VERTEX\_TEXTURES
#define GAMMA\_FACTOR 2
#define MAX\_BONES 0
#define BONE\_TEXTURE
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef USE\_TANGENT
	attribute vec4 tangent;
#endif
#ifdef USE\_COLOR
	attribute vec3 color;
#endif
#ifdef USE\_MORPHTARGETS
	attribute vec3 morphTarget0;
	attribute vec3 morphTarget1;
	attribute vec3 morphTarget2;
	attribute vec3 morphTarget3;
	#ifdef USE\_MORPHNORMALS
		attribute vec3 morphNormal0;
		attribute vec3 morphNormal1;
		attribute vec3 morphNormal2;
		attribute vec3 morphNormal3;
	#else
		attribute vec3 morphTarget4;
		attribute vec3 morphTarget5;
		attribute vec3 morphTarget6;
		attribute vec3 morphTarget7;
	#endif
#endif
#ifdef USE\_SKINNING
	attribute vec4 skinIndex;
	attribute vec4 skinWeight;
#endif


        uniform vec3 LightPosition;
        const float SpecularContribution = 0.3;
        const float DiffuseContribution = 1.0 - SpecularContribution;
        varying float LightIntensity;
ees
        varying vec2 MCposition;
---
title: 《OpenGL着色语言》光源学习（三） – 聚光灯
tags: []
id: '359'
categories:
  - - 未分类
date: 2019-07-16 17:27:32
---

学习自： 《OpenGL 着色语言》

void SpotLight(in int i,
                in vec3 eye,
                in vec3 ecPosition3,
                in vec3 normal,
                inout vec4 ambient,
                inout vec4 diffuse,
                inout vec4 specular
) {
    float nDotVP;
    float nDotHV;
    float pf;
    float spotDot;          // 聚光灯间的角度的余弦
    float spotAttenuation;  // 聚光灯衰减因子
    float attenuation;      // 计算衰减因子
    float d;                // 从表面到光源的距离
    vec3 VP;                // 从表面到光的位置的距离
    vec3 halfVector;        // 最亮位置的方向

    // 计算从表面到光的位置的矢量
    VP = vec3(gl\_LightSource\[i\].position) - ecPosition;

    // 计算表面与光的位置之间的距离
    d = light(VP);

    // 规格化从表面到光的位置的矢量
    VP = normalize(VP);

    // 计算衰减
    attenuation = 1.0 / (gl\_LightSource\[i\].constantAttenuation +
                         gl\_LightSource\[i\].linearAttenuation \* d +
                         gl\_LightSource\[i\].quadraticAttenuation \* d \* d);

    // 查看表面上的点是否位于光照锥形之内
    spotDot = dot(-VP, gl\_LightSource\[i\].spotDirection);

    if (spotDot < gl\_LightSource\[i\].spotCosCutoff) {
        spotAttenuation = 0.0;  // 光照没有影响
    } else {
        spotAttenuation = pow(spotDot, gl\_LightSource\[i\].spotExponent);
    }

    // 结合聚光灯和距离衰减的效果
    attenuation \*= spotAttenuation;

    halfVector = normalize(VP + eye);

    nDotVP = max(0.0, dot(normal, VP));
    nDotHV = max(0.0, dot(normal, halfVector));

    if (nDotVP == 0.0) {
        pf = 0.0f;
    } else {
        pf = pow(nDotHV, gl\_FrontMaterial.shininess);
    }

    ambient += gl\_LightSource\[i\].ambient;
    diffuse += gl\_LightSource\[i\].diffuse \* nDotVP \* attenuation;
    specular += gl\_LightSource\[i\].specular \* pf \* attenuation;
}
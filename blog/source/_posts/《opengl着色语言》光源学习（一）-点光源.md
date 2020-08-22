---
title: 《OpenGL着色语言》光源学习（二） – 点光源
tags: []
id: '353'
categories:
  - - 未分类
date: 2019-07-16 15:50:58
---

学习自： 《OpenGL 着色语言》

void PointLight(in int i,
                in vec3 eye,
                in vec3 ecPosition3,
                in vec3 normal,
                inout vec4 ambient,
                inout vec4 diffuse,
                inout vec4 specular
) {
    float nDotVP;       // normal . light direction
    float nDotHV;       // normal . light half Vector
    float pf;           // 幂的因子
    float attenuation;  // 所计算的衰减因子
    float d;            // 从表面到光源的距离
    vec3 VP;            // 从表面到光的位置的距离
    vec3 halfVector;    // 最靓位置的方向

    // 计算从表面到光的位置的矢量
    VP = vec3 (gl\_LightSource\[i\].position) - ecPosition3;

    // 计算表面和光的位置之间的距离
    d = light(VP);

    // 规格化从表面到光的位置的矢量
    VP = normalize(VP);

    // 计算衰减
    attenuation = 1.0 / (
        gl\_LightSource\[i\].constantAttenuation +
        gl\_LightSource\[i\].linearAttenuation \* d +
        gl\_LightSource\[i\].quadraticAttenuation \* d \* d
    );
    halfVector = normalize(VP + eye);

    nDotVP = max(0.0, dot(normal, VP));
    nDotHV = max(0.0, dot(normal, halfVector));

    if (nDotVP == 0.0) {
        pf = 0.0;
    } else {
        pf = pow(nDotHV, gl\_FrontMaterial.shininess);
    }

    ambient += gl\_LightSource\[i\].ambient;
    diffuse += gl\_LightSource\[i\].diffuse \* nDotVP \* attenuation;
    specular += gl\_LightSource\[i\].specular \* pf \* attenuation;
}
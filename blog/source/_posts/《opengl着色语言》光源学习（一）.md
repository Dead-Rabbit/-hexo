---
title: 《OpenGL着色语言》光源学习（一） - 定向光源
tags: []
id: '339'
categories:
  - - 未分类
date: 2019-07-16 11:23:33
---

学习自： 《OpenGL 着色语言》

// 定向光源的计算
void DirectionLight(in int i, 
                    in vec3 normal, 
                    inout vec4 diffuse, 
                    inout vec4 specular) {
    float nDotVP;       // normal . light direction
    float nDotHV;       // normal . light half vector
    float pf;           // 幂的因子

    nDotVP = max(0.0, dot(normal, vec3(gl\_LightSource\[i\].position)));
    // halfVector存储的是 每个点的光方向矢量
    nDotHV = max(0.0, dot(normal, vec3(gl\_LightSource\[i\].halfVector)));

    if (nDotVP == 0.0) {
        pf = 0.0;
    } else {
        pf = pow(nDotHV, gl\_FrontMaterial.shininess);
    }
    ambient += gl\_LightSource\[i\].ambient;
    diffuse += gl\_LightSource\[i\].diffuse \* nDotVP;
    specular += gl\_LightSource\[i\].specular \* pf;
}

场景中的每一个点，都可以使用一个单独的光方向矢量，对于每一个光源i，可以事先计算这个方向矢量，并将其存储在gl\_LightSource\[i\].halfVector中。

上面程序中会计算 表面**法线**与**光的方向**之间的角度的余弦，以及表面**法线**与**光的方向和查看方向的半角**之间的角度的余弦。
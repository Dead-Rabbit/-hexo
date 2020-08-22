---
title: ShaderToy 学习（一）圆形
tags: []
id: '374'
categories:
  - - 着色器
date: 2019-07-25 11:18:06
---

学习自 [Shader与ShaderToy学习 - 画一个圆](https://blog.csdn.net/ssssssilver/article/details/81129441)

![](http://www.upcknox.com/wp-content/uploads/2019/07/微信截图_20190725111453-1024x351.png)

[](https://www.shadertoy.com/view/3tXSDB)[](https://www.shadertoy.com/view/3tXSDB)[https://www.shadertoy.com/view/3tXSDB](https://www.shadertoy.com/view/3tXSDB)[](https://www.shadertoy.com/view/3tXSDB)

//输入参数(当前点位置，中心点位置，点的半径，颜色，与背景过渡的平滑值)
vec4 cicle(vec2 pos,vec2 center,float radius,vec3 col,float antialias){
    //求圆心距离
    float d = length(pos - center) - radius;
    //smoothstep(a,b,t)函数 t<a return a, t>b return b
    float t = smoothstep(0.0, antialias, d);
    return vec4(col, 1.0-t);
}
void mainImage(out vec4 fragColor, in vec2 fragCoord )
{
    //获取点的位置
    //iResolution为屏幕的分辨率
    //fragCoord为当前点的位置 原点是左下角
    //返回的uv是以屏幕中心为原点
    vec2 uv =(2.0 \* fragCoord.xy - iResolution.xy) / iResolution.y;
    //中心点
    vec2 point1 = vec2(0,0);
    //圆的颜色
    vec3 color=vec3(0.3,1,0);
    // layer1 cos函数
    vec3 temp = 0.5 + 0.5\*cos(iTime+uv.xyx+vec3(0,2,4));
    vec4 layer1= vec4(temp,1);
    //layer2 平滑的圆
    vec4 layer2 = cicle(uv,point1,0.8,color,0.01);
    // 输出像素
    fragColor = mix(layer1, layer2, layer2.a);
}

上面代码中，首先重点介绍一下 smoothstep 函数及其在当前例子中的应用。

参考 [该博客](https://blog.csdn.net/u010333737/article/details/82859246) 的图可知，**当d小于0.0时，返回0；大于antialias时，返回1；在两者之间时，返回一个过渡平滑的值；**在本例中，d指的是，该点与中心点的距离 减去 圆的半径，所以smoothstep可以用来平滑分界线，如果不想平滑的话，可以使用step方法来直接确定颜色值。

mix为线性插值，第三个参数为插值的比例

其中关于变量的解释：

// 屏幕的尺寸
#define iResolution \_ScreenParams
// 屏幕中的坐标，以pixel为单位
#define gl\_FragCoord ((\_iParam.srcPos.xy/\_iParam.srcPos.w)\*\_ScreenParams.xy) 

> 难懂的是gl\_FragCoord的定义。(\_iParam.srcPos.xy/\_iParam.srcPos.w)将得到在屏幕中归一化后的屏幕位置，即返回分量范围在(0, 1)的屏幕横纵坐标值。屏幕的左下角值为(0, 0)，右上角值为(1, 1)。然后再乘以屏幕的长款像素值，就得到了该fragment对应的屏幕像素位置。这是我们后面计算的基础。
> 
> 作者：妈妈说女孩子要自立自强  
> 来源：CSDN  
> 原文：https://blog.csdn.net/candycat1992/article/details/44244549
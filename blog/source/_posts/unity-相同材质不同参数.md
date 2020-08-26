---
title: Unity-相同材质不同参数
tags: []
id: '427'
categories:
  - - 未分类
date: 2019-08-19 12:01:09
---

参考 [\[ExecuteInEditMode\] - 讓 Unity 在編輯模式中也能夠執行腳本](http://gn02214231.pixnet.net/blog/post/199606501-%e5%a6%82%e4%bd%95%e8%ae%93-unity-%e5%9c%a8%e7%b7%a8%e8%bc%af%e6%a8%a1%e5%bc%8f%e4%b8%ad%e4%b9%9f%e8%83%bd%e5%a4%a0%e5%9f%b7%e8%a1%8c%e8%85%b3%e6%9c%ac) [Unity共同材质设置不同参数](https://blog.csdn.net/leemu0822/article/details/83823040)

![](unity-相同材质不同参数/WX20190819-115922@2x.png)

写unity2d项目的时候遇到了一个问题，自己写了一个拥有法线贴图的shader，放置在一个材质中，现在有很多obj需要用到这个材质，但是不同的obj需要不同的法线纹理，共同的材质只能赋予同一个法线纹理。

目前找到的方法是，写一个脚本，通过脚本修改当前obj的法线纹理，在程序运行初期修改发线贴图，程序如下

```
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]
public class MaterialHelper : MonoBehaviour
{
    public Texture normalTexture;

    private Renderer renderer;
    private bool changed = false;
    
    public void Update()
    {
        if (changed) return;
        
        renderer = GetComponent<Renderer>();
        if (normalTexture == null || renderer == null) {
            return;
        }
        
        renderer.material.SetTexture("_BumpMap", normalTexture);
        changed = true;
        Debug.Log("set map", normalTexture);
    }
}
```

其中 \[ExecuteInEditMode\] 用来定义当前脚本会在editor视图中执行，这样可以在编辑的时候看到运行结果了
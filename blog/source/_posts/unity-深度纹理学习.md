---
title: Unity-深度纹理学习
tags: []
id: '465'
categories:
  - - 未分类
date: 2019-08-30 11:41:40
---

learn from: [神奇的深度图：复杂的效果，不复杂的原理](https://www.cnblogs.com/murongxiaopifu/p/7050233.html)

疑惑与学习：

一、tex2Dproj 方法具体解释

> 来自书《Unity Shader入门精要》
> 
> tex2Dproj 这样的函数进行投影纹理采样，纹理坐标的**前两个分量首先会除以最后一个分量**，再进行纹理采样

```
如: fixed4 color = tex2Dproj(_GrabTempTex, i.grabPos);
```

* * *
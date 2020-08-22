---
title: Unity3D中Layers和LayerMask解析
tags: []
id: '529'
categories:
  - - 未分类
date: 2019-09-21 16:35:16
---

learn from [Unity3D中Layers和LayerMask解析](https://www.jianshu.com/p/89d5252a8b74)

在代码中使用时如何开启某个Layers？

`LayerMask mask = 1 << 你需要开启的Layers层。`

`LayerMask mask = 0 << 你需要关闭的Layers层。`

举几个个栗子：

```
LayerMask mask = 1 << 2; 表示开启Layer2。

LayerMask mask = 0 << 5;表示关闭Layer5。

LayerMask mask = 1<<2|1<<8;表示开启Layer2和Layer8。

LayerMask mask = 0<<3|0<<7;表示关闭Layer3和Layer7。
```

上面也可以写成：

```
LayerMask mask = ~（1<<3|1<<7）;表示关闭Layer3和Layer7。

LayerMask mask = 1<<2|0<<4;表示开启Layer2并且同时关闭Layer4.
```
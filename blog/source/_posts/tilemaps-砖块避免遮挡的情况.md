---
title: TileMaps 砖块避免遮挡的情况
tags: []
id: '636'
categories:
  - - 未分类
date: 2020-03-16 21:02:51
---

内容来自 [Unity3D中Isometric Tilemap功能实践](https://www.cnblogs.com/vvjiang/p/10344007.html)

原文：

Tile间的遮挡问题，我通过之前提到的[Unity英文社区的参考链接](https://forum.unity.com/threads/isometric-tilemap-sorting-issues.554914/)解决了。

操作就是通过Edit > Settings > Graphics，修改Transparency Sort Mode为Custom Axis，并将其值设为X：0，Y：1，Z：-0.49。
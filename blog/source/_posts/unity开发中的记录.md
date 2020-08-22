---
title: Unity开发中的记录
tags: []
id: '114'
categories:
  - - Unity
  - - 开发日志
date: 2019-06-27 15:40:04
---

将子物体的相对坐标转换为世界坐标

Vector3 wantedPosition = target.TransformPoint(x\_, height, -distance);

* * *

InverseTransformPoint变换位置从世界坐标到局部坐标
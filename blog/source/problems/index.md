---
title: problems
date: 2019-04-29 20:42:07
---
- [ ] 将物体坐标系下的法向量方向 转变为 试图坐标系下的法向量方向时，会发生无法垂直的问题，原理清楚记住 [【The Normal Matrix】](http://www.lighthouse3d.com/tutorials/glsl-12-tutorial/the-normal-matrix/)
- [x] 理解欧拉角相关的一些问题，之前听过相关内容，不是很清晰
			学习地址：《3D数学基础：图形与游戏开发》中的第十章，3D中的方位与角位移
			解答：之前比较迷惑的是万向锁的问题，现已了解。以下内容涉及到欧拉角的变换，忘记可查书。
			如果 pitch = ±90°，会导致物体坐标系中的bank方向（z轴）与原惯性坐标系的heading方向（y轴）重合，则会出现heading方向与bank方向的作用相当的情况（别名问题）。
			所以，在限制欧拉角（heading和bank限制在-180°~180°之间，pitch在90°~-90°之间）中，如果pitch为±90°，则bank为0

---
title: GPU流水线
date: 2019-04-18 17:49:53
tags:
---
*学习自《Unity Shader入门精要》 - 2.3 GPU流水线*
***
当GPU从CPU获得渲染命令后，会执行GPU流水线操作，该命令会**指向一个需要被渲染的图元（图元可以是点、线、三角面等）列表**，而不包含任何材质信息  
当确定执行Draw Call时，GPU会根据**渲染状态（材质、纹理、着色器等）**和所有的输入定点数据进行计算。
### 渲染流程图
#### 渲染总流程
```flow
op1=>operation: 应用阶段
op2=>operation: 几何操作
op3=>operation: 光栅化阶段

op1(right)->op2(right)->op3
```
#### 应用阶段
```flow
op1=>operation: 加载数据到显存
op2=>operation: 设置渲染状态
op3=>operation: 调用Draw Call

op1(right)->op2(right)->op3
```
#### 几何阶段
```flow
op1=>operation: 顶点着色器
op2=>operation: 曲面细分着色器
op3=>operation: 几何着色器
op4=>operation: 裁剪
op5=>operation: 屏幕映射

op1(right)->op2(right)->op3(right)->op4(right)->op5
```
#### 光栅化阶段 
```flow
op1=>operation: 三角形设置
op2=>operation: 三角形遍历
op3=>operation: 片元着色器
op4=>operation: 逐片源操作

op1(right)->op2(right)->op3(right)->op4
```

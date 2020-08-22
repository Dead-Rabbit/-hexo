---
title: Shader Clip()
tags: []
id: '645'
categories:
  - - 未分类
date: 2020-04-09 12:14:31
---

可以用来剪切括号里值小于0的像素

本人大多数用于剪掉alpha小于某值得像素

例：

clip(texColor.a - \_Cutoff);
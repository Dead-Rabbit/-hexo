---
title: Unity Button添加鼠标Down等事件
tags: []
id: '461'
categories:
  - - 未分类
date: 2019-08-25 11:43:01
---

本以为和Button的onClick添加一个Listener就行，奈何Unity没有这个功能。不过所幸搜到了解决方法，只要让对应button绑定的脚本继承IPointerDownHandler就行，然后再在方法中实现 OnPointerDown(PointerEventData pe)即可

```
    public void OnPointerDown(PointerEventData pe)
    {
        Debug.Log("down " + this);
    }
```
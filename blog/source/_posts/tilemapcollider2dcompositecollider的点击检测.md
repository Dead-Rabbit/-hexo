---
title: TileMapCollider2D+CompositeCollider2D的点击检测
tags: []
id: '621'
categories:
  - - 未分类
date: 2020-03-14 11:01:46
---

使用Collider2D自带的OverlapPoint来检测点是否在范围内

且Composite的Geometry Type需要修改为Polygons

![](http://www.upcknox.com/wp-content/uploads/2020/03/微信截图_20200314110038.png)

```
Vector2 clickPosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
if (_compositeCollider.OverlapPoint(new Vector3(clickPosition.x, clickPosition.y, transform.position.z))) {
    Debug.Log("click in tileMapCollider");
}
```
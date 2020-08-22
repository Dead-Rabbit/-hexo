---
title: TileMap 程序处理
tags: []
id: '609'
categories:
  - - 未分类
date: 2020-03-04 09:00:20
---

上一篇 添加TIleMap插件 添加TileMap相关的操作

这篇文章简单说一下地图的生成

使用柏林噪音拿到随机数，然后根据随机数的值判断Tile瓦片的类型

**public class** Noise
{
    // position为取值位置，offset为偏移位置，scale为柏林图的大小缩放
    **public static float** Get2DPerlin(Vector3 position, **float** offset, **float** scale)
    {
        **return** Mathf.PerlinNoise((position.**x**) \* scale + offset, (position.**y**) \* scale + offset);
    }
}
// 目前个人项目中，scale的范围设置为1~0.1，offset随意了…

关于设置TileMap中固定位置的瓦片

**baseTiles**.SetTile(position, tile);
---
title: Unity 图片毛边问题
tags: []
id: '491'
categories:
  - - 未分类
date: 2019-09-08 16:50:23
---

今天要写一个火焰的效果，遇到了一个问题，当我制作其为像素画风格时，出现了格子问题，如下所示

![](http://www.upcknox.com/wp-content/uploads/2019/09/QQ截图20190908164519.png)

在查找问题的时候，发现原图片上传后，边缘出现了毛边的情况，此时材质的配置如下

![](http://www.upcknox.com/wp-content/uploads/2019/09/QQ截图20190908164637.png)

在查找是否为FilterMode问题的时候，看到了如下内容，同时记忆学习下

以下内容来自 **[Unity UGUI 图片模糊](https://www.jianshu.com/p/f86700fbda7c)**

*   这里Texture Type默认格式为Texture。  
    这种纹理格式是3D物体最常用的纹理，不过UGUI需要修改为Sprite(2D and UI)。
*   Sprite Mode保持默认Single
*   如果要切割图片需要修改为Multiple，打开Sprite Editor面板，点击左上角的Slice，点击Slice按钮，默认的配 置会自动把图集切割成一张一张小图，切割适用于美工给的图片是一整图集。
*   Packing Tag 打包图集名，相同Tag的图片会被打包成一张图
*   Pixels Per Unit 每单位像素值，默认就好
*   Pivot 中心点，一般是Center，根据需求修改
*   Generate Mip Maps 把勾去掉，Mit Maps多级纹理，是逐步缩小图像版本的一个列表，远离相机的物体使用较小的纹理版本，这个对于UGUI来说没什么用处，还会造成图片模糊和多使用33％以上的内存。
*   Filter Mode 纹理过滤模式保持默认Bilinar
*   Point 点模式，纹理在近距离变成块状，UGUI分辨率缩小时，图片会边模糊
*   Bilinear 双线性，纹理在近距离变模糊，UGUI下分辨率缩小时，模糊效果比Point好太多
*   Trilinear 三线性，类似双线性，但纹理也在不同的mipmap层次之间变模糊，在UGUI中不适用
*   Max Size 导入纹理的最大尺寸。美工往往更愿意使用巨大的纹理，用这个调整纹理降到合适的大小。
*   Format 纹理格式
*   Compressed 压缩，压缩RGB纹理，这是最常见的漫反射纹理格式。UGUI中大部分图片都使用这个格式。
*   Truecolor 真彩色，这是最高的质量。通常透明度和颜色渐变的图片使用这个格式，这个格式消耗也大

* * *

目前已通过修改材质的属性“解决”了问题，，修改TextureType为“Sprite”后貌似修复好了，仔细看还是有问题的：

![](http://www.upcknox.com/wp-content/uploads/2019/09/QQ截图20190908164811.png)

还是会存在部分描边情况，怀疑和程序有关

Unity Package git 下载地址： [https://github.com/Dead-Rabbit/UnityFire](https://github.com/Dead-Rabbit/UnityFire)
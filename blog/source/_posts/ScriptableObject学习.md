---
title: ScriptableObject学习
date: 2019-05-06 16:16:20
tags:
---
[【阿空】Unity的可編程物件：ScriptableObject！操作视频](https://www.youtube.com/watch?v=0nW5PhQTWbQ)
简单应用视频，看完之后，大体了解了ScriptableObject可以帮助我们实现数据的存储，而不是自己写xml+xml解释器等东西，相对来说很方便，且其中的[CreateAssetMenu]可以帮助我们很方便的创建数据。
***
[【Unity】ScriptableObject的介绍 - 冯乐乐博客](https://blog.csdn.net/candycat1992/article/details/52181814)
看了前小部分，突然明白为什么ScriptableObject可以实现直接存储数据了，如果一个脚本引用了ScriptableObject，那它是会随着使用者的更改而永久更改，就不会出现“结束一次运行，期间调整的内容恢复到原状态”这种情况了。
***
其他内容
[Unity學習筆記#9 :更多ScriptableObject的妙用](https://kendevlog.wordpress.com/2017/12/04/unity%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%989-%E6%9B%B4%E5%A4%9Ascriptableobject%E7%9A%84%E5%A6%99%E7%94%A8/)
---
title: Unity中四元数API
tags: []
id: '584'
categories:
  - - 未分类
date: 2020-02-28 20:30:11
---

转自：[Unity基础（17）-四元数与欧拉角与矩阵](https://www.jianshu.com/p/f9e301da838d)

*   1.来把角度转化为相应四元素

```
Quaternion rot=Quaternion.Euler(30，60，90)；
旋转顺序是，先绕Z轴转动90度，再绕X轴转动30度，最后绕Y轴转动60度
```

*   2.绕指定轴旋转指定角度相应的四元素

```
Quaternion rot= Quaternion.AngleAxis(60, transform.forward);
意思为绕自身正方向转60度其相应的四元素，当然了，第一个参数可以是其他方向变量
```

*   3.两个四元素相乘，代表按顺序进行两次旋转

```
Quaternion rot1=Quaternion.Euler(0，30，0);
Quaternion rot2=Quaternion.Euler(0，0，45);
Quaternion rot=rot2*rot1；
意思是先绕y旋转30度再绕z旋转45度，所以，你要先绕哪个四元素先旋转就放最右边
```

*   4.四元素与向量相乘，得到的是将原向量旋转后的新向量

```
Vector3 to = Quaternion.AngleAxis(45, Vector3.up)* Vector3.forward    
to是将Vector3.forward绕Vector3.up旋转45度后得到的新向量
```

*   5.已知两个向量，求从一个向量转到另一个向量的四元数：

```
Quaternion rot=Quaternion.FromToRotation(Vector3.up, Vector3.forward);
这的意思是创建一个从y轴正方向到z轴正方向的旋转角度所对应的四元数
例子：
Vector3 aimDirection=(targetTrans.position – transform.position).normalized;
Quaternion rot = Quaternion.FromToRotation(transform.up，aimDirection);
transform.rotation = rot * transform.rotation;
此游戏对象自身转向这个计算出来的偏转角所对应的四元数，如果将此至于Update中就可以做到不断对准目标
```

*   6.创建一个让Z轴正方向和Y轴正方向指向规定方向的旋转

```
Quaternion rot = Quaternion.LookRotation(Vector3.right, Vector3.down);
这的意思是创建一个让Z轴正方向指向世界坐标x轴正向，y轴正方向竖直向下的旋转角度所对应的四元数
Vector3 vr = new Vector3(1,0,0);  
Quaternion q = Quaternion.LookRotation(vr);
```

void SetLookRotation(Vector3 view);  
void SetLookRotation(Vector3 view, Vector3 up);

也是根据指定的向前和向上向量创建四元数，本质计算过程和LookRotation一样，只不过LookRotation是Quaternion上的静态函数，而SetLookRotation则是Quaternion的成员函数。

*   7.已知两个由四元数代表的旋转角度，求出从一个角度渐变到另一个角度的增量

```
Quaternion rot=Quaternion.Euler(0，30，0)
Quaternion targetRot= rot*transform.rotation；
transform.rotation= Quaternion.RotateTowards(transform.rotation, targetRot, 90*Time.deltaTime);
意思为游戏对象的角度会逐渐向targetRot以90*Time.deltaTime的角速度(90度每秒)逐渐逼近,因为这代码并不能够在一帧中完成所以要放于update中
```

*   8.两个四元数之间的线性插值lerp

```
transform.rotation=Quaternion.Lerp（transform.rotation, Vector3.up，0.5f）；
第一个参数是起始的角度所对应的四元数
第一个参数是终点的角度所对应的四元数
第三个参数是这个过程需要多少秒
```

*   9.两个四元数之间的球形插值Slerp

```
transform.rotation=Quaternion.Slerp(transform.rotation, Vector3.up，0.5f);
第一个参数是起始的角度所对应的四元数
第一个参数是终点的角度所对应的四元数
第三个参数是这个过程需要多少秒
```

*   10.旋转轴和旋转角度算出四元数

```
Quaternion RotateTowards(Quaternion from,Quaternion to, float maxDegreesDelta);
以maxDegreesDelta作为角度步长计算从from到[to]
根据旋转轴和旋转角度算出四元数
```

*   11.四元数对应的三个轴向的欧拉角

```
Quaternion.eulerAngles
存放四元数对应的三个轴向的欧拉角，分别是绕x轴、y轴、z轴旋转的角度

Quaternion q3 = new Quaternion();  
q3.eulerAngles = new Vector3(10, 30, 20);  
Quaternion qx3 = Quaternion.AngleAxis(10,Vector3.right);          
Quaternion qy3 = Quaternion.AngleAxis(30,Vector3.up);  
Quaternion qz3 = Quaternion.AngleAxis(20,Vector3.forward);            
Quaternion qxyz3 = qz3*qy3*qx3;  
从这里可以看出unity中旋转顺序也是按先绕x轴旋转，然后y，最后z。unity中对向量应用旋转量使用的是向量右乘，即如下：
Vector3 newV = qxyz3*v=qz3*qy3*qx3*v;
```
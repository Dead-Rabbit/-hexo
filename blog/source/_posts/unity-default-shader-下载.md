---
title: Unity default shader 下载
tags: []
id: '541'
categories:
  - - Unity
  - - 着色器
date: 2019-10-17 16:28:03
---

> 2019.2.3f1 【Sprites-Default.shader】
> 
> 链接:https://pan.baidu.com/s/13U3ocIxvqDmT264VeiY\_ug 密码:gubn

> builtin\_shaders-2019.2.3f1.zip
> 
> 链接:https://pan.baidu.com/s/1mOdZJBFqh5-g5iAWnzUA9Q 密码:ri74

Sprite Default 内容为：

Shader "Sprites/Default"
{
    Properties
    {
        \[PerRendererData\] \_MainTex ("Sprite Texture", 2D) = "white" {}
        \_Color ("Tint", Color) = (1,1,1,1)
        \[MaterialToggle\] PixelSnap ("Pixel snap", Float) = 0
        \[HideInInspector\] \_RendererColor ("RendererColor", Color) = (1,1,1,1)
        \[HideInInspector\] \_Flip ("Flip", Vector) = (1,1,1,1)
        \[PerRendererData\] \_AlphaTex ("External Alpha", 2D) = "white" {}
        \[PerRendererData\] \_EnableExternalAlpha ("Enable External Alpha", Float) = 0
    }

    SubShader
    {
        Tags
        {
            "Queue"="Transparent"
            "IgnoreProjector"="True"
            "RenderType"="Transparent"
            "PreviewType"="Plane"
            "CanUseSpriteAtlas"="True"
        }

        Cull Off
        Lighting Off
        ZWrite Off
        Blend One OneMinusSrcAlpha

        Pass
        {
        CGPROGRAM
            #pragma vertex SpriteVert
            #pragma fragment SpriteFrag
            #pragma target 2.0
            #pragma multi\_compile\_instancing
            #pragma multi\_compile\_local \_ PIXELSNAP\_ON
            #pragma multi\_compile \_ ETC1\_EXTERNAL\_ALPHA
            #include "UnitySprites.cginc"
        ENDCG
        }
    }
}
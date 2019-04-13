---
title: insert_html
date: 2019-04-12 20:31:41
tags:
---

# Markdown嵌入HTML测试




<div class="drip-origin-class"></div>

<style media="screen">
    .drip-origin-class {
      background-color: #43A2CE;
      width: 200px;
      height: 250px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: auto;
      position: relative;
    }
    .drip-origin-class:before {
      position: absolute;
      left: 92.5px;
      top: 0;
      content: '';
      width: 15px;
      height: 15px;
      background-color: #FFF;
      border-radius: 50%;
      opacity: 0;
      animation: drip-origin-class 4s ease infinite;
    }
    .drip-origin-class:after {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      width: 0px;
      height: 0px;
      border: solid 4px #FFF;
      border-radius: 50%;
      opacity: 0;
      animation: drip-origin-splash 4s ease infinite;
    }

    @keyframes drip-origin-class {
      10% {
        top: 0;
        opacity: 1;
        animation-timing-function: cubic-bezier(0.24, 0, 0.76, 0.14);
      }
      25% {
        opacity: 1;
        top: 200px;
        animation-timing-function: ease-out;
        width: 15px;
        height: 15px;
        left: 92.5px;
      }
      30% {
        opacity: 1;
        top: 160px;
        width: 5px;
        height: 5px;
        animation-timing-function: ease-in;
        left: 97.5px;
      }
      33% {
        top: 200px;
        opacity: 0;
        animation-timing-function: ease-out;
        left: 97.5px;
      }
      33.001% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes drip-origin-splash {
      0% {
        opacity: 0;
      }
      25% {
        bottom: 50px;
        left: 100px;
        opacity: 0;
        width: 0px;
        height: 0px;
      }
      25.001% {
        opacity: 1;
      }
      33% {
        bottom: 0;
        left: 0;
        opacity: 0;
        width: 200px;
        height: 100px;
      }
      33.001% {
        bottom: 50px;
        left: 100px;
        opacity: 1;
        width: 0px;
        height: 0px;
      }
      43% {
        bottom: 0;
        left: 0;
        opacity: 0;
        width: 200px;
        height: 100px;
      }
      43.001% {
        opacity: 0;
      }
    }

</style>
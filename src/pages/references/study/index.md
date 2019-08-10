---
templateKey: reference
title: "[Reference] Studyコマンド"
date: 2019-08-10T03:04:46+09:00
description: "[Reference] studyコマンド"
tags:
  - reference
  - study
---

## Study コマンド

```
study(title, shorttitle, overlay, format, precision, scale, max_bars_back) → void
```

### 引数

#### format(const string)

- format.price  
  カーソルを当てた箇所の値が数値で表示される

- format.volume  
  カーソルを当てた箇所の値が省略した数値で表示される (10.5K, 123M 等)

![](./format.png)

---
category: Components
type: Data Display
title: Icon
subtitle: 图标
---

## 如何使用 (WEB 版)

一. 首先安装依赖：（参考 https://github.com/oblador/react-native-vector-icons）

npm install react-native-vector-icons-qmicon —save

react-native link

二. 应用：
import { QMIcon, QMButton } from "qmkit";

图标：<QMIcon name="shouji1" size="md" color="red"/>
带图标按钮：<QMButton icon="shouji1">123</QMButton>

## API

适用平台：React-Native

| 属性        | 说明           | 类型            | 默认值       |
|------------|----------------|----------------|--------------|
| name    |   图标名称  | name  | ‘shouji1’ reqiure('xxx')   |
| size    |   图标大小  | 'xxs'/'xs'/'sm'/'md'/'lg'
| color   |   图标颜色  | color | '#000' |

---
category: Components
type: Data Entry
title: Button
subtitle: 按钮
---

点击后会触发一个操作。


## API

适用平台：React-Native

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| type    | 按钮类型，可选值为`primary`/`ghost`或者不设  |   string   |   -  |
| size    | 按钮大小，可选值为`middle`、`small` | string | `middle`|
| activeStyle  | 点击反馈的自定义样式 (设为 false 时表示禁止点击反馈) | {}/false | {} |
| disabled   | 设置禁用  | boolean |    false  |
| style    | 自定义样式 |   Object  | 无 |
| onPress    | 点击按钮的点击回调函数 | (e: Object): void |   无  |
| onPressIn   | 同 RN TouchableHighlight onPressIn | (e: Object): void |   无  |
| onPressOut    | 同 RN TouchableHighlight onPressOut | (e: Object): void |   无  |
| onShowUnderlay    | 同 RN TouchableHighlight onShowUnderlay | (e: Object): void |   无  |
| onHideUnderlay    | 同 RN TouchableHighlight onHideUnderlay | (e: Object): void |   无  |

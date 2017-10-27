# turntable
js 抽奖转盘

## Usage
demo：<a href="https://cgygd.github.io/turntable/index.html" target="_blank">https://cgygd.github.io/turntable/index.html</a>

### options
1. **element** - 绑定的需要转动的容器id名字 
    - **type**: String
    - **required** : true
2. **point** - 绑定点击抽奖的按钮id名字
    - **type**: String
    - **required** : true
3. **prize** - 奖品列表数组
    - **type**: Array
    - **required** : true

### Listeners
1. **confirm** - 抽奖成功之后的回调
    - **type**: function
# API

## UIModal([opt]) 
创建一个实例（注意：不需要关键字new）

``` javascript
var modal = UIModal();
```

opt，类型：Object ，可选

|参数|类型|默认值|描述|
|--|--|--|--|
|`clickClose`|Boolean|false|设置为true，点击背景层(div.ui-modal)调用close()|
|`zIndex`|Number|1000|背景层(div.ui-modal)的z-index值|
|`background`|String|"rgba(0,0,0,0)"|背景层(div.ui-modal)的background值|
|`onshow`|Function|funcition(){}|调用open()时，在创建背景层(div.ui-modal)之前触发的函数，如果`return false`，则将不再继续执行open()方法|
|`onshown`|Function|funcition(){}|调用open()时，在创建背景层(div.ui-modal)之后触发的函数|
|`onhide`|Function|funcition(){}|调用close()时，在移除背景层(div.ui-modal)之前触发的函数，如果`return false`，则将不再继续执行close()方法|
|`onhidden`|Function|funcition(){}|调用close()时，在移除背景层(div.ui-modal)之后触发的函数|

配置实例：
``` javascript
var modal = UIModal({
    background:'rgba(0,0,0,.5)',
    onshown:function(){
        console.log('modal open');
    }
});
```
也可以使用如下方式配置：
``` javascript
var modal = UIModal({
    background:'rgba(0,0,0,.5)'
});
modal.onshown = function(){
    console.log('modal open');
}
```

## 实例方法
|方法|描述|
|--|--|
|`open()`|该方法将创建一个背景层(div.ui-modal)插入到body中|
|`close()`|该方法将从body中移除背景层(div.ui-modal)|

``` javascript
var modal = UIModal({background:'rgba(0,0,0,.5)'});
modal.open();
```

使用参数调用方法：

``` javascript
var modal = UIModal({background:'rgba(0,0,0,.5)'});
modal.onshown=function(arg){
    this.el.innerHTML = '<p>'+arg.text+'</p>'
}
modal.open({text:'modal open'});
```

在`onshown`和`onhide`函数中，`this.el`是该实例背景层(div.ui-modal)的节点,而在`onshow`和`onhidden`函数中，由于背景层(div.ui-modal)还没有被创建或已经被移除，因此`this.el`等于`null`

## 全局方法

|方法|描述|
|--|--|
|`UIModal.setBodyScroll()`|如果body存在滚动条，将隐藏滚动条，并修正由于滚动条消失所造成的偏移量|
|`UIModal.resetBodyScroll()`|回到setBodyScroll方法被调用之前的状态|

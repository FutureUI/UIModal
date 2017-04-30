
# Examples

本文将演示如何使用UIModal来创建一个提示弹出框(alert)。

### 引入需要的文件

``` html
<script src="UIModal.js" type="text/javascript"></script>
```

### 创建一个用于打开弹出层的按钮
``` html
<input type="button" id="openBtn" value="按钮" />
```

### 创建一个UIModal实例
``` javascript
var alert = UIModal({
    background:'rgba(0,0,0,.3)'
});
alert.onshown = function(text){
    this.el.innerHTML = '<div class="alert">'
                        +'  <p>'+text+'</p>'
                        +'  <input type="button" value="确定" />'
                        +'</div>';
    var _this = this;
    var btn = this.el.querySelector('input[type="button"]');
    btn.addEventListener('click',function(){
        _this.close();
    })
}
var openBtn = document.querySelector('#openBtn');
openBtn.addEventListener('click',function(){
    alert.open('这是一个UIModal的例子');
})
```

需要的样式文件
``` CSS
.alert{
    position:absolute;top:50%;left:50%;
    width:300px;height:100px;
    margin-left:-150px;margin-top:-50px;
    background:#fff;
}
.alert p{padding:20px;text-align:center;}
.alert input{display:block;margin:0 auto;}
```

### 运行结果：
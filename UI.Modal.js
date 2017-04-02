

var UI = UI || {};

!function(){

	
	var Modal=function(options){
		
		this.opt=Object.assign({
			callback:function(){},	//回调函数
			closeMethod:false		//点击遮罩层关闭 true / false
		},options)

		this.el=null;
		this.callback = this.opt.callback;

		//计算body初始化的paddingRight
		this.ORIGINAL_BODY_PAD = document.body.style.paddingRight || '';

		//计算滚动条宽度
		this.SCROLLBAR_WIDTH=function () {
		    var div = document.createElement('div');
		    div.style.cssText = 'position: absolute;top: -9999px;width: 50px;height: 50px;overflow: scroll;'
		    document.body.appendChild(div);
		    var width = div.offsetWidth - div.clientWidth
		    document.body.removeChild(div)
		    return width ;
		}();

	}

	Modal.prototype.show=function(obj){

		var me=this;

		console.log(this.el);
		if(this.el) return false;
		
		this.el=document.createElement('div');
		this.el.className="ui-modal";
		document.body.appendChild(this.el);
		
		if( document.body.className.indexOf('ui-modal-open') == -1 ){
			
		    //判断浏览器是否存在滚动条，修正偏移量
			if(document.body.clientWidth<window.innerWidth){
				var bodyPad = parseInt(getComputedStyle(document.body)['paddingRight'] || 0);
				document.body.style.paddingRight=bodyPad + this.SCROLLBAR_WIDTH + 'px';
	    	}

	    	document.body.classList.add('ui-modal-open');

		}

		//判断关闭方式，设置透明层可点击关闭modal
		if( this.opt.closeMethod ){
			this.el.addEventListener('click',function(e){
				e.stopPropagation();
				e.target === this && me.hide();
			})
	    }

	    return this.callback(obj);

	}

	Modal.prototype.hide=function(){

		this.el.remove();
		this.el=null;
		
		//是还存在modal正在显示
		var hasModal = false;
		Array.from(document.querySelectorAll('.ui-modal')).forEach(function(el,i){
			if(el.style.display != 'none') { hasModal=true; return false; }
		})
		if(!hasModal){
			document.body.classList.remove('ui-modal-open');
			document.body.style.paddingRight=this.ORIGINAL_BODY_PAD;
		}

		return this;

	}

	Modal.prototype.html=function(str){
		var str = str || '';
		this.el.innerHTML=str;
	}

	window.UI.Modal=Modal;
}();



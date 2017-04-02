

var UI = UI || {};

!function(){

	window.onload=function(){

		UI.ORIGINAL_BODY_OFX = document.body.style.overflowX || '';
		UI.ORIGINAL_BODY_OFY = document.body.style.overflowY || '';
		UI.ORIGINAL_BODY_PAD = document.body.style.paddingRight || '';

		//计算滚动条宽度
		UI.SCROLLBAR_WIDTH=function () {
		    var div = document.createElement('div');
		    div.style.cssText = 'position: absolute;top: -9999px;width: 50px;height: 50px;overflow: scroll;'
		    document.body.appendChild(div);
		    var width = div.offsetWidth - div.clientWidth
		    document.body.removeChild(div)
		    return width ;
		}();

	}
	
	var Modal=function(options){
		
		this.opt=Object.assign({
			background:'rgba(0,0,0,0)',
			zIndex:10000,			
			callback:function(){},	//回调函数
			closeMethod:false		//点击遮罩层关闭 true / false
		},options)

		this.el=null;
		this.callback = this.opt.callback;

		this.style={
			'position':'fixed',
			'top':0,
			'left':0,
			'right':0,
			'bottom':0,
			'overflow':'auto',
			'zIndex':this.opt.zIndex,
			'background':this.opt.background
		}
		

	}

	Modal.prototype.show=function(obj){

		var _this=this;

		if(this.el) return false;

		//判断浏览器是否存在滚动条，修正偏移量
		
		if( document.body.querySelectorAll('ui-modal-open').length == 0 ){
			
		    //判断浏览器是否存在滚动条，修正偏移量
			if(document.body.clientWidth<window.innerWidth){
				var bodyPad = parseInt(getComputedStyle(document.body)['paddingRight'] || 0);
				document.body.style.paddingRight=bodyPad + UI.SCROLLBAR_WIDTH + 'px';
	    	}

	    	document.body.style.overflowX = 'hidden';
	    	document.body.style.overflowY = 'hidden';

		}

		this.el=document.createElement('div');
		this.el.className="ui-modal";
		for(var s in this.style){
			this.el.style[s]=this.style[s];
		}
		document.body.appendChild(this.el);

		//判断关闭方式，设置透明层可点击关闭modal
		if( this.opt.closeMethod ){
			this.el.addEventListener('click',function(e){
				e.stopPropagation();
				e.target === this && _this.hide();
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
			document.body.style.overflowX = UI.ORIGINAL_BODY_OFX;
			document.body.style.overflowY = UI.ORIGINAL_BODY_OFY;
			document.body.style.paddingRight = UI.ORIGINAL_BODY_PAD;
		}

		return this;

	}

	Modal.prototype.html=function(str){
		var str = str || '';
		this.el.innerHTML=str;
	}

	window.UI.Modal=Modal;
}();

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    } else {
        window["UIModal"] = factory();
    }
})(function() {
    /**
     * modal 模态框
     * @param {Object} opt 参数
     */
    var Modal = function(opt) {
        opt = opt || {};
        this.el = null;
        this.onshow = opt.onshow || function() {};
        this.onshown = opt.onshown || function() {};
        this.onhide = opt.onhide || function() {};
        this.onhidden = opt.onhidden || function() {};
        this.style = {
            'position': 'fixed',
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
            'overflow': 'auto',
            'zIndex': opt.zIndex || 1000,
            'background': opt.background || 'rgba(0,0,0,0)'
        }
        this.backClose = opt.backClose || false;
    }
    Modal.prototype = {
        /**
         * 打开modal 创建modal所需的dom，并依次执行 onshow 和 onshown
         * @param  {String | Object} arg 传递给 onshow 和 onshown
         */
        open: function() {
            if (this.el) return;
            if (this.onshow.apply(this,arguments) === false) return;
            this._setBodyScroll();
            this.el = document.createElement('div');
            this.el.className = "ui-modal";
            for (var s in this.style) {
                this.el.style[s] = this.style[s];
            }
            document.body.appendChild(this.el);
            //判断关闭方式，设置透明层可点击关闭modal
            if (this.backClose) {
                var _this = this;
                this.el.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.target === this && _this.close();
                })
            }
            return this.onshown.apply(this,arguments);
        },
        /**
         * 关闭modal，并将modal的dom元素
         * @param  {String | Object} arg 传递给onhide 和 onhidden
         */
        close: function(arg) {
            if (!this.el) return;
            if (this.onhide.apply(this,arg) === false) return;
            this.el.remove();
            this.el = null;
            //判断是否需要重置body scroll
            var hasModalDisplay = false;
            [].slice.call(document.querySelectorAll('.ui-modal'), function(el, i) {
                if (getComputedStyle(el).display != 'none') {
                    hasModalDisplay = true;
                    return false;
                }
            });
            if (!hasModalDisplay) this._resetBodyScroll();
            return this.onhidden.apply(this,arg);
        },
        /**
         * 如果body存在滚动条，将其隐藏，并修正偏移量
         */
        _setBodyScroll: function() {
            var body = document.body;
            var bodyMargin = parseInt(getComputedStyle(document.body)['marginRight'] || 0) + parseInt(getComputedStyle(document.body)['marginLeft'] || 0);
            if (body.classList.value.indexOf('ui-modal-open') == -1 && body.clientWidth + bodyMargin < window.innerWidth) {
                var data = body.getAttribute('data-scrollInfo');
                var bodyPad = parseInt(getComputedStyle(document.body)['paddingRight'] || 0);
                var originalBodyPad, scrollBarWidth;
                if (!data) {
                    //插入ui-modal-open的css样式
                    var style = document.createElement('style');
                    style.type = "text/css";
                    style.appendChild(document.createTextNode('.ui-modal-open{overflow:hidden;}'));
                    document.querySelector('head').appendChild(style);
                    //计算body的原始padding-right
                    originalBodyPad = body.style.paddingRight || '';
                    //计算滚动条宽度
                    scrollBarWidth = function() {
                        var div = document.createElement('div');
                        div.style.cssText = 'position: absolute;top: -9999px;margin: 0;padding: 0;width: 50px;height: 50px;overflow: scroll;'
                        document.body.appendChild(div);
                        var width = div.offsetWidth - div.clientWidth;
                        document.body.removeChild(div)
                        return width;
                    }();
                    //在body标签上，记录originalBodyPad 和 scrollBarWidth 到 'data-scrollInfo'
                    body.setAttribute('data-scrollInfo', originalBodyPad + ',' + scrollBarWidth);
                } else {
                    scrollBarWidth = parseInt(data.split(',')[1]);
                }
                body.classList.add('ui-modal-open');
                body.style.paddingRight = bodyPad + scrollBarWidth + 'px';
            }
        },
        /**
         * 如果body滚动条被隐藏，将其显示，并修正偏移量
         */
        _resetBodyScroll: function() {
            var body = document.body;
            if (body.classList.value.indexOf('ui-modal-open') != -1) {
                var data = body.getAttribute('data-scrollInfo').split(',');
                body.classList.remove('ui-modal-open');
                body.style.paddingRight = data[0];
            }
        }
    }
    var UIModal = function(cb, opt) {
        return new Modal(cb, opt)
    }
    UIModal.setBodyScroll = Modal.prototype._setBodyScroll;
    UIModal.resetBodyScroll = Modal.prototype._resetBodyScroll;
    return UIModal;
});
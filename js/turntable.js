/**
 * 转盘抽奖
 */
(function (undefined){
  var _global
  function V_turntable (opts) {
    this.element = document.getElementById(opts.element); //转盘奖品图片容器
    this.point = document.getElementById(opts.point); //转盘指针容器
    this.prize = opts.prize; //奖品数据,js数组
    this.rotate = 360/opts.prize.length; //奖品数组长度
    this.disabled = false; //用来阻止转盘未完成之前的多次点击
    this.listeners = [];
    this.handlers = {};
    this.init();
  }

  V_turntable.prototype = {
    init: function () {
      /**
       * 初始化
       */
      this.point.addEventListener('click', function (event) {
        if(this.disabled) return;
        this.turn(event)
      }.bind(this))
    },
    turn: function (event) {
      /**
       * 转圈
       */
      this.disabled = true;
      this.element.classList.remove('lottery-sector-pointer-stop')
      this.element.classList.add('lottery-sector-pointer-start')

      setTimeout(function(){
        //获奖回调
        var number = Math.floor(Math.random() * 5 + 1 )
        this.element.classList.remove('lottery-sector-pointer-start')
        setTimeout(function () {
          this.disabled = false;
          this.emit({type:'confirm', target:event, data:this.prize[number]});
        }.bind(this), 2000)

        //设置获奖结果
        var rotate = (number*this.rotate) +720
        var style = document.createElement('style');
        style.type = 'text/css';
        var pre_keyframes = preTransform('keyframes')
        var pre_transform = preTransform('transform')
        var keyFrames = '\
        @'+pre_keyframes+' pointer_stop {\
            0% {\
                '+pre_transform+': rotate(0deg);\
            }\
            100% {\
                '+pre_transform+': rotate(A_DYNAMIC_VALUE);\
            }\
        }';
        style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, rotate+"deg");
        document.getElementsByTagName('head')[0].appendChild(style);
        this.element.classList.add('lottery-sector-pointer-stop')
      }.bind(this), 2000);
    },
    on: function (type, handler) {
      // type: init, confirm
      if (typeof this.handlers[type] === 'undefined') {
        this.handlers[type] = [];
      }
      this.listeners.push(type);
      this.handlers[type].push(handler);
      return this;
    },
    emit: function (event) {
      if (!event.target) {
        event.target = this;
      }
      if (this.handlers[event.type] instanceof Array) {
        var handlers = this.handlers[event.type];
        for (var i = 0, len = handlers.length; i < len; i++) {
          handlers[i](event);
          return true;
        }
      }
      return false;
    }
  };

  _global = (function () {
    return this || (0, eval)('this');
  }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = V_turntable;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return V_turntable;
    });
  } else {
    !('V_turntable' in _global) && (_global.V_turntable = V_turntable);
  }
})();
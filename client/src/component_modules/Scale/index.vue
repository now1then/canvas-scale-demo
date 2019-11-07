<template>
  <div class="scale-canvas">
    <p class="borrow-title" >刻度值</p>
    <div class="borrow-num">
      <span class="theme-num curval" @click="changeNum">
        {{ borrow_num }}
        <i class="iconfont icon-contract"></i>
      </span>
    </div>
    <div class="canvas-body" id="newScale">
    </div>
  </div>
</template>

<script type="text/babel">
/* eslint-disable */
/**
 * Scale 刻度尺组件
 * @props 参数 value: 当前刻度值，使用v-model绑定。
 * @props 参数 scaleConfig: 刻度尺配置
 */
import { Toast } from 'mint-ui';
import newScale from 'canvas-scale';

export default {
  name: 'Scale',
  components: {},
  props: {
    scaleConfig: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      borrow_num: this.value,
      tempValue: this.scaleConfig,
      showBox1: false,
      inputNum: ''
    };
  },
  watch: {
    scaleConfig: {
      handler: function(val, oldVal) {
        this.new.resize(val)
      },
      deep: true
    },
    value(newValue) {
      if (newValue == this.borrow_num) {
        return;
      }
      this.borrow_num = newValue;
    },
    borrow_num(newValue) {
      if (newValue == this.value) {
        return;
      }

      this.$emit('input', newValue);
    }
  },
  mounted() {
    console.log(newScale);
    this.new = newScale.init('#newScale', {start: 0, end: 20000 }, (data) => {
      console.log('vue的值', data);
      this.borrow_num = data;
    });
    window.addEventListener('resize', () => {
      console.log('resize');
      this.new.resize();
    })
  },
  methods: {
    remove() {
      this.new.clear();
    },
    dataChange(data) {
      // console.log('123232132', data);
      this.borrow_num = data;
    },
    changefocus() {
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      if (isAndroid) {
        setTimeout(function() {
          document.activeElement.scrollIntoViewIfNeeded();
          document.activeElement.scrollIntoView();
        }, 500);
      }
    },
    changeBlur() {
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 200);
      }
    },
    changeNum() {
      this.inputNum = this.borrow_num;
      this.showBox1 = true;
    },
    confirmBg() {
      const num = Number(this.inputNum);
      if (!this.inputNum || isNaN(this.inputNum)) {
        Toast('请输入有效数字！');
        return;
      }
      if (num < this.scaleConfig.start || num > this.scaleConfig.end) {
        Toast(
          `请输入不小于${this.scaleConfig.start}，且不大于${this.scaleConfig.end}的数字！`
        );
        return;
      }
      this.$emit('input', Math.round(num));
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
.scale-canvas {
  .borrow-title {
    font-family: PingFangSC-Light;
    font-size: 16px;
    color: #bdbdbd;
    line-height: 16px;
    padding: 40px 10px 10px;
    text-align: center;
  }

  .borrow-num {
    font-family: DINAlternate-Bold;
    font-size: 48px;
    text-align: center;
    line-height: 48px;
    height: 48px;
    margin-bottom: 10px;
  }
  .curval {
    display: inline-block;
    min-width: 40px;
    min-height: 48px;
  }
  .theme-num {
    position: relative;
    color: #087af7;
    // background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#a4e6a4), to(#087af7));
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-image: linear-gradient(90deg, #ccc 0, #ccc 50%, transparent 0);
      background-size: 6px 1px;
      background-repeat: repeat-x;
    }
    //border-bottom: 1px dotted #BDBDBD;
  }
  .canvas-body {
    // width: 311.5px;
    margin: 0 5px;
    overflow: hidden;
    margin-bottom: 20px;
    // box-shadow: 0px 0 4px 0px #d6d0d0 inset;
    // border-radius: 4px;
    // padding-top: 4px;
  }

  .icon-contract {
    position: absolute;
    top: -10px;
    right: -24px;
    vertical-align: text-top;
    font-size: 20px;
    padding: 0;
  }
}
.scale-message-box {
  .confirm {
    top: 25%;
  }
  .borrow-num-input {
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 3px 10px;
    display: inline-block;
    box-sizing: border-box;
    margin: 0 5px;
  }
}

.new-new {
  overflow: hidden;
  // height: 50px;
  // border: 1px solid yellow;
  #canvas, #canvas_1 {
    width: 100%;
    // height: 100%;
  }
}
</style>

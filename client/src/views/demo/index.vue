<template>
  <section class="page-demo">
    <Header  showRight fixed @handle-left="goBack"></Header>
    <div class="page-content header-fixed">
      <h1 style="text-align:center;">刻度组件</h1>
      <div class="borrow-body">
        <Scale :scale-config="scaleConfig" v-model="scaleValue"></Scale>
      </div>
      <!-- <MainButton /> -->
    </div>
  </section>
</template>

<script>
import { formatDate } from '@/utils/cloud-utils';
import MainButton from '@/component_basics/MainButton';
import Header from '@/component_basics/Header';
import Scale from '@/component_modules/Scale';
import transferDom from '@/directives/transferDom';

export default {
  name: 'page-demo',
  components: { // 组件
    MainButton,
    Header,
    Scale,
  },
  directives: {
    // 指令
    transferDom
  },
  filters: {
    // 过滤器
    formatDate
  },
  data() {
    return {
      scaleValue: null,
      scaleConfig: {
        start: 2000,
        end: 50000,
        capacity: 100,
        linecolor: '#087af7',
        openUnitChange: false,
      },
    };
  },
  methods: {
    goBack() {
      // window.history.length > 1
      //   ? this.$router.go(-1)
      //   : this.$router.push('/')
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
.page-demo {
  text-align: left;
  .common-btns {
    position: fixed;
    bottom: 0;
  }
}
</style>

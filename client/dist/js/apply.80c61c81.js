(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["apply"],{"12f0":function(t,e,i){},"51f5":function(t,e,i){"use strict";var s=i("12f0"),n=i.n(s);n.a},5621:function(t,e,i){"use strict";var s=i("5663"),n=i.n(s);n.a},5663:function(t,e,i){},c5b8:function(t,e,i){},f2e1:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"page-hello"},[i("div",{staticClass:"page-content"},[i("div",{staticClass:"msg-area common-msg-area"},[i("p",{staticClass:"msg-title",domProps:{textContent:t._s(t.msg)}}),i("div",{staticClass:"user-img"}),t._m(0),i("p",{staticClass:"user-desc"},[t._v("欢迎访问本项目，本项目是基于@Vue/CLI3构建的移动端h5项目模板，内容持续完善...")]),i("p",[t._v("你的支持是我前进最大的推力！")]),t._m(1),i("h2",{staticClass:"time-area"},[t._v("\n        现在时间是：\n        "),i("show-time")],1)]),i("div",{staticClass:"common-msg-area urls-area"},[i("h3",{staticClass:"title"},[t._v("项目页面链接：")]),i("ul",{staticClass:"list-ul"},[t._l(t.routerList,(function(e){return[e.name?i("li",{key:e.name,staticClass:"list-li"},[i("router-link",{staticClass:"url-link",attrs:{to:e.path}},[t._v(t._s(e.meta&&e.meta.title||e.name))])],1):t._e()]}))],2)]),i("p",[t._v("点击后tip提示")]),i("main-button",{attrs:{"btn-text":"确定","btn-disabled":!1},on:{"handle-click":t.handleNext}})],1),i("base-tip",{attrs:{text:t.tip.text,type:t.tip.type},model:{value:t.tip.show,callback:function(e){t.$set(t.tip,"show",e)},expression:"tip.show"}})],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h3",{staticClass:"app-name"},[t._v("\n        vue-h5-pro\n        "),i("i",{staticClass:"iconfont iconRN-recommend"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"icons-link"},[i("a",{attrs:{href:""}},[i("i",{staticClass:"iconfont iconRN-edit"})]),i("a",{attrs:{href:"https://www.yuque.com/nowthen/longroad"}},[i("i",{staticClass:"iconfont iconRN-yuque"})]),i("a",{attrs:{href:"https://github.com/now1then/vue-h5-pro"}},[i("i",{staticClass:"iconfont iconRN-git"})]),i("a",{attrs:{href:"https://juejin.im/user/5a323f2851882552e652b7ef/posts"}},[i("i",{staticClass:"iconfont iconRN-juejin"})])])}],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"module-show-time"},[i("span",[t._v(t._s(t.timeArr[0]))]),i("span",{class:["time-str",{test1:0==t.timeArr[2]}]},[t._v(t._s(t.timeArr[1]))]),i("span",{class:["time-str",{test1:0==t.timeArr[3]}]},[t._v(t._s(t.timeArr[2]))]),t._v(":\n  "),i("span",{class:["time-str",{test1:0==t.timeArr[4]}]},[t._v(t._s(t.timeArr[3]))]),i("span",{class:["time-str",{test1:0==t.timeArr[5]}]},[t._v(t._s(t.timeArr[4]))]),t._v(":\n  "),i("span",{class:["time-str",{test1:0==t.timeArr[6]}]},[t._v(t._s(t.timeArr[5]))]),i("span",{staticClass:"time-str test"},[t._v(t._s(t.timeArr[6]))])])},r=[],o=i("a16a"),c={data:function(){return{interval_timer:null,time:Object(o["a"])(Date.now(),"yyyy年MM月dd日 hh:mm:ss")}},computed:{timeArr:function(){var t=[];return t[0]=this.time.slice(0,12),t[1]=this.time.slice(12,13),t[2]=this.time.slice(13,14),t[3]=this.time.slice(15,16),t[4]=this.time.slice(16,17),t[5]=this.time.slice(18,19),t[6]=this.time.slice(19,20),t}},created:function(){this.init()},beforeDestroy:function(){this.interval_timer&&clearInterval(this.interval_timer)},methods:{init:function(){var t=this;this.interval_timer=setInterval((function(){t.time=Object(o["a"])(Date.now(),"yyyy年MM月dd日 hh:mm:ss")}),1e3)}}},l=c,u=(i("5621"),i("2877")),m=Object(u["a"])(l,a,r,!1,null,"6f79c009",null),h=m.exports,p=i("f76b"),f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"tip-"+t.position}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],staticClass:"rn-tip",class:"rn-tip-"+t.position,on:{click:function(e){return t.hide(!0)}}},[t._t("default",[i("div",{staticClass:"default-tip-title",class:"default-tip-"+t.type},[i("span",{staticClass:"default-text"},[t._v(t._s(t.text))])])])],2)])},v=[],d=(i("c5f6"),{props:{value:{type:Boolean,default:!1},text:{type:String,default:"这是提示"},delay:{type:Number,default:2e3},position:{type:String,default:"top",validator:function(t){return"top"===t||"bottom"===t}},type:{type:String,default:"info"}},data:function(){return{showTip:!1,timer:null}},watch:{value:function(t){var e=this;t&&(clearTimeout(this.timer),this.timer=setTimeout((function(){e.hide(!1)}),this.delay))}},methods:{show:function(){var t=this;this.$emit("input",!0),clearTimeout(this.timer),this.timer=setTimeout((function(){t.hide(!1)}),this.delay)},hide:function(t){this.$emit("input",!1),this.$emit("on-hide",t)}},beforeDestroy:function(){clearTimeout(this.timer)}}),_=d,y=(i("51f5"),Object(u["a"])(_,f,v,!1,null,"ba0aeb26",null)),w=y.exports,b={name:"page-hello",components:{ShowTime:h,MainButton:p["a"],BaseTip:w},data:function(){return{tip:{show:!1,text:"欢迎多多点击！",type:"success"},msg:"欢迎访问!",start:!1,routerList:[],interval_timer:null}},created:function(){var t=this;this.routerList=this.$router.options.routes.filter((function(e){return e.path!==t.$route.path}))},methods:{handleNext:function(){var t=[{type:"info",text:"欢迎多多点击！"},{type:"success",text:"恭喜点击成功了！"},{type:"warning",text:"警告，警告..."},{type:"error",text:"错误提示：点击次数超限！"}],e=Math.floor(4*Math.random());this.tip.show=!0,this.tip.text=t[e].text,this.tip.type=t[e].type}}},C=b,x=(i("f8eb"),Object(u["a"])(C,s,n,!1,null,null,null));e["default"]=x.exports},f8eb:function(t,e,i){"use strict";var s=i("c5b8"),n=i.n(s);n.a}}]);
//# sourceMappingURL=apply.80c61c81.js.map
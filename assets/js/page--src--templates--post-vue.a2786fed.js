(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{SHZv:function(t,e,n){"use strict";n.r(e);n("tLAo");var s=n("XJYT"),o={metaInfo(){return{title:this.$page.post.title}},data(){return{loadingInstance:null}},created(){this.loadingInstance=s.Loading.service({fullscreen:!0,text:"文章加载中..."})},mounted(){this.getContent(),this.$nextTick(()=>{this.loadingInstance.close()})},methods:{getContent(){var t=document.querySelector(".a-post-content"),e=this.$page.post["content"];t.innerHTML=e}},render(){var t=arguments[0],{title:e,date:n}=this.$page.post;return t("HomepageLayout",[t("div",{class:"a-post"},[t("div",{class:"a-post-title"},[t("h2",{class:"a-post-title-title"},[e]),t("p",{class:"a-post-title-date"},[n])]),t("div",{class:"a-post-content"})])])}},n=n("KHd+"),n=Object(n.a)(o,void 0,void 0,!1,null,null,null);e.default=n.exports},tLAo:function(t,e,n){}}]);
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img{border: none}
a:link{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{text-decoration:none;}
a:active{text-decoration:none;}
input:focus{outline: none;}
body,h2,h3,h4,ul,li,input,p{margin: 0;padding:0;}
body::-webkit-scrollbar-thumb{background: #324157;width: 3px}
body::-webkit-scrollbar-track{background: #ccc;width: 3px}
body::-webkit-scrollbar{width: 5px}
#app::-webkit-scrollbar-thumb{background: #324157;width: 3px}
#app::-webkit-scrollbar-track{background: #ccc;width: 3px}
#app::-webkit-scrollbar{width: 5px}

html::-webkit-scrollbar-thumb{background: #324157;width: 3px}
html::-webkit-scrollbar-track{background: #ccc;width: 3px}
html::-webkit-scrollbar{width: 5px}

.tabletopbar{height:40px;background:#eef1f6;border-left:1px solid #dfe6ec;border-right:1px solid #dfe6ec;border-top:1px solid #dfe6ec;line-height:40px;font-size:12px;color:#555;padding:0px 15px;}
body{

-moz-user-select: none; /*火狐*/

-webkit-user-select: none; /*webkit浏览器*/

-ms-user-select: none; /*IE10*/

-khtml-user-select: none; /*早期浏览器*/

user-select: none;

}
</style>

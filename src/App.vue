<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" />
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" />
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {

			}
		},
		mounted(){
      
    },
		methods: {
      
    },
    
	}
</script>

<style lang="scss">
	html, body{
		-webkit-tap-highlight-color:#fff;
		-webkit-user-select:auto;
		-webkit-touch-callout:none;
		-webkit-text-size-adjust:100%;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
	}
  /* 清除内外边距 */
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
  dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
  pre, /* text formatting elements 文本格式元素 */
  fieldset, lengend, button, input, textarea, /* form elements 表单元素 */
  th, td, img { /* table elements 表格元素 */
      margin: 0;
      padding: 0;
  }
  /* 重置列表元素 */
  ul, ol { list-style: none; }
  /* 重置文本格式元素 */
  a { text-decoration: none; outline: none;}
  a:hover{text-decoration: none;}
  input[type=checkbox], input[type=radio]{cursor: pointer;}
  button{cursor: pointer;}
  textarea{resize: none;}
  address,caption,i,cite,code,dfn,em,th,del,ins,mark,sup,sub,var{
    font-style:normal;
    font-weight:400;
    text-decoration:none;
    background:none;
  }
  div,li,p,menu,button{-webkit-tap-highlight-color:transparent;}

  fieldset,img{
		border:0;
		vertical-align:middle;
	}
  input{word-break:normal;}
  input,select{-webkit-user-select:auto;}
  html, body{
    font-family: Microsoft YaHei;
    height: 100%;
    overflow: auto;
  }
  #app{
    height: 100%;
    overflow: auto;
  }
  input{
    padding: 0 15px;
    box-sizing: border-box;
  }
  textarea{
    padding: 15px;
    box-sizing: border-box;
  }
</style>

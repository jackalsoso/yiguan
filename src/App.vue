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
      // 安卓调用h5获取token,member_id
      window.callJsFunction = this.callJsFunction;
    },
		methods: {
      callJsFunction(memberId,token){
        let userInfo = {
          member_id: memberId,
          token: token
        }
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
      }
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
  .back-fixed{
    height: 50px;
    margin-bottom: 15px;
    .back-top{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #E5E5E5;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      .back{
        width: 14px;
        height: 14px;
        position: absolute;
        top: 20px;
        left: 15px;
        z-index: 10000000;
      }
      .tit{
        font-size: 16px;
        color: #333;
      }
    }
  }
  
  .content{
    .back{
      width: 14px;
      height: 14px;
      position: absolute;
      top: 20px;
      left: 15px;
      z-index: 10000000;
    }
    .pop{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.4);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      .pop-cont{
        width: 290px;
        height: 240px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .wirte{
          width: 100%;
          height: 189px;
          background: url(./static/img/pop-bg.png) center / cover no-repeat;
          padding: 15px 35px;
          border-radius: 5px;
          box-sizing: border-box;
          .tit-img{
            width: 100%;
            margin-bottom: 15px;
          }
          .input{
            width: 100%;
            height: 24px;
            background:#fff;
            box-shadow: 0px 3px 6px rgba(209,226,255,1);
            border-radius:12px;
            margin-bottom: 10px;
            input{
              width: 100%;
              height: 100%;
              background: none;
              border: none;
              font-size: 12px;
              color: #333;
            }
            input::placeholder{
              color: #E5E5E5;
            }
          }
          .code{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            input{
              width: 118px;
              height: 24px;
              background:#fff;
              box-shadow: 0px 3px 6px rgba(209,226,255,1);
              border-radius:12px;
              border: none;
              font-size: 12px;
              color: #333;
            }
            input::placeholder{
              color: #E5E5E5;
            }
            span{
              width:92px;
              height:24px;
              background:linear-gradient(180deg,rgba(255,145,132,1) 0%,rgba(255,59,36,1) 100%);
              box-shadow:0px 3px 6px rgba(209,226,255,1);
              border-radius:12px;
              font-size: 12px;
              color: #fff;
              line-height: 24px;
              text-align: center;
            }
          }
          .apply-button{
            width:220px;
            height:28px;
            background:rgba(105,158,246,1);
            box-shadow:0px 3px 6px rgba(209,226,255,1);
            border-radius:12px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 28px;
          }
        }
        .close{
          display: block;
          width: 30px;
          height: 30px;
          margin: 20px auto 0;
        }
      }
    }
  }
</style>

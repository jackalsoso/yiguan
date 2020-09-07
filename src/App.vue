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
		mounted() {
      let params = JSON.stringify(['8cb71cee69ab0c840d3efcafdbeefa0f', true])
      this.$http.login(params).then(res => {
				debugger
        console.log(res)
      })
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
  // van样式修改
  // .van-picker__columns{
  //   height: 264px !important;
  // }
  // .van-picker-column__item{
  //   height: 44px !important;
  // }
  // .van-picker__mask{
  //   background-size: 100% 110px !important;
  // }
  // .van-picker__frame{
  //   height: 44px !important;
  // }
  .content{
    .search-warp{
      height: 70px;
      .search{
        width: 100%;
        height: auto;
        padding: 20px 15px;
        box-sizing: border-box;
        background-color: #fff;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        .back{
          width: 10px;
          height: 17px;
          margin-right: 30px;
        }
        .input{
          width:262px;
          height:28px;
          border:1px solid rgba(61,66,73,1);
          border-radius:14px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          padding: 0 12px;
          img{
            width: 13px;
            height: 12px;
          }
          input{
            width: 230px;
            height: 100%;
            border: none;
            background: none;
            border-radius:14px;
            font-size: 12px;
            color: #CBD2D9;
          }
        }
      }
    }
    .addPop{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.6);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      .bottom{
        width: 360px;
        height: auto;
        position: fixed;
        left: 50%;
        bottom: 45px;
        transform: translate(-50%,0);
        transform: translate(-50%,200%);
        transition: all .5s;
        .options{
          border-radius: 14px;
          background-color: #fff;
          margin-bottom: 10px;
          span{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px 0;
            border-bottom: 1px solid #DEDEDE;
            font-size: 16px;
            color: #000;
            &:last-child{
              border-bottom: none;
            }
            i{
              width: 110px;
            }
            .icon{
              width: 15px;
              height: 15px;
            }
          }
        }
      }
      &.active{
        .bottom{
          transform: translate(-50%,0);
        }
      }
      .button{
        border-radius: 14px;
        background-color: #fff;
        display: flex;
        align-items: center;
        .cancel{
          width: 100%;
          padding: 15px 0;
          font-size: 16px;
          color: #007AFF;
          text-align: center;
        }
        .cf{
          width: 50%;
          padding: 15px 0;
          font-size: 16px;
          color: #007AFF;
          text-align: center;
          &:first-child{
            border-right: 1px solid #DEDEDE;
          }
        }
      }
    }
    .edit{
      padding-bottom: 100px;
      .img{
        padding: 15px 0;
        border-bottom: 1px solid #DEDEDE;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 128px;
          height: 172px;
        }
      }
      .options-wrap{
        padding: 0 15px;
        .options{
          padding: 24px 0 12px;
          border-bottom: 1px solid #DEDEDE;
          display: flex;
          align-items: center;
          .tit{
            width: 85px;
            font-size: 14px;
            color: #999;
          }
          .make{
            width: 254px;
            display: flex;
            align-items: center;
            position: relative;
            .upload-file{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              /deep/ .van-uploader__upload{
                width: 254px;
                height: 20px;
              }
            }
            input{
              width: 100%;
              border: none;
              background: none;
              font-size: 14px;
              color: #000;
              padding: 0;
            }
            span{
              font-size: 14px;
              color: #000;
              margin-right: 12px;
            }
            .img1{
              width: 7px;
              height: 7px;
            }
            .img2{
              width: 16px;
              height: 16px;
              margin-right: 12px;
            }
            i{
              color: #999;
              font-size: 11px;
            }
          }
        }
      }
    }
  }
</style>

import { face_collect } from './face'
const faceUrl = "https://imgcache.qq.com/open/qcloud/tim/assets/emoji/";

//表情包解析
const face_text = (payload) => {
  let renderDom = []
  // 文本消息
  let temp = payload
  let left = -1
  let right = -1
  while (temp !== '') {
    left = temp.indexOf('[')
    right = temp.indexOf(']')
    switch (left) {
      case 0:
        if (right === -1) {
          renderDom.push({
            name: 'text',
            text: temp
          })
          temp = ''
        } else {
          let _emoji = temp.slice(0, right + 1)
          if (face_collect[_emoji]) {    // 如果您需要渲染表情包，需要进行匹配您对应[呲牙]的表情包地址
            renderDom.push({
              name: 'img',
              src: faceUrl + face_collect[_emoji]
            })
            temp = temp.substring(right + 1)
          } else {
            renderDom.push({
              name: 'text',
              text: '['
            })
            temp = temp.slice(1)
          }
        }
        break
      case -1:
        renderDom.push({
          name: 'text',
          text: temp
        })
        temp = ''
        break
      default:
        renderDom.push({
          name: 'text',
          text: temp.slice(0, left)
        })
        temp = temp.substring(left)
        break
      }
    }
  return renderDom
}

export default face_text;
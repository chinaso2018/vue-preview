/**
 * @Author: zhouyuying
 * @Date:   1985-10-26 16:15:00
 * @Last Modified by:   zhouyuying
 * @Last Modified time: 2021-09-10 14:29:06
 */
import photoSwipeCss from './photoSwipe/js/photoSwipe_css.js'
import PhotoSwipe from './photoSwipe/js/photoSwipe.js'
import utils from './utils/index.js'

function installCss() {
  const style = document.createElement('style')
  style.innerText = photoSwipeCss
  document.body.appendChild(style)
}

function createPswpElm(disableDownload) {
  installCss()
  const elm = document.createElement('div')
  const extendClassName = disableDownload ? 'disableDownload' : ''
  elm.innerHTML = `
       <div class="pswp ${extendClassName}" tabindex="-1" role="dialog" aria-hidden="true">
           <div class="pswp__bg"></div>
           <div class="pswp__scroll-wrap">
               <div class="pswp__container">
                   <div class="pswp__item"></div>
                   <div class="pswp__item"></div>
                   <div class="pswp__item"></div>
               </div>
               <div class="pswp_extends_close"></div>
           </div>
       </div>
     `
  return elm.firstElementChild
}

// init
let _pswpElm
class VuePhotoSwipe {
  constructor(clickElm, comOptions, options, useCapture, disableDownload) {
    this.clickElm = clickElm
    this.swipeAttr = comOptions.swipeAttr
    this.realAddress = comOptions.realAddress
    this.options = options
    this.pswpElm = _pswpElm || createPswpElm(disableDownload)
    this.useCapture = useCapture
    this.disableDownload = disableDownload
    this.init()
  }

  init() {
    this.clickFnBind = this.clickFn.bind(this)
    this.closeFnbind = this.closeFn.bind(this)
    utils.on(this.clickElm, 'click', this.clickFnBind, this.useCapture)
  }
  closeFn(event) {
    let target = event.target
    if (target.className != 'pswp_extends_close') {
      return
    }
    this.gallery && this.gallery.close()
  }
  clickFn(event) {
    let target = event.target
    //TODO:优化
    if (this.useCapture) {
      target = target.firstChild
    }
    if (!utils.isComplianceImg(target, this.swipeAttr)) {
      return
    }

    const selector = 'img' + (this.swipeAttr && `[${this.swipeAttr}]`)
    const imgs = this.clickElm.querySelectorAll(selector)

    const items = utils.getImgItems(imgs, this.realAddress)
    const index = utils.getTagetImgIndex(imgs, target)

    utils.extend(this.options, {
      index: index,
      getThumbBoundsFn: function (index) {
        const windowH = window.innerHeight
        const img = imgs[index]
        const pageYScroll =
          window.pageYOffset || document.documentElement.scrollTop
        const rect = img.getBoundingClientRect()

        const rectTop = rect.top,
          imgH = rect.height
        const y =
          rectTop + imgH < 0
            ? pageYScroll - imgH
            : rectTop > windowH
            ? pageYScroll + windowH
            : rectTop + pageYScroll
        return {
          x: rect.left,
          w: rect.width,
          y: y,
        }
      },
    })

    setTimeout((_) => {
      this.gallery = new PhotoSwipe(this.pswpElm, null, items, this.options)
      this.gallery.init()
      this.pswpElm
        .querySelector('.pswp_extends_close')
        .addEventListener('click', this.closeFnbind)
    })
  }

  unbind() {
    utils.off(this.clickElm, 'click', this.clickFnBind, this.useCapture)
  }
}

//vue install
function install(Vue, options = {}) {
  Vue.component('picturesPreview', {
    props: {
      swipeAttr: {
        type: String,
        default: '',
      },
      realAddress: {
        type: String,
        default: 'large',
      },
      useCapture: {
        type: Boolean,
        default: false,
      },
      disableDownload: {
        type: Boolean,
        default: false,
      },
      previewOptions: {
        type: Object,
        default() {
          return {}
        },
      },
    },

    render(h) {
      this.imgWrapNode = this.$slots.default && this.$slots.default[0]
      return this.imgWrapNode
    },

    mounted() {
      this.init()
    },

    updated() {
      if (this.imgWrapNode && this.imgWrapNode.elm !== this.curImgWrapElm) {
        this.unbind()
        this.init()
      }
    },

    destroyed() {
      this.unbind()
    },

    methods: {
      init() {
        if (this.imgWrapNode && this.imgWrapNode.elm) {
          utils.extend(options, this.previewOptions)
          this.curImgWrapElm = this.imgWrapNode.elm
          this.vuePhoto = new VuePhotoSwipe(
            this.curImgWrapElm,
            {
              swipeAttr: this.swipeAttr,
              realAddress: this.realAddress,
            },
            options,
            this.useCapture,
            this.disableDownload
          )
        }
      },
      unbind() {
        this.vuePhoto && this.vuePhoto.unbind()
      },
    },
  })
}

export default install

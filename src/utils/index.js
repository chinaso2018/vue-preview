
const img = document.createElement('img')

const supportNaturalWidth = img.naturalWidth !== undefined && img.naturalWidth !== null
const _hasOwn = Object.prototype.hasOwnProperty



const utils = {
  on (elm, eventName, fn) {
    elm.addEventListener(eventName, fn, false)
  },

  off (elm, eventName, fn) {
    elm.removeEventListener(eventName, fn, false)
  },

  getAttr (elm, attr) {
    return elm.getAttribute(attr)
  },

  hasAttr (elm, attr) {
    return elm.hasAttribute && elm.hasAttribute(attr)
  },

  hasOwn (prototype, key) {
    return _hasOwn.call(prototype, key)
  },  

  getTagetImgIndex (imgs, targetImg) {
    let idx = 0
    imgs = Array.prototype.slice.apply(imgs)
    imgs.forEach((img, index) => {
      if (img === targetImg) {
        idx = index
      }
    })

    return idx
  },

  getImgItems (imgs, realAddress) {
    imgs = Array.prototype.slice.apply(imgs)
    return imgs.map((img) => {
        return this.getImgInfos(img, realAddress)
    })
  },

  getImgWH (img) {
    let result
    if (supportNaturalWidth) {
      result = {
        w: img.naturalWidth,
        h: img.naturalHeight
      }
    } else {
      const csstext = img.style.cssText
      
      img.style.cssText= 'width:auto !important;height:auto !important;'

      result = {
        w: img.width,
        h: img.height
      }

      img.style.cssText = csstext
    }

    return result
  },

  getImgInfos (img, realAddress) {
    const realSrc = realAddress && this.getAttr(img, realAddress)
    const hw = this.getImgWH(img)
    
    return {
        imgElm: img,
        src: realSrc || img.src,
        msrc: img.src,
        w: hw.w,
        h: hw.h
    }
  },

  isComplianceImg (img, attr) {
    return img.tagName.toLocaleLowerCase() === 'img' && 
        (!attr || (attr && utils.hasAttr(img, attr)))
  },

  extend () {
    if (arguments.length < 2) {
      return
    }
    const target = arguments[0], options = [].slice.call(arguments, 1);
    options.forEach(option => {
      for(let key in option) {
        if (this.hasOwn(option, key)) {
          target[key] = option[key];
        }
      }
    });
  }
}

export default utils

class Carrousel {
  constructor(id) {
    this.parentEl = document.getElementById(id)
    this.listEl = this.parentEl.children[0].children[0]
    this.navEl = this.parentEl.children[1]
    this.options = {
      prevTs: 0,
      ts: 0,
      index: 0,
      startX: 0,
      prevX: 0,
      endX: 0
    }
    this.init()
    this.initStyle()
  }

  init() {
    this.parentEl.addEventListener('touchstart', event => {
      this.options.startX = event.targetTouches[0].pageX;
    }, false)

    this.parentEl.addEventListener('touchend', () => {
      this.options.ts = Date.now()
      this._slide()
    }, false)

    this.parentEl.addEventListener('touchmove', event => {
      this.options.prevTs = Date.now()
      this.options.prevX = this.options.endX ? this.options.endX : this.options.startX
      this.options.endX = event.targetTouches[0].pageX
    }, false)
  }

  initStyle() {
    for (let i = 0, len = this._getChildLength(); i < len; i++) {
      const item = this.listEl.children[i]
      item.style.width = this._getWidth() + 'px'
    }
  }

  /**
   * 获取子元素数量
   * @private
   */
  _getChildLength() {
    if (this.options.len) return this.options.len
    this.options.len = this.listEl.children.length
    return this.options.len
  }

  /**
   * 轮播
   * 当停留时间超过300ms，并且拖动距离不到总宽度的3/1的时候，不轮播
   * 当为滑动距离，或者滑动距离小于40的时候，不轮播
   * @private
   */
  _slide() {
    if (this.options.ts - this.options.prevTs > 300 && Math.abs(this.options.prevX - this.options.startX) < this.options.width / 3) return
    if (this.options.endX === this.options.startX || Math.abs(this.options.endX - this.options.startX) < (20 * window.devicePixelRatio || 1)) return
    if (this.options.endX > this.options.startX) {
      this.prev()
    } else {
      this.next()
    }
    this.options.startX = 0
    this.options.prevX = 0
    this.options.endX = 0
  }

  /**
   * 下一页
   */
  next() {
    if (this.options.index === this.options.len - 1) return
    this.options.index++
    this._updateStyle(this.options.index * this.options.width)
  }

  /**
   */
  prev() {
    if (this.options.index === 0) return
    this.options.index--
    this._updateStyle(this.options.index * this.options.width)
  }

  /**
   * 轮播后更新样式
   * @param left
   * @private
   */
  _updateStyle(left) {
    left = left === 0 ? '0' : `-${left}`
    this.listEl.style.transform = `translate3d(${left}px, 0px, 0px)`
    for (let i = 0, len = this._getChildLength(); i < len; i++) {
      const item = this.navEl.children[i]
      if (i === this.options.index) {
        item.className = 'item active'
      } else {
        item.className = 'item'
      }
    }
  }

  /**
   * 获取元素宽度
   * @return {Number}
   * @private
   */
  _getWidth() {
    if (this.options.width) return this.options.width
    this.options.width = this.listEl.getBoundingClientRect().width
    return this.options.width
  }
}

export default Carrousel

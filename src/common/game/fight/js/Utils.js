/* **** 工具库 **** */
let getID = function (str) {
  return document.getElementById(str)
}
let getClass = function (str, num = 0) {
  return document.getElementsByClassName(str)[num]
}
let create = function (str) {
  return document.createElement(str)
}
let firstUpper = function (str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}
let firstLower = function (str) {
  return str.slice(0, 1).toLowerCase() + str.slice(1)
}
let removeDOM = function (dom) {
  let parentNode = dom.parentNode
  if (parentNode) {
    parentNode.removeChild(dom)
  }
}
let getStyle = function (ele, style) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[style]
  } else {
    return ele.currentStyle[style]
  }
}
let createObjPool = function (createObjFn) { // 对象池工厂
  let objPool = []
  return {
    get: function () {
      let obj = objPool.length === 0 ? createObjFn.apply(this, arguments) : objPool.shift()
      return obj
    },
    recover: function (obj) {
      objPool.push(obj)
    }
    // _see: function () {
    //   console.log(objPool)
    // }
  }
}
let installEvent = function (obj) { // 发布-订阅模式/观察者模式
  obj.eventList = []
  obj.listen = function (key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  }
  obj.trigger = function () {
    let key = Array.prototype.shift.call(arguments)
    let fns = this.eventList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    fns.map((x) => {
      x.apply(this, arguments)
    })
  }
  obj.remove = function (key, fn) {
    let fns = this.eventList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i]
        if (_fn === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
}
let randomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max - min))
}
// Function.prototype.before = function (beforeFn) {
//   let _self = this
//   return function () {
//     beforeFn.apply(this, arguments)
//     return _self.apply(this, arguments)
//   }
// }
// Function.prototype.after = function (afterFn) {
//   let _self = this
//   return function () {
//     let ret = _self.apply(this, arguments)
//     afterFn.apply(this, arguments)
//     return ret
//   }
// }
export {
  getID,
  getClass,
  create,
  firstUpper,
  firstLower,
  removeDOM,
  getStyle,
  createObjPool,
  installEvent,
  randomNum
}

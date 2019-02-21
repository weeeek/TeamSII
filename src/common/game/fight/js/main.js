/*
 * Author: payen S.Tsung 丛培森
 * QQ: 1056843325
 * Blog: http://blog.csdn.net/q1056843325
 * Github: https://github.com/paysonTsung?tab=repositories
 */

import {config} from 'game/fight/js/Config'
import {getID, getClass} from 'game/fight/js/Utils'
import Source from 'game/fight/js/Source'
import UI from 'game/fight/js/UI'

const globalSrcBuffer = new Source()
const background = globalSrcBuffer.getSrc(config.backgroundImgSrc, 'image')
const logo = globalSrcBuffer.getSrc(config.logoSrc, 'image')

const wrapper = getID('wrapper')
const btnGroup = getID('btnGroup')
const startBtn = getClass('startBtn')
const rankBtn = getClass('rankingBtn')
const setBtn = getClass('settingBtn')
const ruleBtn = getClass('ruleBtn')
const bombBtn = getClass('bombBtn')
const ctrlBtn = getClass('ctrlBtn')

const canvas = getID('game')
const ctx = canvas.getContext('2d')

const mainUI = new UI({
  wrapper,
  btnGroup,
  canvas,
  ctx,
  globalSrcBuffer,
  background,
  logo,
  startBtn,
  rankBtn,
  setBtn,
  ruleBtn,
  bombBtn,
  ctrlBtn,
  language: config.language
})

export function gameInit () {
  mainUI.init()
}

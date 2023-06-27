import type { Reg } from './types'

export const USERNAME: Reg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/

export const PASSWORD_NORMAL: Reg = /^[a-zA-Z]\w{5,15}$/

export const PASSWORD_STRICT: Reg
  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,15}$/

export const PASSWORD_STRICT_SYMBOL: Reg
  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/

export const EMAIL: Reg
  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

export const MOBILE: Reg
  = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/

export const MOBILE_PHONE_CHINA: Reg
  = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

export const TELEPHONE_CHINA: Reg = /\d{3}-\d{8}|\d{4}-\d{7}/

export const ID_CARD: Reg
  = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

export const QQ_ACOUNT: Reg = /^[1-9][0-9]{4,10}$/

export const WECHAT_ACOUNT: Reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/

export const DATE: Reg = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/

export const DATE_TIME: Reg
  = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/

export const NUMBER_MONEY: Reg = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/

export const SPECIFIC_SYMBOL: Reg = /[^%&',;=?$\x22]+/

export const SPECIAL_SYMBOL_CHINESE: Reg = /[^\w\.\/]/gi

export const POSTAL_CODE: Reg = /^\d{6}$/

export const IPV4: Reg
  = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

export const FILE_EXTENSION_NAME: Reg
  = /^([a-zA-Z]\\:|\\\\)\\\\([^\\\\]+\\\\)*[^\\/:*?"<>|]+\\.txt(l)?$/

export const FILE_NAME: Reg = /(.*\/)*([^.]+).*/gi

export const XML: Reg = /^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/

export const EMPTY_LINE: Reg = /\n\s*\r/

export const CHINESE: Reg = /^[\u4E00-\u9FA5]{0,}$/

export const NUMBER: Reg = /^[-+]?\d*$/

export const NUMBER_FLOAT: Reg = /^[-\+]?\d+(\.\d+)?$/

export const NUMBER_TWO_DECIMALS: Reg = /^(\-)?\d+(\.\d{1,2})$/

export const ENGLISH_NUMBER: Reg = /^[A-Za-z0-9]+$/

export const CHINESE_ENGLISH_NUMBER_UNDERLINE: Reg
  = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/

export const CHINESE_ENGLISH_NUMBER: Reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/

export const ENGLISH_NUMBER_LINE: Reg = /^[0-9a-zA-Z_-]{1,}$/

export const ENGLISH: Reg = /^[A-Za-z]+$/

export const IS_CHINESE: Reg = /[\u4E00-\u9FA5]/

export const URL: Reg
  = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

export const RGB: Reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

export const CAR_NO: Reg
  = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/

export const IMG_SRC: Reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/gi

export const HTML_REMARK: Reg = /<!--(.*?)-->/g

export const HTML_STYLE: Reg = /style="[^=>]*"([(\s+\w+=)|>])/g

export const HTML_COLOR: Reg = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g

export const HTML_TAG: Reg = /<("[^"]*"|'[^']*'|[^'">])*>/g

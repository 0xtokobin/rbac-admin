import type { Reg } from './types'

/**
 * @name USERNAME
 * @description Length 4 to 16
 */
export const USERNAME: Reg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/

/**
 * @name PASSWORD_NORMAL
 * @description Length 6 to 16, begins with a letter, including letters, numbers, and "_"
 */
export const PASSWORD_NORMAL: Reg = /^[a-zA-Z]\w{5,15}$/

/**
 * @name PASSWORD_STRICT
 * @description Length 8 to 16, contains upper and lower case letters and numbers
 */
export const PASSWORD_STRICT: Reg
  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,15}$/

/**
 * @name PASSWORD_STRICT_SYMBOL
 * @description Length 8 to 16, contains upper and lower case letters, numbers, and special characters
 */
export const PASSWORD_STRICT_SYMBOL: Reg
  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/

/**
 * @name EMAIL
 * @description E-mail Address
 */
export const EMAIL: Reg
  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

/**
 * @name MOBILE
 * @description Mobile phone number, 3-4 digit area code, 7-8 digit on-air number, 1-4 digit extension number
 */
export const MOBILE: Reg
  = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/

/**
 * @name MOBILE_CHINA
 * @description Mobile phone number (China)
 */
export const MOBILE_PHONE_CHINA: Reg
  = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

/**
 * @name TELEPHONE_CHINA
 * @description Telephone number (China)
 */
export const TELEPHONE_CHINA: Reg = /\d{3}-\d{8}|\d{4}-\d{7}/

/**
 * @name ID_CARD
 * @description Id card (China)
 */
export const ID_CARD: Reg
  = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

/**
 * @name QQ_ACOUNT
 * @description Tencent QQ Account (China)
 */
export const QQ_ACOUNT: Reg = /^[1-9][0-9]{4,10}$/

/**
 * @name WECHAT_ACOUNT
 * @description Wechat Account (China)
 */
export const WECHAT_ACOUNT: Reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/

/**
 * @name DATE
 * @description Date，YYYY-MM-DD
 */
export const DATE: Reg = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/

/**
 * @name DATE_TIME
 * @description Date time，YYYY-MM-DD hh:mm:ss
 */
export const DATE_TIME: Reg
  = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/

/**
 * @name NUMBER_MONEY
 * @description Nonzero, two decimal places
 */
export const NUMBER_MONEY: Reg = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/

/**
 * @name SPECIFIC_SYMBOL
 * @description Contains & ^ % '; =? $\ "and other special symbols
 */
export const SPECIFIC_SYMBOL: Reg = /[^%&',;=?$\x22]+/

/**
 * @name SPECIAL_SYMBOL_CHINESE
 * @description Special symbols and Chinese characters
 */
export const SPECIAL_SYMBOL_CHINESE: Reg = /[^\w\.\/]/gi

/**
 * @name POSTAL_CODE_CHINA
 * @description Postal Code (China)
 */
export const POSTAL_CODE: Reg = /^\d{6}$/

/**
 * @name IPV4
 * @description IPv4 Address
 */
export const IPV4: Reg
  = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

/**
 * @name FILE_EXTENSION_NAME
 * @description File extension name
 */
export const FILE_EXTENSION_NAME: Reg
  = /^([a-zA-Z]\\:|\\\\)\\\\([^\\\\]+\\\\)*[^\\/:*?"<>|]+\\.txt(l)?$/

/**
 * @name FILE_PATH_NAME
 * @description Matches any path file name
 */
export const FILE_NAME: Reg = /(.*\/)*([^.]+).*/gi

/**
 * @name XML
 * @description The xml file
 */
export const XML: Reg = /^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/

/**
 * @name EMPTY_LINE
 * @description Empty line, which can be used to delete empty lines
 */
export const EMPTY_LINE: Reg = /\n\s*\r/

/**
 * @name CHINESE
 * @description Chinese
 */
export const CHINESE: Reg = /^[\u4E00-\u9FA5]{0,}$/

/**
 * @name NUMBER
 * @description Integer number
 */
export const NUMBER: Reg = /^[-+]?\d*$/

/**
 * @name NUMBER_FLOAT
 * @description Floating-point number
 */
export const NUMBER_FLOAT: Reg = /^[-\+]?\d+(\.\d+)?$/

/**
 * @name NUMBER_TWO_DECIMALS
 * @description A positive or negative number to 1 or 2 decimal places
 */
export const NUMBER_TWO_DECIMALS: Reg = /^(\-)?\d+(\.\d{1,2})$/

/**
 * @name ENGLISH_NUMBER
 * @description English characters and numbers
 */
export const ENGLISH_NUMBER: Reg = /^[A-Za-z0-9]+$/

/**
 * @name CHINESE_ENGLISH_NUMBER_UNDERLINE
 * @description Numbers contain underscores
 */
export const CHINESE_ENGLISH_NUMBER_UNDERLINE: Reg
  = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/

/**
 * @name CHINESE_ENGLISH_NUMBER
 * @description Chinese, English, numbers, but do not include underscores and other symbols
 */
export const CHINESE_ENGLISH_NUMBER: Reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/

/**
 * @name ENGLISH_NUMBER_LINE
 * @description English, digits, underscores and dash symbols
 */
export const ENGLISH_NUMBER_LINE: Reg = /^[0-9a-zA-Z_-]{1,}$/

/**
 * @name ENGLISH
 * @description 26 English letters
 */
export const ENGLISH: Reg = /^[A-Za-z]+$/

/**
 * @name IS_CHINESE
 * @description Including Chinese
 */
export const IS_CHINESE: Reg = /[\u4E00-\u9FA5]/

/**
 * @name URL
 * @description Url Address
 */
export const URL: Reg
  = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

/**
 * @name RGB
 * @description Hexadecimal color
 */
export const RGB: Reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

/**
 * @name CAR_NO_CHINA
 * @description License plate check (China)
 */
export const CAR_NO: Reg
  = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/

/**
 * @name IMG_SRC
 * @description Matches img and src
 */
export const IMG_SRC: Reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/gi

/**
 * @name HTML_REMARK
 * @description Matches comments in html
 */
export const HTML_REMARK: Reg = /<!--(.*?)-->/g

/**
 * @name HTML_STYLE
 * @description Matches the style in the html
 */
export const HTML_STYLE: Reg = /style="[^=>]*"([(\s+\w+=)|>])/g

/**
 * @name HTML_COLOR
 * @description Matches the color in the html
 */
export const HTML_COLOR: Reg = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g

/**
 * @name HTML_TAG
 * @description Matching html tag
 */
export const HTML_TAG: Reg = /<("[^"]*"|'[^']*'|[^'">])*>/g

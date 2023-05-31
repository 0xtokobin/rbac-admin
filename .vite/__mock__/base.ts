import { MockHandler } from 'vite-plugin-mock-server'

export default (): MockHandler[] => [
  {
    pattern: '/mock/base/mobile/smscode',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/base/mobile/smscode',
    method: 'POST',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/base/mobile/areacode',
    method: 'GET',
    handle: (req, res) => {
      res.end([
        {
          area: '中国大陆',
          code: '+86',
        },
        {
          area: '中国香港',
          code: '+852',
        },
        {
          area: '中国澳门',
          code: '+853',
        },
        {
          area: '中国台湾',
          code: '+886',
        },
      ])
    }
  },
]

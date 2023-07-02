import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/mock/base/mobile/smscode',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/base/mobile/smscode',
    method: 'POST',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/base/mobile/areacode',
    method: 'GET',
    response: (req, res) => {
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
])

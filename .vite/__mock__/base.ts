import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/mock/base/mobile/smscode',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/base/mobile/smscode',
    method: 'POST',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/base/mobile/areacode',
    method: 'GET',
    body: {
      code: 0,
      data: [
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
      ],
      message: 'success'
    }
  },
])

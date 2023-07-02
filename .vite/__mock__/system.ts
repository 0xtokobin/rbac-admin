import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/mock/system/user/login',
    method: 'POST',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/user/scan',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/user/profile',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/user/notification',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/user/validate',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/menu/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/user/role',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/role/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/user/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/dict/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/dict/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/param/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/log/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/dept/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/mock/system/file/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
])

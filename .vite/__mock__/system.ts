import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/system/user/login',
    method: 'POST',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/user/scan',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/user/profile',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/user/notification',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/user/validate',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/menu/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/user/role',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/role/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/user/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/dict/list',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/dict/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/param/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/log/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/dept/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
  {
    url: '/system/file/page',
    method: 'GET',
    response: (req, res) => {
      res.end()
    }
  },
])

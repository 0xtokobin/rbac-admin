import { MockHandler } from 'vite-plugin-mock-server'

export default (): MockHandler[] => [
  {
    pattern: '/mock/system/user/login',
    method: 'POST',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/user/scan',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/user/profile',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/user/notification',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/user/validate',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/menu/list',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/user/role',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/role/list',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/user/list',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/dict/list',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/dict/page',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/param/page',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/log/page',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/dept/page',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
  {
    pattern: '/mock/system/file/page',
    method: 'GET',
    handle: (req, res) => {
      res.end()
    }
  },
]

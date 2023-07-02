import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/mock/system/user/login',
    method: 'POST',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/user/scan',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/user/profile',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/user/notification',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/user/validate',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/menu/list',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/user/role',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/role/list',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/user/list',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/dict/list',
    method: 'GET',
    body: {
      code: 0,
      data: [
        {
          key: 'notificationType',
          type: 0,
          remark: '消息类型',
          values: [
            {
              label: '消息',
              value: 0,
            },
            {
              label: '通知',
              value: 1,
            },
          ],
        },
        {
          key: 'notificationSource',
          type: 0,
          remark: '消息来源',
          values: [
            {
              label: '用户',
              value: 0,
            },
            {
              label: '系统',
              value: 1,
            },
          ],
        },
        {
          key: 'notificationIsRead',
          type: 0,
          remark: '消息是否已读',
          values: [
            {
              label: '未读',
              value: 0,
            },
            {
              label: '已读',
              value: 1,
            },
          ],
        },
        {
          key: 'logStatus',
          type: 0,
          remark: '日志操作状态',
          values: [
            {
              label: '成功',
              value: 0,
            },
            {
              label: '失败',
              value: 500,
            },
          ],
        },
        {
          key: 'paramType',
          type: 0,
          remark: '参数类型',
          values: [
            {
              label: '系统',
              value: 0,
            },
            {
              label: '业务',
              value: 500,
            },
          ],
        },
        {
          key: 'dictionaryType',
          type: 0,
          remark: '字典类型',
          values: [
            {
              label: '系统',
              value: 0,
            },
            {
              label: '业务',
              value: 500,
            },
          ],
        },
      ],
      message: 'success'
    }
  },
  {
    url: '/mock/system/dict/page',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/param/page',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/log/page',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/dept/page',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
  {
    url: '/mock/system/file/page',
    method: 'GET',
    body: {
      code: 0,
      data: null,
      message: 'success'
    }
  },
])

import { IconTypeEnum } from '@libs/common/enums/base'
import { interceptJointData } from '@libs/common/utils/base'
import { dict } from '@libs/mock/data/dict'
import type { MockMethod } from 'vite-plugin-mock'
import { code } from '../data/mobile-code'
import type { ResponseData } from '#libs/common/request'
import type { IObject } from '#/global'

export default [
  {
    url: '/system/user/login',
    method: 'post',
    data: 'E7UJ0aubyQm32NWlJ0iNionQkv0Ltn2dVf10',
    response: <T>(data: IObject, res: ResponseData<T>) => {
      if (interceptJointData(data.body).type === 0 && interceptJointData(data.body).password !== 'wingscloud') {
        return {
          ...res,
          code: 10039,
          msg: null,
          data: '',
        }
      }
      if (interceptJointData(data.body).type === 1 && interceptJointData(data.body).code.length !== 6) {
        return {
          ...res,
          code: 10040,
          msg: null,
          data: '',
        }
      }
      return res
    },
  },
  {
    url: '/system/user/scan',
    method: 'post',
    data: null,
  },
  {
    url: '/system/user/profile',
    method: 'get',
    data: {
      id: '0',
      username: 'admin',
      nickname: '系统管理员',
      avatar: '',
      mobile: '+86 188***8888',
      roleId: '0',
      roleName: '管理员',
      deptId: '0',
      deptName: '总公司',
      layout: 'mix',
      language: 'zh-CN',
      size: 'default',
      theme: '#3dabf5',
      darkMode: 'auto',
      tab: true,
      breadcrumb: true,
    },
  },
  {
    url: '/system/user/validate',
    method: 'get',
    data: { validateResult: true },
    response: <T>(param: IObject, res: ResponseData<T>) => {
      if (interceptJointData(param.url).type === 0 && interceptJointData(param.url).username !== 'admin') {
        return {
          ...res,
          code: 10034,
          msg: null,
          data: { validateResult: false },
        }
      }
      return res
    },
  },
  {
    url: '/system/menu/list',
    method: 'get',
    data: [
      {
        path: '/home',
        name: 'home',
        component: '/home',
        meta: {
          layout: 'view',
          requiresAuth: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'House',
          sort: 0,
          i18n: { 'zh-CN': '首页', 'en-US': 'Home' },
        },
      },
      {
        path: '/system',
        name: 'system',
        meta: {
          layout: 'view',
          requiresAuth: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'Operation',
          sort: 1,
          i18n: { 'zh-CN': '系统管理', 'en-US': 'System Management' },
        },
        children: [
          {
            path: '/system/menu',
            name: 'system.menu',
            component: '/system/menu',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Menu',
              sort: 0,
              i18n: { 'zh-CN': '菜单管理', 'en-US': 'Menu Management' },
            },
          },
          {
            path: '/system/role',
            name: 'system.role',
            component: '/system/role',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'CollectionTag',
              sort: 1,
              i18n: { 'zh-CN': '角色管理', 'en-US': 'Role Management' },
            },
          },
          {
            path: '/system/user',
            name: 'system.user',
            component: '/system/user',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'User',
              sort: 2,
              i18n: { 'zh-CN': '用户管理', 'en-US': 'User Management' },
            },
          },
          {
            path: '/system/dept',
            name: 'system.dept',
            component: '/system/dept',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.APP,
              icon: 'tree',
              sort: 3,
              i18n: { 'zh-CN': '部门管理', 'en-US': 'Department Management' },
            },
          },
          {
            path: '/system/dict',
            name: 'system.dict',
            component: '/system/dict',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Reading',
              sort: 4,
              i18n: { 'zh-CN': '字典管理', 'en-US': 'Dict Management' },
            },
          },
          {
            path: '/system/param',
            name: 'system.param',
            component: '/system/param',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Key',
              sort: 5,
              i18n: { 'zh-CN': '参数管理', 'en-US': 'Parameter Management' },
            },
          },
          {
            path: '/system/file',
            name: 'system.file',
            component: '/system/file',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'FolderOpened',
              sort: 6,
              i18n: { 'zh-CN': '文件管理', 'en-US': 'File Management' },
            },
          },
          {
            path: '/system/log',
            name: 'system.log',
            component: '/system/log',
            meta: {
              layout: 'view',
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Notebook',
              sort: 7,
              i18n: { 'zh-CN': '日志管理', 'en-US': 'Log Management' },
            },
          },
        ],
      },
    ],
  },
  {
    url: '/system/user/roles',
    method: 'get',
    data: [
      '/home',
      '/system/role',
      '/system/user',
      '/system/dept',
      '/system/menu',
      '/system/dict',
      '/system/param',
      '/system/file',
      '/system/log',
    ],
  },
  {
    url: '/system/user/notification',
    method: 'get',
    data: {
      list: [
        {
          id: 0,
          type: 1,
          content: '修改密码成功！',
          source: 1,
          createTime: 1669084718194,
          status: 0,
        },
        {
          id: 1,
          type: 1,
          content: '初次登录，请修改密码！',
          source: 0,
          createTime: 1669082324627,
          status: 1,
        },
      ],
      total: 2,
    },
  },
  {
    url: '/system/role/list',
    method: 'get',
    data: {
      list: [
        {
          id: 0,
          name: '管理员',
          remark: '',
          createTime: 1669084718194,
          status: 0,
        },
        {
          id: 1,
          name: '开发人员',
          remark: '',
          createTime: 1669082324627,
          status: 1,
        },
      ],
      total: 2,
    },
  },
  {
    url: '/system/user/list',
    method: 'get',
    data: {
      list: [
        {
          id: 0,
          avatar: '',
          nickname: '系统管理员',
          username: 'Administrator',
          mobile: '18877776666',
          roleId: 0,
          roleName: '管理员',
          createTime: 1669061218194,
          status: 0,
        },
      ],
      total: 1,
    },
  },
  {
    url: '/system/dict/list',
    method: 'get',
    data: dict,
  },
  {
    url: '/system/dict/page',
    method: 'get',
    data: {
      list: dict,
      total: dict.length,
    },
  },
  {
    url: '/system/param/list',
    method: 'get',
    data: {
      list: [],
      total: 0,
    },
  },
  {
    url: '/system/log/page',
    method: 'get',
    data: {
      list: [
        {
          username: 'Administrator',
          action: '修改密码',
          ip: '0.0.0.0',
          status: 0,
          createTime: 1669084718194,
        },
        {
          username: 'Administrator',
          action: '登录',
          ip: '0.0.0.0',
          status: 0,
          createTime: 1669061218194,
        },
      ],
      total: 2,
    },
  },
  {
    url: '/system/dept/list',
    method: 'get',
    response: <T>(data: IObject, res: ResponseData<T>) => {
      return {
        code: 0,
        msg: null,
        data: {
          list: [
            {
              id: 0,
              name: '总公司',
              parentName: '',
              parentId: '',
              sort: 1,
              remark: '',
              children: [
                {
                  id: 1,
                  name: '分公司',
                  parentName: '总公司',
                  parentId: '0',
                  sort: 1,
                  remark: '',
                },
              ],
            },
          ],
          total: 0,
        },
      }
    },
  },
  {
    url: '/system/file/page',
    method: 'get',
    data: {
      list: [],
      total: 0,
    },
  },
  {
    url: '/common/mobile/smscode',
    method: 'get',
    data: '',
  },
  {
    url: '/common/mobile/smscode',
    method: 'post',
    data: true,
    response: <T>(data: IObject, res: ResponseData<T>) => {
      if (interceptJointData(data.body).code.length !== 6) {
        return {
          ...res,
          code: 10040,
          msg: null,
          data: '',
        }
      }
      return res
    },
  },
  {
    url: '/common/mobile/areacode',
    method: 'get',
    response: <T>(data: IObject, res: ResponseData<T>) => {
      return {
        code: 0,
        msg: null,
        data: code,
      }
    },
  },
] as MockMethod[]

import { dict } from '../data/dict'
import type { ResponseData } from '../../src/utils/request'
import type { IObject } from '../../types/global'
import { interceptJointData } from '../../src/utils/common'
import { IconTypeEnum } from '../../src/constants/enums'

export default {
  /**
   * @name systemUserLogin
   * @description 普通登录接口模拟，接收账号 + 密码，返回临时 token。
   */
  systemUserLogin: {
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

  /**
  * @name getScanResult
  * @description 轮询接口：获取扫码结果
  */
  getScanResult: {
    url: '/system/user/scan',
    method: 'post',
    data: null,
  },

  /**
   * @name getSystemUserProfile
   * @description 查询用户资料，默认返回系统管理员账号信息
   */
  getSystemUserProfile: {
    url: '/system/user/profile',
    method: 'get',
    data: {
      id: '0',
      username: 'admin',
      nickname: '系统管理员',
      avatar: '',
      mobile: '',
      roleId: '0',
      roleName: '管理员',
      departmentId: '0',
      departmentName: '总公司',
    }
    ,
  },

  /**
   * @name systemUserValidate
   * @description 检查用户，接收 value + type 进行校验
   */
  systemUserValidate: {
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

  /**
   * @name getSystemUserRoute
   * @description 获取系统用户路由
   */
  getSystemUserRoute: {
    url: '/system/user/route',
    method: 'get',
    data: [
      {
        path: '/home',
        name: 'home',
        meta: {
          layout: 'view',
          isMenu: true,
          requiresAuth: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'House',
          sort: 1,
          i18nKey: 'home',
        },
        children: [
          {
            path: '/home/workbench',
            name: 'home.workbench',
            component: '/home/workbench',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Monitor',
              sort: 1,
              isI18n: true,
              i18nKey: 'home.workbench',
            },
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        meta: {
          layout: 'view',
          isMenu: true,
          requiresAuth: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'Operation',
          sort: 3,
          i18nKey: 'system',
        },
        children: [
          {
            path: '/system/menu',
            name: 'system.menu',
            component: '/system/menu',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Menu',
              sort: 0,
              isI18n: true,
              i18nKey: 'system.menu',
            },
          },
          {
            path: '/system/role',
            name: 'system.role',
            component: '/system/role',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'CollectionTag',
              sort: 1,
              isI18n: true,
              i18nKey: 'system.role',
            },
          },
          {
            path: '/system/user',
            name: 'system.user',
            component: '/system/user',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'User',
              sort: 2,
              isI18n: true,
              i18nKey: 'system.user',
            },
          },
          {
            path: '/system/department',
            name: 'system.department',
            component: '/system/department',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.APP,
              icon: 'base-tree',
              sort: 3,
              isI18n: true,
              i18nKey: 'system.department',
            },
          },
          {
            path: '/system/dictionary',
            name: 'system.dictionary',
            component: '/system/dictionary',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Reading',
              sort: 4,
              isI18n: true,
              i18nKey: 'system.dictionary',
            },
          },
          {
            path: '/system/param',
            name: 'system.param',
            component: '/system/param',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Key',
              sort: 5,
              isI18n: true,
              i18nKey: 'system.param',
            },
          },
          {
            path: '/system/file',
            name: 'system.file',
            component: '/system/file',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'FolderOpened',
              sort: 6,
              isI18n: true,
              i18nKey: 'system.file',
            },
          },
          {
            path: '/system/log',
            name: 'system.log',
            component: '/system/log',
            meta: {
              layout: 'view',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Notebook',
              sort: 7,
              isI18n: true,
              i18nKey: 'system.log',
            },
          },
        ],
      },
    ],
  },

  /**
   * @name getSystemUserRole
   * @description 获取用户权限列表
   */
  getSystemUserRole: {
    url: '/system/user/role',
    method: 'get',
    data: [
      '/home/workbench',
      '/home/dashboard',
      '/system/role',
      '/system/user',
      '/system/department',
      '/system/menu',
      '/system/dictionary',
      '/system/param',
      '/system/file',
      '/system/log',
      '/development/options',
      '/development/code',
      '/development/form',
    ]
    ,
  },

  /**
   * @name getSystemUserNotification
   * @description 获取用户消息通知
   */
  getSystemUserNotification: {
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

  /**
   * @name getSystemRoleList
   * @description 获取系统角色列表
   */
  getSystemRoleList: {
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

  /**
   * @name getSystemUserList
   * @description 获取系统人员列表
   */
  getSystemUserList: {
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

  /**
   * @name getSystemDictList
   * @description 获取系统字典列表
   */
  getSystemDictList: {
    url: '/system/dict/list',
    method: 'get',
    data: dict,
  },

  /**
   * @name getSystemDictPage
   * @description 分页获取系统字典列表
   */
  getSystemDictPage: {
    url: '/system/dict/page',
    method: 'get',
    data: {
      list: dict,
      total: dict.length,
    },
  },

  /**
   * @name getSystemParamList
   * @description 分页获取系统参数列表
   */
  getSystemParamList: {
    url: '/system/param/list',
    method: 'get',
    data: {
      list: [],
      total: 0,
    },
  },

  /**
   * @name getSystemLogList
   * @description 分页获取系统日志列表
   */
  getSystemLogList: {
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

  /**
   * @name getSystemDeptList
   * @description 分页获取系统部门列表
   */
  getSystemDeptList: {
    url: '/system/dept/list',
    method: 'get',
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
  },

  /**
   * @name getSystemFileList
   * @description 分页获取系统文件列表
   */
  getSystemFileList: {
    url: '/system/file/page',
    method: 'get',
    data: {
      list: [],
      total: 0,
    },
  },
}

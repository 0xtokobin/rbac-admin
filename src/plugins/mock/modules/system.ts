import type { ResponseData } from '@/utils/request/index.d';
import type { IObject } from '@/types/global.d';
import { interceptJointData } from '@/utils/common';
import { IconTypeEnum } from '@/constants/enums';

const dictData = [
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
];

export default {
  /**
   * 注册
   */
  signup: {
    url: '/system/user/signup',
    method: 'post',
    data: '',
  },

  /**
   * 账号密码登录
   */
  loginByAccount: {
    url: '/system/user/login',
    method: 'post',
    data: 'E7UJ0aubyQm32NWlJ0iNionQkv0Ltn2dVf10',
    response: <T>(data: IObject, res: ResponseData<T>) => {
      if (interceptJointData(data.body).password !== 'admin123') {
        return {
          ...res,
          code: 10039,
          msg: null,
          data: '',
        };
      }
      return res;
    },
  },

  /**
   * 获取用户信息
   */
  getUserProfile: {
    url: '/system/user/profile',
    method: 'get',
    data: {
      id: '0',
      username: 'Administrator',
      nickname: '系统管理员',
      avatar: '',
      mobile: '18877776666',
      roleId: '0',
      roleName: '管理员',
      departmentId: '0',
      departmentName: '总公司',
    },
  },

  /**
   * @name validateUsername
   * @description 校验用户名称是否存在
   */
  validateUsername: {
    url: '/system/user/validate',
    method: 'get',
    data: { validateResult: true },
    response: <T>(param: IObject, res: ResponseData<T>) => {
      if (interceptJointData(param.url).username !== 'Administrator') {
        return {
          ...res,
          code: 10034,
          msg: null,
          data: { validateResult: false },
        };
      }
      return res;
    },
  },

  /**
   * @name getRouteAsync
   * @description 获取异步路由
   */
  getRouteAsync: {
    url: '/system/route/async',
    method: 'get',
    data: [
      {
        path: '/home',
        name: 'home',
        meta: {
          layout: 'admin',
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
              layout: 'admin',
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
          layout: 'admin',
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
              layout: 'admin',
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
              layout: 'admin',
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
              layout: 'admin',
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
              layout: 'admin',
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
              layout: 'admin',
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
              layout: 'admin',
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
              layout: 'admin',
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
              layout: 'admin',
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
      {
        path: '/development',
        name: 'development',
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'Coin',
          sort: 4,
          i18nKey: 'development',
        },
        children: [
          {
            path: '/development/options',
            name: 'development.options',
            component: '/development/options',
            meta: {
              layout: 'admin',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Operation',
              sort: 0,
              isI18n: true,
              i18nKey: 'development.options',
            },
          },
          {
            path: '/development/code',
            name: 'development.code',
            component: '/development/code',
            meta: {
              layout: 'admin',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'ElementPlus',
              sort: 1,
              isI18n: true,
              i18nKey: 'development.code',
            },
          },
          {
            path: '/development/form',
            name: 'development.form',
            component: '/development/form',
            meta: {
              layout: 'admin',
              isMenu: true,
              requiresAuth: true,
              iconType: IconTypeEnum.ELEMENT_PLUS,
              icon: 'Coordinate',
              sort: 2,
              isI18n: true,
              i18nKey: 'development.form',
            },
          },
        ],
      },
    ],
  },

  /**
   * @name getUserRoles
   * @description 获取用户权限
   */
  getUserRoles: {
    url: '/system/user/roles',
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
    ],
  },

  /**
   * 获取个人消息列表
   */
  getUserlNotification: {
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
   * 获取个人未读消息列表
   */
  getUserNotificationByNotRead: {
    url: '/system/user/notReadNotification',
    method: 'get',
    data: [
      {
        id: 0,
        type: 1,
        content: '修改密码成功！',
        source: 1,
        createTime: 1669084718194,
        status: 0,
      },
    ],
  },

  /**
   * 获取角色列表
   */
  getRoleList: {
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
   * 获取用户列表
   */
  getUserList: {
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
   * 获取全部字典数据
   */
  getDictionaryAll: {
    url: '/system/dictionary/all',
    method: 'get',
    data: dictData,
  },

  /**
   * 分页获取字典数据
   */
  getDictionaryPage: {
    url: '/system/dictionary/list',
    method: 'get',
    data: {
      list: dictData,
      total: dictData.length,
    },
  },

  /**
   * 分页查询参数
   */
  getParamList: {
    url: '/system/param/list',
    method: 'get',
    data: {
      list: [],
      total: 0,
    },
  },

  /**
   * 分页查询日志
   */
  getLogList: {
    url: '/system/log/list',
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
   * 分页查询部门
   */
  getDepartmentList: {
    url: '/system/department/list',
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
   * 分页查询文件
   */
  getFileList: {
    url: '/system/file/list',
    method: 'get',
    data: {
      list: [],
      total: 0,
    },
  },
};

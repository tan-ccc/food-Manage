export default [
  // 非全屏界面
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        meta: {
          parent: '/home', // 顶级目录(经典布局与怪异布局时使用到)
          icon: 'el-icon-s-home', // 图标
          title: '首页', // tags-view 标题(必填)
          affix: true, // tags-view 是否固定，支持设置只有一级的
          hidden: false, // menu 菜单是否隐藏
          isExternalLinks: false, // 是否是外部链接
          externalLinkUrl: null // 外部链接 `url`
        },
      },
      {
        path: '/docs',
        component: () => import('@/views/docs'),
        meta: {
          parent: '/docs',
          icon: 'el-icon-s-order',
          title: '文档',
          affix: true
        },
      },
      {
        path: '/user',
        redirect: '/user/user-list',
        component: () => import('@/views/layout/publics'),
        meta: {
          parent: '/user',
          icon: 'el-icon-s-help',
          title: '用户',
        },
        children: [
          {
            path: '/user/user-list',
            component: () => import('@/views/user/list'),
            meta: {
              parent: '/user',
              icon: 'el-icon-s-platform',
              title: '网站用户'
            },
          },
          {
            path: '/user/user-admin',
            component: () => import('@/views/user/admin'),
            meta: {
              parent: '/user',
              icon: 'el-icon-s-promotion',
              title: '后台管理员',
            },
          },
          {
            path: '/user/user-role',
            component: () => import('@/views/user/role'),
            meta: {
              parent: '/user',
              icon: 'el-icon-s-custom',
              title: '角色管路',
            },
          },
        ],
      },
      {
        path: '/profile',
        component: () => import('@/views/profile'),
        meta: {
          parent: '/profile',
          icon: 'el-icon-star-on',
          title: '个人中心',
          hidden: true,
        },
      },
      {
        path: '/menu',
        redirect: '/menu/menu1',
        component: () => import('@/views/layout/publics'),
        meta: {
          parent: '/menu',
          icon: 'el-icon-s-data',
          title: '路由嵌套',
        },
        children: [
          {
            path: '/menu/menu1',
            component: () => import('@/views/layout/publics'),
            meta: {
              parent: '/menu',
              icon: 'el-icon-s-operation',
              title: '菜单1',
            },
            redirect: '/menu/menu1/menu1-1',
            children: [
              {
                path: '/menu/menu1/menu1-1',
                component: () => import('@/views/menu/menu1/menu1-1'),
                meta: {
                  parent: '/menu',
                  icon: 'el-icon-s-operation',
                  title: '菜单1-1',
                },
              },
              {
                path: '/menu/menu1/menu1-2',
                component: () => import('@/views/layout/publics'),
                meta: {
                  parent: '/menu',
                  icon: 'el-icon-s-operation',
                  title: '菜单1-2',
                },
                redirect: '/menu/menu1/menu1-2/menu1-2-1',
                children: [
                  {
                    path: '/menu/menu1/menu1-2/menu1-2-1',
                    component: () => import('@/views/menu/menu1/menu1-2/menu1-2-1'),
                    meta: {
                      parent: '/menu',
                      icon: 'el-icon-s-operation',
                      title: '菜单1-2-1',
                    },
                  },
                  {
                    path: '/menu/menu1/menu1-2/menu1-2-2',
                    component: () => import('@/views/menu/menu1/menu1-2/menu1-2-2'),
                    meta: {
                      parent: '/menu',
                      icon: 'el-icon-s-operation',
                      title: '菜单1-2-2',
                    },
                  },
                ],
              },
              {
                path: '/menu/menu1/menu1-3',
                component: () => import('@/views/menu/menu1/menu1-3'),
                meta: {
                  parent: '/menu',
                  icon: 'el-icon-s-operation',
                  title: '菜单1-3',
                },
              },
            ],
          },
          {
            path: '/menu/menu2',
            component: () => import('@/views/menu/menu2'),
            meta: {
              parent: '/menu',
              icon: 'el-icon-s-operation',
              title: '菜单2',
            },
          },
        ],
      },
      {
        path: '/demo',
        redirect: '/demo/filtering',
        component: () => import('@/views/layout/publics'),
        meta: {
          parent: '/demo',
          icon: 'el-icon-star-on',
          title: '组件例子',
        },
        children: [
          {
            path: '/demo/filtering',
            component: () => import('@/views/demo/filtering/index'),
            meta: {
              parent: '/demo',
              icon: 'el-icon-s-marketing',
              title: '筛选组件',
            },
          },
          {
            path: 'externalLinkUrl',
            meta: {
              title: '大数据可视化',
              icon: 'el-icon-s-data',
              isExternalLinks: true,
              externalLinkUrl: '/big-data'
            },
          },
          {
            path: '/demo/tVSwitch',
            component: () => import('@/views/demo/tVSwitch/index'),
            meta: {
              parent: '/demo',
              icon: 'el-icon-s-platform',
              title: '仿电视开关机',
            },
          },
          {
            path: '/demo/mavonEditor',
            component: () => import('@/views/demo/mavonEditor/index'),
            meta: {
              parent: '/demo',
              icon: 'el-icon-edit-outline',
              title: '富文本编辑器',
            },
          },
          {
            path: '/demo/waterfall',
            component: () => import('@/views/demo/waterfall/index'),
            meta: {
              parent: '/demo',
              icon: 'el-icon-reading',
              title: '瀑布屏',
            },
          },
          {
            path: '/demo/comment',
            component: () => import('@/views/demo/comment/index'),
            meta: {
              parent: '/demo',
              icon: 'el-icon-chat-line-square',
              title: '论坛评价',
            },
          },
          {
            path: '/demo/treeControl',
            component: () => import('@/views/demo/treeControl/index'),
            meta: {
              parent: '/demo',
              icon: 'el-icon-finished',
              title: 'Tree 树形控件',
            },
          },
          {
            path: '/demo/tianditu',
            component: () => import('@/views/demo/tianditu/index'),
            meta: {
              parent: '/demo',
              icon: 'el-icon-location-information',
              title: '天地图',
            },
          },
        ],
      },
      {
        path: 'externalLinkUrl',
        meta: {
          title: '外链',
          icon: 'el-icon-link',
          isExternalLinks: true,
          externalLinkUrl: 'https://www.baidu.com',
          externalLinkType: 'open'
        },
      },
    ],
  },

  // 全屏界面
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/error',
    component: () => import('@/views/layout/errors'),
    meta: {
      title: 'error',
    },
    redirect: '/404',
    children: [
      {
        path: '/404',
        component: () => import('@/views/error/404'),
        meta: {
          title: '404',
        },
      },
      {
        path: '/401',
        component: () => import('@/views/error/401'),
        meta: {
          title: '401',
        },
      },
    ],
  },
  {
    path: '/big-data',
    component: () => import('@/views/demo/bigData/index.vue')
  },
  {
    path: '*',
    redirect: '/404',
  },
]

// 2 level menus
const menus = {
    title: '项目中心',
    purl: '/project',
    link: '/project',
    icon: 'ios-keypad',
    checkPerm: false,
    submenus: [
        {
            title: '常规',
            purl: '/project/general',
            link: '/project/general',
            icon: 'information',
            submenus: [
                {
                    title: '基本信息',
                    purl: '/project/general/info',
                    link: '/project/general/info',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '项目成员',
                    purl: '/project/general/members',
                    link: '/project/general/members',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '源码仓库',
                    purl: '/project/general/source_repo',
                    link: '/project/general/source_repo',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '部署集群',
                    purl: '/project/general/clusters',
                    link: '/project/general/clusters',
                    icon: null,
                    checkPerm: false
                }
            ]
        },
        {
            title: '持续交付',
            purl: '/project/cd',
            link: '/project/cd',
            icon: 'ios-paperplane',
            submenus: [
                {
                    title: '发起流程',
                    purl: '/project/cd/start',
                    link: '/project/cd/start',
                    icon: 'ios-list',
                    checkPerm: false
                },
                {
                    title: '项目工单',
                    purl: '/project/cd/tickets',
                    link: '/project/cd/tickets',
                    icon: 'cube',
                    checkPerm: false
                },
                {
                    title: 'ReleaseNotes',
                    purl: '/project/cd/release_notes',
                    link: '/project/cd/release_notes',
                    icon: 'cube',
                    checkPerm: false
                },

            ]
        },
        {
            title: 'Java',
            purl: null,
            link: null,
            icon: 'ios-keypad',
            submenus: [
                {
                    title: '模块管理',
                    purl: '/project/java/modules',
                    link: '/project/java/modules',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '实例管理',
                    purl: '/project/java/instances',
                    link: '/project/java/instances',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '配置管理',
                    purl: '/project/java/configs',
                    link: '/project/java/configs',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '自动任务',
                    purl: '/project/java/auto_tasks',
                    link: '/project/java/auto_tasks',
                    icon: null,
                    checkPerm: false
                }
            ]
        },
        {
            title: '数据库',
            purl: null,
            link: null,
            icon: 'ios-keypad',
            submenus: [
                {
                    title: '发起变更',
                    purl: '/project/java/modules',
                    link: '/project/java/modules',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '表结构',
                    purl: '/project/java/configs',
                    link: '/project/java/configs',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '慢查询日志',
                    purl: '/project/java/instances',
                    link: '/project/java/instances',
                    icon: null,
                    checkPerm: false
                },
            ]
        },
        {
            title: '其他',
            purl: null,
            link: null,
            icon: 'ios-analytics',
            submenus: [
                {
                    title: '监控',
                    purl: '/project/stats',
                    link: '/project/stats',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '日志',
                    purl: '/project/logs',
                    link: '/project/logs',
                    icon: null,
                    checkPerm: false
                },
                {
                    title: '告警',
                    purl: '/project/alerts',
                    link: '/project/alerts',
                    icon: null,
                    checkPerm: false
                }
            ]
        }
    ]
}

export default menus;

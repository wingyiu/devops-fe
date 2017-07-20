const routers = [
	{
		name: 'main',
		path: '/',
		meta: {
			keepAlive: true,
		},
		component: (resolve) => require(['./views/index.vue'], resolve),
		children: [
			{
				path: 'console',
				component: (resolve) => require(['./views/console/index.vue'], resolve),
				children: [
					{
						path: 'i/tasks',
						component: (resolve) => require(['./views/console/task-list.vue'], resolve)
					},
					{
						path: 'i/tickets',
						component: (resolve) => require(['./views/console/ticket-list.vue'], resolve)
					},
					{
						path: 'i/projects',
						component: (resolve) => require(['./views/console/project-list.vue'], resolve)
					}
				]
			},
			{
				path: 'project',
				name: 'project',
				components: {
					subnav: (resolve) => require(['./views/project/subnav.vue'], resolve),
					default: (resolve) => require(['./views/project/index.vue'], resolve)
				},
				children: [
					{
						path: 'general/info',
						component: (resolve) => require(['./views/project/general/info.vue'], resolve)
					},
					{
						path: 'general/source_repo',
						component: (resolve) => require(['./views/project/general/source_repo.vue'], resolve)
					},
					{
						path: 'general/clusters',
						component: (resolve) => require(['./views/project/general/clusters.vue'], resolve)
					},
					{
						path: 'general/members',
						component: (resolve) => require(['./views/project/general/members.vue'], resolve)
					},
					{
						path: 'cd/tickets',
						component: (resolve) => require(['./views/project/cd/tickets.vue'], resolve)
					},
					{
						path: 'cd/release_notes',
						component: (resolve) => require(['./views/project/cd/release_note.vue'], resolve)
					}
				]
			},
			{
				path: 'open',
				components: {
					default: (resolve) => require(['./views/open/index.vue'], resolve)
				},
				children: [
					{
						path: 'common/db_dicts',
						component: (resolve) => require(['./views/open/dbdict-list.vue'], resolve),
						meta: {
							keepAlive: true,
						},
					},
					{
						path: 'common/api_docs',
						component: (resolve) => require(['./views/open/api-list.vue'], resolve),
						meta: {
							keepAlive: true,
						},
					},
					{
						path: 'codegen/formHeads',
						component: (resolve) => require(['./views/open/formHead-list.vue'], resolve),
						meta: {
							keepAlive: true,
						},
					}
				]
			},
			{
				path: 'admin',
				components: {
					default: (resolve) => require(['./views/admin/index.vue'], resolve)
				},
				children: [
					{
						path: 'cmdb/hosts',
						component: (resolve) => require(['./views/admin/cmdb/host-list.vue'], resolve)
					},
					{
						path: 'cmdb/idcs',
						component: (resolve) => require(['./views/admin/cmdb/host-list.vue'], resolve)
					}
				]
			}
		]

	},
	{
		path: '/console/i/tickets/detail',
		meta: {
			title: '工单详情',
			keepAlive: false,
		},
		component: (resolve) => require(['./views/console/ticket-detail.vue'], resolve)
	},
	{
		path: '/open/common/db_dicts/table_detail',
		meta: {
			title: '表结构详情',
			keepAlive: false,
		},
		component: (resolve) => require(['./views/open/dbdict-detail.vue'], resolve)
	},
	{
		path: '/open/common/api_docs/api_detail',
		meta: {
			title: 'API详情',
			keepAlive: false,
		},
		component: (resolve) => require(['./views/open/api-detail.vue'], resolve)
	},
	{
		path: '/open/codegen/formHeads/edit',
		name: 'formHeadEdit',
		meta: {
			title: '表单开发',
			keepAlive: false,
		},
		component: (resolve) => require(['./views/open/formHead-edit.vue'], resolve)
	},
	{
		path: '/login',
		meta: {
			title: '登录',
			keepAlive: false,
		},
		component: (resolve) => require(['./views/login.vue'], resolve)
	},
	{
		path: '/404',
		meta: {
			title: '404',
			keepAlive: true,
		},
		component: (resolve) => require(['./views/404.vue'], resolve)
	},
	{
		path: '/403',
		meta: {
			title: '403',
			keepAlive: true,
		},
		component: (resolve) => require(['./views/403.vue'], resolve)
	},
	{
		path: '*',
		redirect: '/404'
	}
];
export default routers;

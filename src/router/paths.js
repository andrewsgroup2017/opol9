export default [
	{
		path: '*',
		meta: {
			public: true
		},
		redirect: {
			path: '/404'
		}
	},
	{
		path: '/404',
		meta: {
			public: true
		},
		name: 'NotFound',
		component: () => import(`@/pages/NotFound.vue`)
	},
	{
		path: '/login',
		meta: {
			public: true
		},
		name: 'Login',
		component: () => import(`@/pages/Login.vue`)
	},
	{
		path: '/',
		meta: {},
		name: 'Root',
		redirect: {
			name: 'Dashboard'
		}
	},
	{
		path: '/dashboard',
		meta: { breadcrumb: true },
		name: 'Dashboard',
		component: () => import(`@/pages/Dashboard.vue`)
	},

	// {
	//   path: '/calendar',
	//   meta: { breadcrumb: true },
	//   name: 'Calendar',
	//   component: (a) => import(
	//     /* webpackChunkName: "routes" */
	//     /* webpackMode: "lazy-once" */
	//     `@/pages/Calendar.vue`
	//   )
	// },
	{
		path: '/documents',
		meta: {},
		name: 'Documents',
		props: (route) => ({ type: route.query.type }),
		component: () => import(`@/pages/Documents.vue`)
	},
	{
		path: '/chat',
		meta: {
			public: true
		},
		name: 'Chat',
		component: () => import(`../chat/ChatLayout.vue`),
		redirect: {
			path: '/chat/messaging'
		},
		children: [
			{
				path: '/chat/messaging/:uuid?',
				meta: {
					public: true
				},
				name: 'ChatMessaging',
				props: true,
				components: {
					default: () => import(`../chat/ChatMessaging.vue`)
				}
			},
			{
				path: '/chat/contact/:uuid?',
				meta: {
					public: true
				},
				name: 'ChatContact',
				components: {
					default: () => import(`../chat/ChatContact.vue`)
				}
			}
		]
	}
];

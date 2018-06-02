let routes = [ {
	title: '预约',
	path: '/appointment/new',
	component: () => import('./pages_mobile/appointment/new')
}, {
	title: '预约列表',
	path: '/appointment/list',
	component: () => import('./pages_mobile/appointment/list')
}, {
	title: '预约结果',
	path: '/appointment/result',
	component: () => import('./pages_mobile/appointment/result')
}, {
	title: '首页',
	path: '/',
	component: () => import('./pages_mobile/index/index')
}];
export default routes;
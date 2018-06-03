let routes = [ {
	title: '预约',
	path: '/appointment/new',
	component: () => import(/* webpackChunkName: "appointment_new" */ './pages_mobile/appointment/new')
}, {
	title: '预约列表',
	path: '/appointment/list',
	component: () => import(/* webpackChunkName: "appointment_list" */ './pages_mobile/appointment/list')
}, {
	title: '预约结果',
	path: '/appointment/result',
	component: () => import(/* webpackChunkName: "appointment_result" */ './pages_mobile/appointment/result')
}, {
	title: '首页',
	path: '/',
	component: () => import(/* webpackChunkName: "index_index" */ './pages_mobile/index/index')
}];
export default routes;
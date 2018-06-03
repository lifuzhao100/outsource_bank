let routes = [{
	title: '登陆',
	name: 'login',
	path: '/login',
	withoutNav: true,
	component: () => import(/* webpackChunkName: "login" */ './pages_pc/login')
}, {
	title: '全部预约',
	name: 'appointment',
	path: '/appointment/index',
	component: () => import(/* webpackChunkName: "appointment_index" */ './pages_pc/appointment/index')
}, {
	title: '首页配置',
	name: 'index_config',
	path: '/index/config',
	component: () => import(/* webpackChunkName: "index_config" */ './pages_pc/index/config')
}, {
	title: '银行配置',
	name: 'bank_config',
	path: '/bank/config',
	component: () => import(/* webpackChunkName: "bank_config" */ './pages_pc/bank/config')
}, {
	title: '服务配置',
	name: 'service_config',
	path: '/service/config',
	component: () => import(/* webpackChunkName: "service_config" */ './pages_pc/service/config')
}, {
	title: '修改配置',
	path: '/account/renew',
	component: () => import(/* webpackChunkName: "account_renew" */ './pages_pc/account/renew')
}];
export default routes;
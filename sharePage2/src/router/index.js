import Vue from 'vue'
import Router from 'vue-router'
const homepage = () => import('../components/homepage.vue');
const tickets = () => import('../components/ticketShare.vue');
const goods = () => import('../components/productShare.vue');
const articles = () => import('../components/articleShare.vue');
const detail = () => import('../components/detail.vue');
const worksList = () => import('../components/worksList.vue');
const articleList = () => import('../components/articleList.vue');
Vue.use(Router)

export default new Router({
	mode:'history',
  	routes: [
		{
			path: '/share/homepage/:id',
			name: 'homepage',
			component: homepage
		},
		{
			path:'/share/tickets/:id',
			name:tickets,
			component:tickets
		},
		{
			path: '/share/goods/:id',
			name: 'goods',
			component: goods
		},
		{
			path: '/share/articles/:id',
			name: 'articles',
			component: articles
		},
		{
			path: '/share/detail/:id',
			name: 'detail',
			component: detail
		},
		{
			path: '/share/worksList/:id',
			name: 'worksList',
			component: worksList
		},
		{
			path: '/share/articleList',
			name: 'articleList',
			component: articleList
		}
  ]
})

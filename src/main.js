// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//  import Vuetify from 'vuetify'
import './plugins/vuetify'
import './plugins/pouchdb'
import router from './router/index'
// import 'font-awesome/css/font-awesome.css'
// import './theme/default.styl'
import VeeValidate from 'vee-validate'
// import colors from 'vuetify/es5/util/colors';
// import VueResize from 'vue-resize';

// Vue.use(VueResize);
// import ResSplitPane from 'vue-resize-split-pane'
// import VueDraggableResizable from 'vue-draggable-resizable'

// Vue.component('vue-draggable-resizable', VueDraggableResizable)
// Vue.component('rs-panes', ResSplitPane)
// import VueSplit from 'vue-split-panel'
// Vue.use(VueSplit)
import Truncate from 'lodash.truncate'
Vue.config.productionTip = false
// Helpers
// Global filters
Vue.filter('truncate', Truncate)
Vue.use(VeeValidate, {
	fieldsBagName: 'formFields'
})
// Vue.use(Vuetify, {
// 	// theme: {
// 	//   primary: colors.indigo.base, // #E53935
// 	//   secondary: colors.indigo.lighten4, // #FFCDD2
// 	//   accent: colors.indigo.base // #3F51B5
// 	// },
// 	options: {
// 		themeVariations: [ 'primary', 'secondary', 'accent' ],
// 		extra: {
// 			mainToolbar: {
// 				color: 'primary'
// 			},
// 			sideToolbar: {},
// 			sideNav: 'primary',
// 			mainNav: 'primary lighten-1',
// 			bodyBg: ''
// 		}
// 	}
// })
// Bootstrap application components

/* eslint-disable no-new */
// new Vue({
// 	el: '#app',
// 	router,
// 	components: {
// 		App
// 	},
// 	template: '<App/>'
// })
new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app')

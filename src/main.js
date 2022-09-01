import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import {
	auth,
	db,
} from './services/database';
import VueYoutube from 'vue-youtube';
import './registerServiceWorker';

import firebase from 'firebase';



Vue.use(VueYoutube);

Vue.config.productionTip = false

let app;
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const initialize = () => {
	if (!app) {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
}


auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('SET_CURRENT_USER', user);
		if( ! iOS ) {
			Notification.requestPermission().then(function (permission) {
				if (permission === 'granted') {
					firebase.messaging().getToken().then(( currentToken ) => {
						if (currentToken) {
	
							db.collection('usersToken').doc( auth.currentUser.uid ).set({
								token: currentToken
							});
	
						  } else {
	
							console.log('No Instance ID token available. Request permission to generate one.');
	
						}
					});
		
				} else {
					console.log('Unable to get permission to notify.');
				}
			});
		}

	} else {
		store.commit('SET_CURRENT_USER', null);
	}

	initialize();

});
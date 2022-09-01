import Vue from 'vue'
import Vuex from 'vuex'
import YTSearch from '@/services/YoutubeSearch';
import { auth, db } from '@/services/database';

Vue.use(Vuex)

const API_KEY = 'AIzaSyAfY1SizuBTmZ7gv2eYdRfmA9qkSeyqLZU';

export default new Vuex.Store({
	state: {
		currentUser: null,
		currentVideo: 'JGhoLcsr8GA',
		prevFeaturesearchValue: '',
		prevYTsearchValue: '',
		videos: [],
		featuredVideos: [],
		playerVideos: [],
		users: [],
		friends: [],
		friendsId: [],
		friendsAddedMe: []
	},
	actions: {
		getFeatureVideo({ commit }, value) {

			/* Gets Video List From firebase */

			let featuredVideos = [];
			
			/*
			*	Cancel search request if user submits same value
			*/

			if(value == this.prevFeaturesearchValue) {
				return;
			}
			
			/*
			*	Set previous search value
			*/
			this.prevFeaturesearchValue = value;

			db.collection('youtube').doc('trending').collection(value).onSnapshot(querySnapshot => {
				querySnapshot.forEach(video => {
					featuredVideos.push(video.data())
				});
			});
			commit('SET_FEATURED_VIDEOS', featuredVideos);
		},
		getFavoriteVideo({ commit }, value) {

			let featuredVideos = [];
			
			/*
			*	Cancel search request if user submits same value
			*/

			if(value == this.prevFeaturesearchValue) {
				return;
			}
			
			/*
			*	Set previous search value
			*/
			this.prevFeaturesearchValue = value;

			db.collection('users').doc( auth.currentUser.uid ).collection(value).onSnapshot(querySnapshot => {
				querySnapshot.forEach(video => {
					featuredVideos.push(video.data())
				});
			});
			commit('SET_FEATURED_VIDEOS', featuredVideos);
		},
		getYoutubeVideos({ commit }, value) {
			let youtubeVideos = [];

			/*
			*	Cancel search request if user submits same value
			*/

			if(value == this.prevYTsearchValue) {
				return;
			}

			/*
			*	Set previous search value
			*/
			this.prevYTsearchValue = value;

			if(value == '') {
				return;
			}

			YTSearch({ key: API_KEY, term: value, amount: 30 }, payload => {
				payload.forEach(video => {
					let videoID = video.id.videoId;
					let channelTitle = video.snippet.channelTitle;
					let title = video.snippet.title;
					let thumbnail = video.snippet.thumbnails.high.url;

					let obj = {
						videoID,
						channelTitle,
						title,
						thumbnail
					}
					youtubeVideos.push(obj);
				});
				commit('SET_FEATURED_VIDEOS', youtubeVideos)
			});
		},
		getPlayerVideos({ commit }) {

			let playerVideos = [];
			
			db.collection('users').doc( auth.currentUser.uid ).collection('videos').onSnapshot( querySnapshot => {
	
				querySnapshot.docChanges().forEach(change => {

					const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";

					if(source === "Server") {
						if(change.type === 'added') {
							playerVideos.push( change.doc.data() );
							commit('SET_PLAYERVIDEOS', playerVideos);
							commit('SET_CURRENTVIDEO', playerVideos[0].videoID);
						}
						if(change.type === 'removed') {
							commit('DELETE_PLAYERVIDEOS', change.doc.id);
						}
					}
				});
			});
		},
		getUsers({ commit }) {
			let users = [];
			db.collection('users').onSnapshot(querySnapshot => {
				querySnapshot.forEach(user => {
					users.push( user.data() );
				});
			});
			commit('SET_USERS', users);
		},
		getFriends({ commit }) {
			let friends = [];
			db.collection('users').doc( auth.currentUser.uid ).collection('friends')
			.where('status', '==', 'accepted')
			.onSnapshot(querySnapshot => {
				querySnapshot.docChanges().forEach(change => {

					const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
	
					if(source === "Server") {
						if(change.type === 'added') {
							friends.push( change.doc.data() );
						}
					}
				});
			});
			commit('SET_FRIENDS', friends);

		},
		getFriendsID({ commit }) {
			let friendsId = [];
			db.collection('users').doc( auth.currentUser.uid ).collection('friends').onSnapshot( data => {
				data.forEach(friend => {
					friendsId.push( friend.id );
				})
			});
			commit('SET_FRIENDS_ID', friendsId);
		},
		getFriendsAddedMe({ commit }) {
			let data = [];
			db.collection('users').doc( auth.currentUser.uid ).collection('friends')
			.where('status', '==', 'pending')
			.onSnapshot(querySnapshot => {
				querySnapshot.docChanges().forEach(change => {

					const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
	
					if(source === "Server") {
						if(change.type === 'added') {
							data.push( change.doc.data() );
							commit('SET_FRIENDS_ADDED_ME', data);
						}
						if(change.type === 'removed') {
							commit('DELETE_FRIENDS_ADDED_ME', change.doc.id);
						}
					}
				});
			});
		}
	},
	getters: {
		filterUsers( state ) {
			return state.users.filter( user => {
				return state.friendsId.indexOf(user.uid) === -1 && user.uid !== auth.currentUser.uid;
			});
		},
		filterPlayerVideos( state ) {
			return state.playerVideos.filter((video, index) => {
				return state.playerVideos.indexOf(video) === index;
			});
		},
		filterFeatureVideos( state ) {
			return state.featuredVideos.filter((video, index) => {
				return state.featuredVideos.indexOf(video) === index;
			});
		},
	},
	mutations: {
		SET_CURRENT_USER( state, payload ) {
			state.currentUser = payload;
		},
		SET_FEATURED_VIDEOS( state, payload ) {
			state.featuredVideos = payload;
		},
		SET_YOUTUBE_VIDEOS( state, videos ) {
			state.videos = videos;
		},
		SET_PLAYERVIDEOS( state, playerVideos ) {
			state.playerVideos = playerVideos;
		},
		SET_CURRENTVIDEO( state, currentVideoID ) {
			state.currentVideo = currentVideoID;
		},
		SET_USERS( state, users ) {
			state.users = users;
		},
		SET_FRIENDS( state, friends ) {
			state.friends = friends;
		},
		SET_FRIENDS_ID( state, friendsId ) {
			state.friendsId = friendsId;
		},
		SET_FRIENDS_ADDED_ME( state, friends ) {
			state.friendsAddedMe = friends;
		},
		DELETE_FRIENDS_ADDED_ME( state, friendId ) {
			const index = state.friendsAddedMe.findIndex(item => item.uid == friendId);

			if( index >= 0 ) {
				state.friendsAddedMe.splice(index, 1);
			}

		},
		DELETE_PLAYERVIDEOS( state, playerVideoId ) {
			const index = state.playerVideos.findIndex(item => item.videoID == playerVideoId);

			if(index >= 0) {
				state.playerVideos.splice(index, 1);
			}

			if( state.playerVideos.length > 0 ) {
				state.currentVideo = state.playerVideos[0].videoID;
			}
		}
	}
});
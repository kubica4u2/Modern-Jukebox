<template>
	<v-app dark class="landing-header">
		<template v-if="! currentUser">
			<v-toolbar color="#424242">
				<v-toolbar-title>
					<router-link to="/">
						<h2>Modern JukeBox</h2>
					</router-link>
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<div>
					<AuthModal />
				</div>
			</v-toolbar>
		</template>
		<v-content>
			<router-view />
		</v-content>

		<template >
			<BottomNav />
		</template>
	</v-app>
</template>

<script>

	import AuthModal from './components/AuthModal/';
	import BottomNav from './components/BottomNav/';

	export default {
		name: 'App',
		components: {
			AuthModal,
			BottomNav
		},
		computed: {
			currentUser() {
				return this.$store.state.currentUser;
			}
		}
	}
</script>

<style>
	@import 'https://fonts.googleapis.com/css?family=Lato:300';

	body {
		background-color: #191919;
	}

	.application {
		font-family: 'Lato';
	}

	.v-content {
		padding-bottom: 76px !important;
	}

	a:hover {
		cursor: pointer;
	}

	.theme--dark.application {
		background-color: #191919;
	}

	.v-container {
		padding: 0 16px;
	}

	.v-layout {
		width: 1100px;
		max-width: 100%;
		margin: auto;
	}

	.v-toolbar__content {
		justify-content: center;
		width: 1100px;
    	max-width: 100%;
		margin: auto;
	}
	
	@media(min-width: 1100px) {
		.v-toolbar__content {
			padding: 0;
		}
	}

	.header-search .v-input__slot {
		margin-bottom: 0 !important;
	}
	.header-search {
		width: 100%;
		position: relative;
	}
	.users-list {
		padding: 0;
		max-width: 100%;
	}

	.users-list-item {
		border-top: 1px solid #282828;
	}

	.users-list-item:first-child {
		border-top: none;
	}

	.clear-bottom-nav {
		margin-bottom: 80px;
	}

	.video-wrapper {
		text-align: center;
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		overflow: hidden;
		max-width: 1100px;
		margin: auto;
	}

	.video-wrapper::before {
		display: block;
		content: "";
		padding-top: 56.25%;
	}

	.youtube-video {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.background-black {
		background-color: #000000;
	}
	@media(min-width: 960px) {
		.v-container {
			padding: 0 24px;
		}
	}
</style>

<style scoped>
	.landing-header h2 {
		font-size: 21px;
		font-family: 'Lato';
		font-weight: 300 !important;
	}

	.landing-header a {
		color: #ffffff;
		text-decoration: none;
	}

	.theme--dark.v-toolbar {
		box-shadow: none;
		background-color: #191919;
	}
</style>
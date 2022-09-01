<template>
	<div class="landing">
		<section class="landing-hero">
			<div class="v-container">
				<div class="v-layout">
					<div class="v-flex">
						<div class="landing-hero-text">
							<h1>Share Youtube <br> To Friends Device's</h1>
							<p>Modern JukeBox is the easiest way to share <br>youtube videos across devices</p>
						</div>
					</div>
				</div>
			</div>
			<div class="landing-hero-banner"></div>
		</section>
		<section class="landing-welcome">
			<div class="v-container">
				<div class="v-layout">
					<div class="v-flex">
						<div class="landing-welcome-wrapper">
							<div class="landing-video-container"><iframe
									src="https://www.youtube.com/embed/Ebg8TqxKlsM?rel=0" frameborder="0"
									allow="autoplay; encrypted-media" title="Home Video" allowfullscreen=""></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<footer>
			<div class="v-container">
				<div class="v-layout">
					<div class="v-flex">
						Developed by <a href="mailto:kubica4u2@gmail.com">Kubitools</a></div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'Landing',
	}
</script>


<style>
	.landing-login-link {
		color: rgba(255, 255, 255, 0.88);
		text-decoration: none;
		font-size: 1.3125rem;
		font-weight: 500;
		font-family: 'Lato';
		font-weight: 300 !important;
		line-height: 1.16667em;
	}

	.landing header {
		background-color: transparent;
		box-shadow: none;
	}

	.landing h1 {
		color: rgba(255, 255, 255, 0.88) !important;
	}

	.landing-hero {
		padding-top: 100px;
	}

	.landing-hero-banner {
		padding-bottom: 370px;
		position: relative;
		width: 100%;
	}

	.landing-hero-banner::before {
		content: "";
		background: url(https://d1gwm4cf8hecp4.cloudfront.net/svg/wave.svg) no-repeat;
		background-size: cover;
		background-position: center;
		bottom: -1px;
		content: "";
		display: block;
		min-height: 500px;
		position: absolute;
		width: 100%;
	}

	.landing-hero-text {
		z-index: 1;
		position: relative;
	}

	@media(min-width: 991px) {
		.landing-hero-text {
			padding-left: 100px;
		}
	}

	@media(min-width: 1200px) {
		.landing-hero-text {
			padding-left: 200px;
		}
	}

	.landing-hero-text h1 {
		font-family: 'Lato';
		font-weight: 300 !important;
		font-size: 32px;
		line-height: 36px;
		margin: 0;
	}

	.landing-hero-text p {
		font-size: 18px;
		color: rgb(100, 111, 121);
		font-family: 'Lato';
		margin-top: 20px;
	}

	@media(min-width: 768px) {
		.landing-hero-text h1 {
			font-size: 76px;
			line-height: 76px;
		}

		.landing-hero-text p {
			font-size: 22px;
		}
	}

	/* LANDING WELCOME */

	.landing-welcome-wrapper {
		position: relative;
	}

	.landing-welcome {
		background-color: #ED4659;
		position: relative;
	}

	.landing-welcome:before {
		background-color: #ED4659;
		content: "";
		height: 100%;
		overflow: hidden;
		position: absolute;
		transform: skewY(-5deg);
		transform-origin: 0;
		width: 100%;
		-webkit-backface-visibility: hidden;
		height: 400px;
	}

	@media(max-width: 360px) {
		.landing-welcome:before {
			height: 300px;
		}
	}

	@media(min-width: 600px) {
		.landing-welcome {
			padding: 100px 0;
		}

		.landing-welcome:before {
			top: 470px;
			height: 300px;
		}
	}

	/* END LANDING WELCOME */

	.landing-video-container {
		display: block;
		width: 100%;
		padding: 0;
		overflow: hidden;
		max-width: 640px;
		margin: auto;
		z-index: 9;
	}

	.landing-video-container:before {
		display: block;
		content: "";
		padding-top: 56.25%;
	}

	.landing-video-container>iframe {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		border: 0;
		max-width: 640px;
		max-height: 360px;
	}

	/* FOOTER */

	footer {
		background-color: #191919;
		padding: 20px 0;
		text-align: center;
		color: #fff;
		margin-top: 220px;
		font-size: 22px;
	}

	footer a {
		color: #fff;
		text-decoration: none;
	}
</style>

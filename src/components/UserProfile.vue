<template>
	<div class="up-container">
		<div class="up-header">
			<div class="up-info">
				<div class="up-user-avatar is-rounded"><img :src="user.avatarPath" alt=""></div>
				<h1 class="up-user-credentials">
					{{ user.credentials }}
					<user-profile-like :active="isLiked" :count="user.likesCount" />
				</h1>
				<p class="up-user-address">
					{{ user.address.city }}, {{ user.address.country }}
				</p>
			</div>
			<div class="up-sociable">
				<div class="up-stat">
					<p class="up-stat-value">{{ user.likesCount }}</p>
					<p class="up-stat-label">Likes</p>
				</div>
				<div class="vr"></div>
				<div class="up-stat">
					<p class="up-stat-value">{{ user.followingCount }}</p>
					<p class="up-stat-label">Following</p>
				</div>
				<div class="vr"></div>
				<div class="up-stat">
					<p class="up-stat-value">{{ user.followersCount }}</p>
					<p class="up-stat-label">Followers</p>
				</div>
				<user-profile-follow :active="isFollowed" :count="user.followersCount" />
			</div>
			<a href="#" class="up-permalink" @click.prevent="showModal = !showModal">
				<svg aria-hidden="true" data-prefix="fas" data-icon="share-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-share-square fa-w-18"><path fill="currentColor" d="M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z" class=""></path></svg>
			</a>
			<transition name="slide">
				<div class="up-share" v-if="showModal">
					<div class="up-share-content">{{ permalink }}</div>
					<a class="up-share-close" href="" @click.prevent="showModal = !showModal">&#10006;</a>
				</div>
			</transition>
		</div>
		<user-profile-comments :comments="comments" />
	</div>
</template>

<script>
import UserProfileFollow from './UserProfileFollow.vue';
import UserProfileLike from './UserProfileLike.vue';
import UserProfileComments from './UserProfileComments.vue';

export default {
	data() {
		return {
			user: { address: {} },
			comments: [],
			isLiked: false,
			isFollowed: false,
			showModal: false
		};
	},

	components: {
		UserProfileFollow, UserProfileLike, UserProfileComments
	},

	computed: {
		permalink: function() {
			return window.location.href;
		}
	},

	created() {
		this.fetchMockupData();
	},

	methods: {
		fetchMockupData () {
			axios.get('public/mockup-data.json')
			.then((response) => {
				this.user = response.data.user;
				this.comments = response.data.comments;
				this.isLiked = response.data.isLiked;
				this.isFollowed = response.data.isFollowed;
			});
		}
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&subset=latin-ext');
@import '~normalize.css/normalize.css';

@import '../assets/scss/_variables.scss';
@import '../assets/scss/_common.scss';

.up-container {
	position: relative;
	max-width: 31.25em;
	min-width: 20em;
	padding: 2em 1em 0 1em;

	font-family: $font-family;
	font-size: 1rem;
	font-weight: 400;
	color: $text-color;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 3.875em;

		background: linear-gradient(to bottom, $primary-color 6rem, transparent 6rem);
		background-color: #FFFFFF;
		background-repeat: no-repeat;
		box-shadow: 0 0 4px 0 rgba(172,172,172,0.50);
		border-radius: 0.3125em;
	}
}

.up-header {
	position: relative;
	padding: 1.25em;

	background: #FFFFFF;
	box-shadow: 0 0 4px 0 rgba(172,172,172,0.50);
	border-radius: 0.3125em;
}

.up-info {
	position: relative;

	display: flex;

	flex-direction: column;
	padding-top: 1em;
	padding-bottom: 1em;
	justify-content: center;

	@include desktop {
		padding-left: 5.5em;
		justify-content: flex-start;
	}

	.up-user-avatar {
		position: absolute;
		left: 50%;
		top: -100%;
		transform: translateX(-50%);

		display: block;

		width: 4.375em;
		height: 4.375em;
		background-color: $palette-lightgray;

		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
		}

		@include desktop {
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.up-user-credentials {
		position: relative;

		margin: 0;
		padding: 0 2em;

		align-self: center;

		font-size: 1.125em;
		font-weight: 400;
		color: $primary-color;
		line-height: 1.25em;

		@include desktop {
			padding-left: 0;
			align-self: flex-start;
		}
	}

	.up-user-address {
		margin: 0;

		align-self: center;

		font-size: 0.75em;
		color: $text-color-muted;
		line-height: 1.25em;

		@include desktop {
			align-self: flex-start;
		}
	}
}

.up-sociable {
	padding-top: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;

	@include desktop {
		flex-wrap: nowrap;
	}

	.vr {
		width: 0.0625em;
		background-color: $palette-lightgray;
		align-self: stretch;
	}
}

.up-stat {
	flex-grow: 0;
	padding: 0 0.125em;

	.up-stat-value {
		margin: 0;
		font-size: 1.5em;
		color: $secondary-color;
	}

	.up-stat-label {
		margin: 0;
		font-size: 0.625em;
		color: $text-color-muted;
	}
}

.up-permalink {
	display: block;
	position: absolute;
	top: .25em;
	right: .25em;
	padding: .5em;
	font-size: 0.9375em;
	color: $secondary-color;

	&:hover {
		color: darken($secondary-color, 10);
	}

	&:active {
		color: darken($secondary-color, 15);
	}
}

.up-share {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;

	display: flex;
	align-items: center;
	justify-content: space-between;

	height: 4.25em;
	padding: 1.25em;

	color: $text-color;

	background-color: white;
	border-bottom-left-radius: 0.3125em;
	border-bottom-right-radius: 0.3125em;
	border-top: .0625em solid $palette-lightgray;
	//box-shadow: 0 0 5px 0 rgba(172,172,172,0.50);
	box-shadow: 0 -5px 15px -10px rgba(172,172,172,0.50);
}

.up-share-close {
	text-decoration: none;
	color: $secondary-color;
}

// VUE TRANSITIONS
.slide-enter-active, .slide-leave-active {
	transition: all .2s cubic-bezier(0.86, 0, 0.07, 1);
}

.slide-enter, .slide-leave-to {
	opacity: 0;
	transform: translateY(-10%);
}

.slide-enter-to, .slide-leave {
	opacity: 1;
	transform: translateY(0%);
}
</style>
<template>
	<button type="button" class="up-button-follow" :class="{ 'is-active': active, 'is-loading': loading }" :disabled="loading" @click="toggle">
		{{ active ? 'following' : 'follow' }}
	</button>
</template>

<script>
export default {
	props: ['id', 'isFollowed', 'followersCount'],

	data() {
		return {
			active: this.isFollowed,
			count: this.followersCount,
			loading: false
		}
	},

	watch: {
		active: function() { this.active = this.isFollowed },
		count: function() { this.count = this.followersCount }
	},

	methods: {
		toggle() {
			return this.active ? this.unFollow() : this.follow();
		},

		follow() {
			this.loading = true;
			/**
			 * Here we could make ajax call to update database
			 * We simulate ajax call latency to showcase our intermediate css styling
			 */
			setTimeout(
				() => {
					this.active = true;
					this.count++;

					this.$emit('update', { active: this.active, count: this.count });
					this.loading = false;
				}
				, 300);
		},

		unFollow() {
			this.loading = true;
			/**
			 * Here we could make ajax call to update database
			 * We simulate ajax call latency to showcase our intermediate css styling
			 */
			setTimeout(
				() => {
					this.active = false;
					this.count--;

					this.$emit('update', { active: this.active, count: this.count });
					this.loading = false;
				}
				, 300);
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

.up-button-follow {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-basis: 100%;

	margin: 0;
	padding: 1.15em 1.75em;

	border: none;
	border-radius: 1000px;

	vertical-align: top;
	background-color: $secondary-color;

	font-family: $font-family;
	font-size: 0.875rem;
	font-weight: 600;
	color: #FFF;
	letter-spacing: 0.3em;
	text-transform: uppercase;

	line-height: 1em;
	text-align: center;
	white-space: nowrap;

	appearance: none;
	user-select: none;
	cursor: pointer;
	box-shadow: none;

	transition: background-color .2s ease-in-out;

	@include desktop {
		flex-basis: auto;
		margin-top: 0;
	}

	&:hover {
		background-color: darken($secondary-color, 10);
	}

	&:active {
		background-color: darken($secondary-color, 15);
	}

	&.is-loading {
		color: transparent !important;
		pointer-events: none;
	}

	&.is-loading:after {
		display: block;

		height: 1em;
		width: 1em;

		border: 2px solid #FFF;

		position: absolute;
		left: calc(50% - (1em / 2));
		top: calc(50% - (1em / 2));

		content: "";

		border-radius: 290486px;
		border-right-color: transparent;
		border-top-color: transparent;

		animation: spinAround 500ms infinite linear;
	}
}

@keyframes spinAround {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(359deg);
	}
}
</style>
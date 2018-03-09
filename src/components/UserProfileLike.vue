<template>
	<button type="button" class="up-button-like" :class="{ 'is-active': active, 'is-loading': loading }" :disabled="loading" @click="toggle">
		<svg aria-hidden="true" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fa-icon fa-heart"><path class="icon-heart-border" d="M257.3,475.4,92.5,313.6C85.4,307,24,248.1,24,174.8,24,84.1,80.8,24,176,24c41.4,0,80.6,22.8,112,49.8C319.3,46.8,358.6,24,400,24c91.7,0,152,56.5,152,150.8,0,52-31.8,103.5-68.1,138.7l-.4.4L318.7,475.4a43.7,43.7,0,0,1-61.4,0ZM125.9,279.1,288,438.3,449.8,279.6c27.3-27,54.2-66.3,54.2-104.8C504,107.9,465.8,72,400,72c-47.2,0-92.8,49.3-112,68.4C271,123.4,224,72,176,72,110.1,72,72,107.9,72,174.8c0,37.3,26.7,78.9,53.9,104.3Z"/><path class="icon-heart-fill" d="M257.3,475.4,92.5,313.6C85.4,307,24,248.1,24,174.8,24,84.1,80.8,24,176,24c41.4,0,80.6,22.8,112,49.8C319.3,46.8,358.6,24,400,24c91.7,0,152,56.5,152,150.8,0,52-31.8,103.5-68.1,138.7l-.4.4L318.7,475.4a43.7,43.7,0,0,1-61.4,0Z"/></svg>
	</button>
</template>

<script>
export default {
	props: ['id', 'isLiked', 'likesCount'],

	data() {
		return {
			active: this.isLiked,
			count: this.likesCount,
			loading: false
		}
	},

	watch: {
		active: function() { this.active = this.isLiked },
		count: function() { this.count = this.likesCount }
	},

	methods: {
		toggle() {
			return this.active ? this.unLike() : this.like();
		},

		like() {
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

		unLike() {
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

.up-button-like {
	margin: 0;
	padding: 0;

	border: none;
	border-radius: 1000px;

	vertical-align: top;
	background-color: transparent;

	font-family: $font-family;
	font-size: 0.9375rem;
	white-space: nowrap;

	appearance: none;
	user-select: none;
	cursor: pointer;
	box-shadow: none;

	.fa-heart {
		vertical-align: -.25em;

		.icon-heart-border {
			fill: $text-color-muted;
			transition: all .1s cubic-bezier(0.86, 0, 0.07, 1);
		}

		.icon-heart-fill {
			fill: transparent;
			transition: all .1s cubic-bezier(0.86, 0, 0.07, 1);
		}
	}

	&:hover:not(.is-active),
	&.is-loading:not(.is-active) {
		.icon-heart-fill {
			fill: $text-color-muted;
		}
	}

	&:active:not(.is-active) {
		.icon-heart-fill,
		.icon-heart-border {
			fill: darken($text-color-muted, 10);
			transition: none;
		}
	}

	&.is-active {
		.fa-heart {
			animation: heartbeat .75s;
		}
		.icon-heart-fill,
		.icon-heart-border {
			fill: #ff5252;
		}
	}

	&.is-loading {
		.fa-heart {
			animation: pulsing .75s;
			animation-iteration-count: infinite;
		}
	}
}

@keyframes heartbeat {
	0% { transform: scale(1); }
	50% { transform: scale(1.4); }
	100% { transform: scale(1); }
}

@keyframes pulsing {
	0% { transform: scale(1); }
	50% { transform: scale(1.2); }
}

// FONTAWESOME SVG STYLING
.fa-icon {
	display: inline-block;
	width: 1.125em;
	font-size: inherit;
	height: 1em;
	overflow: visible;
	vertical-align: -.125em;
	overflow: hidden;
}
</style>
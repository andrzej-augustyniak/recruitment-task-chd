<template>
	<button type="button" class="up-button-like" :class="{ 'is-active': active, 'is-loading': loading }" :disabled="loading" @click="toggle">
		<svg aria-hidden="true" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-heart fa-w-18"><path class="icon-heart-border" d="M257.3,475.4,92.5,313.6C85.4,307,24,248.1,24,174.8,24,84.1,80.8,24,176,24c41.4,0,80.6,22.8,112,49.8C319.3,46.8,358.6,24,400,24c91.7,0,152,56.5,152,150.8,0,52-31.8,103.5-68.1,138.7l-.4.4L318.7,475.4a43.7,43.7,0,0,1-61.4,0ZM125.9,279.1,288,438.3,449.8,279.6c27.3-27,54.2-66.3,54.2-104.8C504,107.9,465.8,72,400,72c-47.2,0-92.8,49.3-112,68.4C271,123.4,224,72,176,72,110.1,72,72,107.9,72,174.8c0,37.3,26.7,78.9,53.9,104.3Z"/><path class="icon-heart-fill" d="M257.3,475.4,92.5,313.6C85.4,307,24,248.1,24,174.8,24,84.1,80.8,24,176,24c41.4,0,80.6,22.8,112,49.8C319.3,46.8,358.6,24,400,24c91.7,0,152,56.5,152,150.8,0,52-31.8,103.5-68.1,138.7l-.4.4L318.7,475.4a43.7,43.7,0,0,1-61.4,0Z"/></svg>
	</button>
</template>

<script>
export default {
	props: ['active', 'count'],

	data() {
		return {
			loading: false
		}
	},

	methods: {
		toggle() {
			return this.active ? this.unLike() : this.like();
		},

		like() {
			this.loading = true;
			// simulate ajax call latency
			setTimeout(
				() => {
					// this.$emit('update', { active: true, count: this.count + 1 });
					this.$parent.isLiked = true;
					this.$parent.user.likesCount = this.count + 1;
					this.loading = false;
				}
			, 300);
		},

		unLike() {
			this.loading = true;
			// simulate ajax call latency
			setTimeout(
				() => {
					// this.$emit('update', { active: false, count: this.count - 1 });
					this.$parent.isLiked = false;
					this.$parent.user.likesCount = this.count - 1;
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
		position: absolute;
		top: 50%;
		right: 0;

		transform: translateY(-50%);

		margin: 0;
		padding: .5em;

		border: none;
		border-radius: 1000px;

		vertical-align: top;
		background-color: transparent;

		font-size: 0.8334em;
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
</style>
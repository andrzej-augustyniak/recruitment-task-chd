<template>
	<div class="up-comments" v-if="comments">
		<p class="up-comments-toggle" :class="{ 'is-active': !hidden }" v-if="commentsCount > 0">
			<a href="#" @click.prevent="hidden = !hidden">{{ hidden ? 'Show comments (' + commentsCount + ')' : 'Hide comments (' + commentsCount + ')' }}</a>
		</p>
		<p class="up-comments-toggle" v-else>
			No comments yet!
		</p>
		<transition name="roll-up" @enter="rollUpEnter" @after-enter="rollUpAfterEnter" @before-leave="rollUpLeave">
			<div class="up-comments-list" v-if="!hidden && commentsCount > 0" ref="commentsContainer">
				<div class="up-comment" v-for="comment in sortedComments">
					<header class="up-comment-header">
						<div class="up-comment-avatar"><img :src="comment.user.avatarPath" alt=""></div>
						<div class="up-comment-credentials">{{ comment.user.credentials }}</div>
						<time class="up-comment-time">{{ comment.createdAt | formatDate }}</time>
					</header>
					<p class="up-comment-content">
						{{ comment.content }}
					</p>
				</div>
			</div>
		</transition>
		<div class="up-comments-create">
			<input type="text" class="up-comments-input" placeholder="Add a comment" v-model="newComment" @keyup.enter="create">
		</div>
	</div>
</template>

<script>
/**
 * For better time and date manipulation use moment.js library
 * This could be a global dependency.
 * Or we could ditch it for native Date object.
 */
 import moment from 'moment';

 export default {
 	props: ['commentsData'],

 	data() {
 		return {
 			comments: this.commentsData,
 			hidden: false,
 			newComment: ''
 		}
 	},

 	computed: {
 		commentsCount: function () {
 			return this.comments.length;
 		},

 		sortedComments: function() {
 			return this.comments.sort( (a, b) => {
 				return moment(a.createdAt).diff(moment(b.createdAt));
 			});
 		}
 	},

 	watch: {
 		commentsData: function() {
 			this.comments = this.commentsData;
 		}
 	},

 	updated() {
 		if(!this.hidden && this.commentsCount > 0 && this.newComment.length === 0) {
 			let container = this.$refs.commentsContainer;
 			container.scrollTop = container.scrollHeight;
 		}
 	},

 	methods: {
 		create() {
 			let c = {
 				user: {
 					id: 87,
 					credentials: 'Jan Kowalski',
 					avatarPath: 'public/avatars/nXdgq0Kv.png'
 				},
 				createdAt: moment().toISOString(),
 				content: this.newComment
 			};

 			this.comments.push(c);

 			this.$emit('commentCreated', { comment: c });
			this.newComment = ''; // clear up input
			this.hidden = false; // make sure comments list is open
		},

		/* forcing transition from/to width:auto */
		rollUpEnter(el) {
			el.style.height = 'auto';
			let endHeight = getComputedStyle(el).height;
			el.style.height = '1px';
			el.offsetHeight; // force repaint
			el.style.height = endHeight;
		},

		rollUpAfterEnter(el) {
			el.style.height = 'auto';
		},

		rollUpLeave(el) {
			el.style.height = getComputedStyle(el).height;
			el.offsetHeight; // force repaint
			el.style.height = '0';
		}
	},

	filters: {
		/**
		 * Return tweeter like formatted date
		 * @param  {string} value [date to format in parsable form]
		 * @return {string}       [formatted date]
		 */
		 formatDate: function(value) {
		 	let myDate = moment(value);
			// calculate time difference from now
			let diff = moment().diff(myDate, 'minutes');
			// if date difference is less than 7 days display short date
			if(diff < 1) {
				return '1m';
			} else if(diff < 60) {
				return Math.round(diff) + 'm';
			} else if (diff < (60 * 24)) {
				return Math.round(diff/60) + 'h';
			} else if (diff < (60 * 24 * 7)) {
				return Math.round(diff / (60 * 24)) + 'd';
			}

			// else return formated date
			return myDate.format('D/MM/YY');
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

.up-comments {
	position: relative;

	display: block;
	margin-top: 1em;

	font-family: $font-family;
	font-size: 1rem;

	background: #FFFFFF;
	box-shadow: 0 0 4px 0 rgba(172,172,172,0.50);
	border-radius: 0.3125em;
}

.up-comments-toggle {
	padding: 1.5em 1.25em 1.5em 1.25em;
	margin: 0;

	text-align: center;

	@include desktop {
		text-align: left;
	}

	a {
		color: $secondary-color;

		&:hover {
			color: darken($secondary-color, 10);
		}

		&:active {
			color: darken($secondary-color, 15);
		}
	}
}

.up-comments-list {
	display: block;
	max-height: 30em;
	overflow-y: scroll;
}

.up-comment {
	font-size: 0.875em;
	padding: 2em 1.5em 1.5em 1.5em;
	border-bottom: 0.071em solid $palette-lightgray;

	&:first-child {
		padding-top: 1.25em;
	}

	&:last-child {
		border-bottom: none;
	}
}

.up-comment-header {
	position: relative;
	display: flex;
	justify-content: space-between;
	padding-left: 3.6em;
	margin-bottom: 0.25em;
	line-height: normal;

	.up-comment-avatar {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);

		display: block;
		width: 2.857em;
		height: 2.857em;
		overflow: hidden;

		border-radius: 10000px;
		background-color: $palette-lightgray;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.up-comment-credentials {
		flex-grow: 1;
		color: $primary-color;
	}

	.up-comment-time {
		color: $text-color-muted;
	}
}

.up-comment-content {
	margin: 0;
	padding-left: 3.6em;
	color: $text-color;
	line-height: 1.5;
}

.up-comments-create {
	height: 3.875em;
	padding: .75em 1.5em 0 1.5em;
	border-top: 0.0625em solid $palette-lightgray;
}

.up-comments-input {
	width: 100%;
	padding-bottom: .25em;

	border: none;
	border-bottom: 0.111em solid $palette-gray;

	color: $text-color;
	font-size: 1.125em;
	line-height: normal;

	&::placeholder {
		font-size: 1em;
		color: $text-color-muted;
		opacity: 1;
	}
}

// VUE TRANSITIONS
.roll-up-enter-active, .roll-up-leave-active {
	transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
}

.roll-up-enter, .roll-up-leave-to {
	opacity: 0;
}

.roll-up-enter-to, .roll-up-leave {
	opacity: 1;
}
</style>
<template>
	<div id="app">
		<user-profile :profileData="profileData"></user-profile>
	</div>
</template>

<script>
export default {
	name: 'app',

	data() {
		return {
			profileData: {}
		}
	},

	created() {
		/**
		 * Using native Fetch API to get mockup data
		 * We could use polyfill for extended compatibility (IE)
		 * Alternatively we could use axios if it's imported globally
		 */
		fetch('./public/mockup-data.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			this.profileData = data;
		});
	}
}
</script>

<style lang="scss">
	// Importing normalize.css, used by majority of the web
	@import '~normalize.css/normalize.css';
	
	// User profile component is responsive, it's size is derived from html font-size
	html { font-size: 16px; }
	// For better view
	body { padding: 4.375rem; }
</style>
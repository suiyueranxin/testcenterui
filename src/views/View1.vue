<template>
	<div>
		<h1>This is View1</h1>
		<a>This is View1 </a>
	</div>
</template>

<script type="text/javascript">
export default {
	name: 'View1',
	mounted: function() {
		this.$http.get('/api/category')
			.then(function(response) {
				console.log(response);
			})
			.catch(function(response) {
				console.log(response);
			});
	}
}
</script>

<style>
</style>
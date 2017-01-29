<template>
	<div id="login-form">
		<label>Username <input type="text" v-model=username></label>
		<label>Password <input type="password" v-model=password></label>
		<button @click="onSubmit">Submit</button>
		<div v-if="error" v-html="error"></div>
	</div>
</template>
<script>
	import auth from '../auth'
	module.exports = {
		data: function () {
			return {
				username: '',
				password: '',
				error: null
			}
		},
		methods: {
			onSubmit: function () {
				var ref = this;
				$.ajax({
					url: "/users/login",
					contentType: 'application/json',
					dataType: 'json',
					type: 'POST',
					processData: false,
					data: JSON.stringify({
						username: this.username,
						password: this.password
					}),
					success: function (result) {
						console.log(result);
						auth.setToken(result.token);
						auth.setData(result.type, result.username);
          				ref.$router.replace(ref.$route.query.redirect || '/');
					},
					error: function () {
						ref.error = "Invalid authentication request";
					}
				});
			}
		}
	};
</script>
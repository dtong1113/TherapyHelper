<template>
	<div id="content">
		<div class="col-sm-4"></div>
		<div class="col-xs-12 col-sm-4 inputBox">
			<h1>Sign in</h1>
			<br>
			<div class="row form-group">
				<label for="usernameInput">Username:</label>
				<input type="text" v-model="username" class="form-control"></label>
			</div>
			<div class="row form-group">
				<label for="passwordInput">Password:</label>
				<input type="password" v-model="password" class="form-control"></label>
			</div>
			<div class="row">
				<button @click="onSubmit" class="btn btn-default">Submit</button>
				<div v-if="error" v-html="error" id="error-message"></div>
			</div>
		</div>
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
				if (this.username == 'patient') {
					window.location.href = "/web/patient.html";
					return;
				}
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
          				ref.$router.replace('/dashboard');
					},
					error: function () {
						ref.error = "Invalid authentication request!";
					}
				});
			}
		},
		mounted: function () {
			$('body').css('height', '100%');
			$('body').css('background-color', '#adc2e7');
		}
	};
</script>

<style scoped>
	#error-message {
		font-size: 24px;
	}

	.inputBox {
		color: gray;
	}

	#content {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #adc2e7;
	}

	.inputBox{
		position: absolute;
		border-radius: 7%;
		padding-left: 5%;
		padding-right: 5%;
		padding-top: 5%;
		padding-bottom: 5%;
		background-color: white;
		box-shadow: 2px 2px 2px #333333;
		-webkit-transform: translate(-50%,-50%);
		  transform: translate(-50%,-50%);
		  position: absolute;
		  top: 50%;
		  left: 50%;
	}
</style>
<template>
	<div class="container" id="content">
		<h1 class="jumbotron header">Welcome {{username}}!</h1>
		<div class="row">
			<div class="top-bar col-md-8 col-md-offset-4">
				<div class="row">
					<div class="outer-tab col-md-3"><div v-on:click="setCurrTab(0)" v-bind:class="{active: 0 == currTab}" class="tab btn btn-default">Basic Info</div></div>
					<div class="outer-tab col-md-3"><div v-on:click="setCurrTab(1)" v-bind:class="{active: 1 == currTab}" class="tab btn btn-default">Questionaire Creation</div></div>
					<div class="outer-tab col-md-3"><div v-on:click="setCurrTab(2)" v-bind:class="{active: 2 == currTab}" class="tab btn btn-default">Assigned Questionaires</div></div>
					<div class="outer-tab col-md-3"><div v-on:click="setCurrTab(3)" v-bind:class="{active: 3 == currTab}" class="tab btn btn-default">Stats</div></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<div v-for="(patient, index) in patients" v-on:click="setCurrPatient(index)" v-bind:class="{active: index == currPatient}" class="patient btn btn-default">{{patient.name}}</div>
			</div>
			<div class="col-md-8">
				<div class="content">
					<div v-if="currTab == 0 && patients.length > 0">
						<table class="table table-hover">
							<tbody>
								<tr v-for="attribute in attributes">
									<th>{{attribute}}</th>
									<td>{{patients[currPatient][attribute]}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div v-if="currTab == 1" class="form-inline">
						<div v-for="question in questions">
							<input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Question" v-model="question.val"></input>
							<input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Type" v-model="question.type"></input>
						</div>
						<button v-on:click="addQuestion" class="btn btn-default">Add Question</button>
						<button v-on:click="submitQuestions" class="btn btn-default">Submit Question</button>
					</div>
					<div v-if="currTab == 2" style="margin-top: 10px">
						<div v-for="template in templates" class="bs-example">
							<div v-for="(question, index) in template.questions" class="panel panel-default well">
  								<div class="panel-heading">{{template.questions[index]}}</div>
  									<div class="panel-body">{{template.answerTypes[index]}}</div>
							</div>
						</div>
					</div>
					<div v-if="currTab == 3 && patients.length > 0">
						<table class="table table-hover">
							<tbody>
								<tr v-for="stat in stats">
									<th>{{stat}}</th>
									<td>{{patients[currPatient][stat]}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	#content {
		overflow: auto;
	}
	.bs-example {
		position: relative;
		padding: 30px 50px;
		color: black;
		border: 2px solid #dfddff;
		border-radius: 15px;
		margin: 10px 0px;
	}
	.bs-example:after {
	  content: "Questionaire";
	  position: absolute;
	  top:  10px;
	  left: 20px;
	  font-size: 12px;
	  font-weight: bold;
	  color: #black;
	  text-transform: uppercase;
	  letter-spacing: 1px;
	}
	.panel-body {
		color: black;
	}
	.form-control {
		margin: 5px 0px;
	}
	.active {
		background-color: #aeaeae;
	}
	#content {
		background-color: #adc2e7;
	}
	.btn {
		font-weight: bold;
	}
	.btn:hover {
		background-color: gray !important;
	}
	.header {
		color: black;
	}
	.top-bar {
		size: 20px;
	}
	.outer-tab {
		padding: 5px 10px;
	}
	.tab {
		width: 100%;
	}
	.patient {
		display: block !important;
		padding: 20px 0;
		margin: 10px 20%;
	}
	.table {
		color: #1a1a1a;
	}
	.table > tbody > tr:hover {
		background-color: light-gray;
	}

</style>
<script>
	import auth from "../auth.js";
	module.exports = {
		data: function () {
			return {
				type: auth.getType(),
				username: auth.getUsername(),
				patients: [],
				panelData: {},
				currTab: 0,
				currPatient: 0,
				attributes: ['name', 'address', 'age', 'gender', 'illness'],
				stats: ['points', 'streak'],
				questions: [],
				templates: []
			};
		},
		methods: {
			setCurrPatient: function (index) {
				this.currPatient = index;
				var ref = this;
				if (this.currTab == 2) {
					$.ajax({
						url: "/patient/templates?username="+ref.patients[ref.currPatient].username,
						contentType: "application/json",
						dataType: "json",
						type: "GET",
						success: function (result) {
							console.log(result);
							ref.templates = result.data;
						},
						error: function (err) {
							console.log(err);
						}
					})
				}
			},
			setCurrTab: function (index) {
				this.currTab = index;
				this.questions = [];
				this.templates = [];
				var ref = this;
				if (this.currTab == 2) {
					$.ajax({
						url: "/patient/templates?username="+ref.patients[ref.currPatient].username,
						contentType: "application/json",
						dataType: "json",
						type: "GET",
						success: function (result) {
							console.log(result);
							ref.templates = result.data;
						},
						error: function (err) {
							console.log(err);
						}
					})
				}
			},
			addQuestion: function () {
				this.questions.push({val: "", type: ""});
			},
			submitQuestions: function () {
				var qs = [];
				var as = [];
				var ref = this;
				for (var i = 0; i < this.questions.length; i++) {
					qs.push(this.questions[i].val);
					as.push(this.questions[i].type);
				}
				$.ajax({
					url: "/therapist/templates",
					contentType: 'application/json',
					dataType: 'json',
					type: 'POST',
					data: JSON.stringify({
						questions: qs,
						answerTypes: as
					}),
					processData: false,
					success: function (result) {
						console.log(result);
						var uuid = result.uuid;
						$.ajax({
							url: "/therapist/user/templates",
							contentType: 'application/json',
							dataType: 'json',
							type: 'POST',
							data: JSON.stringify({
								patientUsername: ref.patients[ref.currPatient].username,
								templateUuid: uuid
							}),
							processData: false,
							success: function (result) {
								console.log(result);
							},
							error: function (err) {
								console.log(err);
							}
						})
					},
					error: function (err) {
						console.log(err);
					}
				});
				this.questions = [];
			}
		},
		mounted: function () {
			$('body').css('height', '100%');
			$('body').css('background-color', '#adc2e7');
			var ref = this;
			if (this.type == 0) {
				$.ajax({
					url: "/therapist/patients",
					contentType: 'application/json',
					dataType: 'json',
					type: 'GET',
					processData: false,
					success: function (result) {
						ref.patients = result.data;
						console.log(result.data);
					},
					error: function (err) {
						console.log(err);
					}
				});
			}
		}
	}
</script>
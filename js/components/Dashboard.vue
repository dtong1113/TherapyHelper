<template>
	<div>
		<h1>Welcome {{username}}</h1>
		<div class="side-bar">
			<div v-for="(patient, index) in patients" v-on:click="setCurrPatient(index)">{{patient.name}}</div>
		</div>
		<div class="top-bar">
			<div v-on:click="setCurrTab(0)">Basic Info</div>
			<div v-on:click="setCurrTab(1)">Forms</div>
			<div v-on:click="setCurrTab(2)">Tab 3</div>
			<div v-on:click="setCurrTab(3)">Tab 4</div>
		</div>
		<div class="content">
			<div v-if="currTab == 0 && patients.length > 0">
				<div v-for="attribute in attributes">
					{{attribute}}: {{patients[currPatient][attribute]}}
				</div>
			</div>
			<div v-if="currTab == 1">
				<div v-for="question in questions">
					<input type="text" placeholder="Question" v-model="question.val"></input>
					<input type="text" placeholder="Type" v-model="question.type"></input>
				</div>
				<button v-on:click="addQuestion">Add Question</button>
				<button v-on:click="submitQuestions">Submit Question</button>
			</div>
		</div>
	</div>
</template>
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
				questions: []
			};
		},
		methods: {
			setCurrPatient: function (index) {
				this.currPatient = index;
			},
			setCurrTab: function (index) {
				this.currTab = index;
				this.questions = [];
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
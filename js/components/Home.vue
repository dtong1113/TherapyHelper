<template>
	<div id="content">
	<div id="feature">
		<div class="midcontainer">
			<h1 id="maintitle">Wellness Peak</h1>
			<p id="slogan"><em>A better you awaits at the peak</em></p>
			<router-link to="/login" class="btn">Let's Get Started!</router-link>
		</div>
	</div>
	<div class="info">
		<h2 class="subheading" style="font-size: 8vh">For Patients</h2>
	<div class="luke">
		<div class="col-xs-12 col-sm-4">
			<img src="/web/img/lock.png" class="image img-responsive">
			<h2 class="title">Private</h2>
			<p class="pinfo">Complete your homework discreetly and know that only you and your therapist can see what you write.</p>
		</div>
		<div class="col-xs-12 col-sm-4">
			<img src="/web/img/game.png" class="image img-responsive">
			<h2 class="title">Engaging</h2>
			<p class="pinfo">Your wellness, the game - have fun and track your progress as you work through exercises.</p>
		</div>
		<div class="col-xs-12 col-sm-4">
		<img src="/web/img/stream.png" class="image img-responsive">
			<h2 class="title">Streamlined</h2>
			<p class="pinfo">Rest easy knowing that your therapist is with you every step of the way.</p>
		</div></div>
	</div>
	<div class="parallax-container" data-parallax="scroll" data-position="top" data-bleed="10" data-image-src="web/img/bg2.jpg" data-natural-width="1400" data-natural-height="900"></div>

	<div class="info">
		<h2 class="subheading" style="font-size: 8vh">For Therapists</h2>
	<div class="luke">
		<div class="col-xs-12 col-sm-4">
			<img src="/web/img/talk.png" class="image img-responsive">
			<h2 class="title">Communicative</h2>
			<p class="pinfo">Talk to your patients anytime, anywhere, right from your therapist dashboard.</p>
		</div>
		<div class="col-xs-12 col-sm-4">
			<img src="/web/img/chart.png" class="image img-responsive">
			<h2 class="title">Analytical</h2>
			<p class="pinfo">All the homework answers, in one place - look for and spot red flags and target the issues before they occur.</p>
		</div>
		<div class="col-xs-12 col-sm-4">
		<img src="/web/img/gears.png" class="image img-responsive">
			<h2 class="title">Customizable</h2>
			<p class="pinfo">No two treatments are the same - change up the exercises based on each specific patients' needs.</p>
		</div></div>
	</div>

	
	<footer class="container">
		<div class="row">
			<div class="col-sm-8">
				<p>&copy; 2017</p>
			</div>
			<div class="col-sm-2"></div>
			<div class="col-sm-1">
				<p><a href="about.html">About</a></p>
			</div>
			<div class="col-sm-1">
				<p><a href="contact.html">Contact</a></p>
			</div>
		</div>
	</footer>
</div>
</template>
<script>
	module.exports = {
		mounted: function () {
			$('body').css('height', 'auto');
			$('body').css('background-color', 'none');
		}
	};
</script>
<style scoped>
a{
	color:white;
}

a:hover{
	color:white;
	text-decoration: none;
}

#maintitle {
	text-align: center;
	color: white;
	font-size: 20vh;
}
#slogan {
	margin-top: -3%;
	font-size: 4vh;
	font-weight: 600;
	color: #000000;
}
/*header*/
.btn {
	background-color: #1a1a1a;
	color: #fff;
	font-size: 6vh;
	padding: 8px 30px;
	text-decoration: none;
	text-align: center;
	border-radius: 10px;
	display: inline-block;
}
.btn:hover {
	background-color: #3d3d3d;
	color: #fff;
}
.midcontainer {
	padding-top: 15%;
}
/*bullet points*/
.subheading, .luke {
	text-align: center;
	padding-top: 2%;
}
.info {
	height: 350px;
}
.image {
	margin: 0 auto;
	width: 20%;
	height: 20%;
}
#feature {
	background: url("/web/img/bg.jpg") no-repeat center center;
	background-size: cover;
	height: 600px;
	width: 100%;
	text-align: center;
	z-index: 100;
}

footer{
	font-size: 3vh;
	color: white;
	text-decoration: 
}


.title, .pinfo {
	text-align: center;
}
/*Feature2*/
#feature2 {
	height: 40%;
	width: 100%;
}

.parallax-container {
  height: 300px;
  width: 100%;
}
</style>
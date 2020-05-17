<template>
  <div id="app">
  <div id="nav">
  <header>
    <div class="contejner">

            <!-- Brand/logo -->
            <div class="work">
              <router-link to="/"><h1><strong>Work from<span class="home"> home</span></strong></h1></router-link>
            </div>

            <nav>
        
              <!-- Links -->
            
              <ul>
                <li><router-link  to="/"><img id="home" src="home.png">Home</router-link></li>
                <li><router-link  to="/Naslovna">Naslovna</router-link></li>
                <li><router-link  to="/Prijava"><img id="login" src="login.png">Sign in</router-link></li>
                <li><router-link  to="/Registracija_zaposlenik"><img id="registration" src="register.png">Sign up</router-link></li>
                <li><router-link  to="/mojprofil"><img id="profil" src="profile.png">My profile</router-link></li>
                <li><router-link   to="/About"><img id="about" src="about.png">About us</router-link></li>
                <li><router-link   to="/PostJob">Post Job</router-link></li>
                <li><a @click.prevent="logout" href="#"><img id="logout" src="logout.png">Logout</a></li>
              </ul>

            </nav>
    </div>
  </header>
  <div class="crta"></div> 
  </div>
  <router-view/>
    <section id="footer">
		<div class="container">
			<div class="row text-center">
				<div class="col-xs-12 col-sm-6">
					<h3 style="margin-top: 5%;"><strong>Guide map</strong></h3>
					<ul class="list-unstyled quick-links" style="color: white; font-size: 22px">
						<li><router-link  to="/">Home</router-link></li>
            <li><router-link  to="/mojprofil">My profile</router-link></li>
            <li><router-link   to="/PostJob">Post Job</router-link></li>
            <li><router-link   to="/About">About us</router-link></li>
            <li><a href="#">Logout</a></li>
					</ul>
				</div>
				<div class="col-xs-12 col-sm-6">
					<h3 style="margin-top: 5%;"><strong>Find me</strong></h3>
					<ul class="list-unstyled quick-links" style="color: white; font-size: 18px">
						<li><a href="#"><i class="fa fa-instagram" style="font-size: 20px"></i> Instagram</a></li>
						<li><a href="#"><i class="fa fa-facebook" style="font-size: 20px"></i> Facebook</a></li>
						<li><a href="#"><i class="fa fa-twitter" style="font-size: 20px"></i> Twitter</a></li>
					</ul>
				</div>
			</div>	
		</div>
    <p><strong>Work from home application 2020</strong></p>	
	</section>
  </div>    
</template>

<style lang="scss">

  #home{
  margin-right: 10px;
  height: 35px;
  width: 40px;
}
  #login{
  margin-right: 10px;
  height: 35px;
  width: 40px;
}
 #registration{
  margin-right: 10px;
  height: 35px;
  width: 40px;
}
 #profil{
  margin-right: 10px;
  height: 35px;
  width: 40px;
}
#search{
  margin-right: 10px;
  height: 35px;
  width: 40px;
}

 #about{
  margin-right: 10px;
  height: 35px;
  width: 40px;
}
#logout{
  margin-right: 10px;
  height: 35px;
  width: 40px;
}
.contejner{
	width: 95%;
	margin: auto;
	overflow: hidden;
	position: relative;
}
header{
  background:rgb(148, 197, 185);
	margin: 0;
	min-height: 70px;
  width: 100%;

}

.home{
  color: white;
}

.crta{
	background:rgb(55, 86, 116);
	height: 4px;
	width: 100%;
}

.work{
  float: left;
	margin: 15px 0;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

nav{
  margin-top: 30px;
}

nav ul{
	float: right;
	padding: 0;
  margin: 0;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}


nav ul li {
	padding: 0 15px;
  display: inline;
	font-size: 25px;
}

#footer {
  left: 0;
  bottom: 0;
  width: 100%;
  position: relative;


	padding: 0.2%;
	color: white;
	background-color: rgb(148, 197, 185); 
	text-align: center;
	font-size: 20px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.bottom{
  color: white;
}
section {
    padding: 40px 0;
}

#footer a {
    color: #ffffff;
    text-decoration: none !important;
    -webkit-text-decoration-skip: objects;
}

#footer ul.social li a i {
    margin-right: 5px;
	-webkit-transition: .5s all ease;
	-moz-transition: .5s all ease;
	transition: .5s all ease;
}
#footer ul.social li:hover a i {
	margin-top:-10px;
}

#footer ul.quick-links li{
	padding: 3px 0;
	-webkit-transition: .5s all ease;
	-moz-transition: .5s all ease;
	transition: .5s all ease;
}
#footer ul.quick-links li:hover{
	padding: 3px 0;
	margin-left:5px;
	font-weight:700;
}
section p {
	text-align: center; 
	font-size: 25px;
	color: white;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  

}
 
#nav {
  

  a{
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: grey;
    }
  }
}
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 100px; /* Should be removed. Only for demonstration */
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
* {
  box-sizing: border-box;
}
</style>
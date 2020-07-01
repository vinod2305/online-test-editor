<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="heading">Online Test Editor</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background: #fffafa;
  margin: 0;
}

#app {
  font-family: "Open Sans", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fffafa;
}

#nav {
  padding: 20px;
  background-color: #ffffff;
  overflow: hidden;
  border-bottom: 0.8px solid #ececf0;
  width: auto;
  margin-bottom: 30px;


  .heading{
      font-size: 30px;
      text-align: left;
      text-decoration: none;
      color: black;
      font-weight: bold;
  }
  
  
}
@media only screen and (max-width: 768px) {
  #nav{
    width: auto !important;
    padding: 15px;
    .heading{
      font-size: 23px;
    }
  }
}
</style>

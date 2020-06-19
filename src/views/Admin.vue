<template>
  <div class="frame">
    <h2 class="heading">Admin</h2>
    <form @submit.prevent="checkUser">
      <div class="search">
        <label for="email" class="searchfield">Email</label>
        <div>
          <input type="email" name="email" id="email" class="input" v-model="email" />
        </div>
      </div>

      <div class="search">
        <label for="password" class="searchfield">Password</label>
        <input type="password" name="password" id="password" class="input" v-model="password" />
      </div>

      <div>
        <button type="submit" class="login-button" @click="checkUser">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    checkUser() {
      
      if (this.email != "" && this.password != "") {
        if(this.email == "test@test.com" && this.password == "test"){
          localStorage.setItem("loggedadmin", "true");
          this.$router.push("/adminpage");
        }
        else{
            localStorage.setItem("loggedadmin", "false");
            alert("Enter proper credential");
            this.$router.push("/admin");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:600);

.search {
  margin-top: 10px;
  .searchfield {
    border-radius: 0;
    border: 0;
    display: inline-block;
    max-width: 100%;
    font-size: 20px;
  }
  .input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 300px;
    border-radius: 5px;
    background: rgb(240, 240, 240);
    color: #2a3036;
    font-size: 18px;
    padding: 7px;
    outline: 0;
    max-width: 100%;
    
  }
}
.login-button {
  background: rgb(236, 236, 236);
  color: #444444;
  display: block;
  width: 150px;
  height: 50px;
  border-radius: 25px;
  text-align: center;
  line-height: 46px;
  text-transform: uppercase;
  font-weight: 600;
  box-sizing: border-box;
  border-radius: 25px;
  display: inline-block;
  border-style: none;
  margin-top: 20px;
}
.heading {
  font-weight: bold;
  font-size: 30px;
  margin: 0px;
  font-weight: 600;
    font-size: 40px;
    line-height: 30px;
}
.frame {
  position: absolute;
  left: 50%;
  transform: translateX(-200px);
  width: 400px;
  border-radius: 5px;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  padding: 20px;
  background: #ffffff;
  color: #497081;
      
  font-family: "Open sans", Helvetica, sans-serif;
}
</style>
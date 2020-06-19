<template>
  <div class="admin">
    <h2 class="admin">Admin</h2>
    <form @submit.prevent="checkUser">
      <div class="search">
        <label for="email" class="searchfield">Email</label>
        <div>
          <input type="email" name="email" id="email" class="button" v-model="email" />
        </div>
      </div>

      <div class="search">
        <label for="password" class="searchfield">Password</label>
        <input type="password" name="password" id="password" class="button" v-model="password" />
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
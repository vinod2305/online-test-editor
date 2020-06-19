<template>
  <div class="frame">
    <h2 class="heading">Teacher</h2>
    <form @submit.prevent="checkUser">
      <div class="search">
        <label for="section" class="searchfield">Section</label>
        <div>
          <select v-model="section" class="button1select">
            <option disabled value>Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
      </div>

      <div class="search">
        <label for="name" class="searchfield">Teacher Name</label>
        <input type="text" name="name" id="name" class="input" v-model="name" />
      </div>
      <div class="search">
        <label for="coursecode" class="searchfield">Course Code</label>
        <input type="text" name="coursecode" id="coursecode" class="input" v-model="coursecode" />
      </div>

      <div>
        <button type="submit" class="login-button" @click="checkUser">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Teacherlogin",
  mounted() {
    this.$store.dispatch("setCourses").then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    this.$store.dispatch("setTeacher").then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  },
  data() {
    return {
      section: "",
      name: "",
      coursecode: ""
    };
  },
  methods: {
    checkUser() {
      if (this.section != "" && this.name != "") {
        var teachernamelist = [];
        var courselist = [];
        for (var i = 0; i < this.$store.getters.getTeacherlist.length; i++) {
          teachernamelist = [
            ...teachernamelist,
            this.$store.getters.getTeacherlist[i].teachername
          ];
        }
        for (var j = 0; j < this.$store.getters.getCourselist.length; j++) {
          courselist = [
            ...courselist,
            this.$store.getters.getCourselist[j].coursecode
          ];
        }
        if (
          teachernamelist.includes(this.name) &&
          courselist.includes(this.coursecode)
        ) {
          localStorage.setItem("coursecode", this.coursecode);
          localStorage.setItem("loggedteacher", "true");
          this.$router.push("/question");
        } else {
          alert("Enter proper credentials");
          this.section = "";
          this.name = "";
          this.coursecode = "";
          localStorage.setItem("loggedteacher", "false");
          localStorage.setItem("coursecode", "");
          this.$router.push("/teacherlogin");
        }
      } else {
        localStorage.setItem("loggedteacher", "false");
        localStorage.setItem("coursecode", "");
        this.$router.push("/teacherlogin");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:600);

.search {
  margin-top: 15px;
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

.button1select{
    z-index: 10;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 365px;
    height: 20px;
    border-radius: 5px;
    background: #fff;
    font-size: 15px;
    outline: 0;
    max-width: 100%;
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
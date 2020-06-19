<template>
  <div class="teacher">
    <h2 class="teacher">Teacher</h2>
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
        <label for="name" class="searchfield">Name</label>
        <input type="text" name="name" id="name" class="button" v-model="name" />
      </div>
      <div class="search">
        <label for="coursecode" class="searchfield">Course Code</label>
        <input type="text" name="coursecode" id="coursecode" class="button" v-model="coursecode" />
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
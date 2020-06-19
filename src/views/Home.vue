<template>
  <div class="home">
    <form @submit.prevent="addStudent">
      <div class="search">
        <label for="usn" class="searchfield">USN</label>
        <input type="text" name="usn" id="usn" class="button" v-model="usn" />
      </div>

      <div class="search">
        <label for="name" class="searchfield">Name</label>
        <input type="text" name="name" id="name" class="button" v-model="name" />
      </div>
      <div class="search">
        <label for="section" class="searchfield">Section</label>
        <input type="text" name="section" id="section" class="button" v-model="section" />
      </div>

      <div>
        <button type="submit" class="login-button" @click="addStudent">Enter</button>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  mounted() {
    this.$store.dispatch("setCourses").then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.$store.dispatch("setTeacher").then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.$store.dispatch("setQuestionlist").then(
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
      usn: "",
      name: "",
      section: ""
    };
  },
  methods: {
    addStudent() {
      if (this.usn != "" && this.name != "" && this.section != "") {
        this.$store
          .dispatch("addStudent", {
            usn: this.usn,
            name: this.name,
            section: this.section
          })
          .then(() => {})
          .catch(
            err => console.log(err),
            localStorage.setItem("loggeduser", "false"),
            this.$router.push("/"),
            (this.usn = ""),
            (this.name = ""),
            (this.section = "")
          );
        (this.usn = ""), (this.name = ""), (this.section = "");
      }
    }
  }
};
</script>

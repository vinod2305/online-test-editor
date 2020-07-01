<template>
  <div class="frame">
    <h2 class="heading">Details</h2>
    <form @submit.prevent="addStudent">
      <div class="search">
        <label for="usn" class="searchfield">USN</label>
        <input type="text" name="usn" id="usn" class="input" v-model="usn" />
      </div>

      <div class="search">
        <label for="name" class="searchfield">Name</label>
        <input type="text" name="name" id="name" class="input" v-model="name" />
      </div>
      <div class="search">
        <label for="section" class="searchfield">Section</label>
        <input type="text" name="section" id="section" class="input" v-model="section" />
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
  beforeCreate(){
    this.$store.dispatch("setStudentlist").then(
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
     this.usn = this.usn.toLowerCase();
      if (this.usn != "" && this.name != "" && this.section != "") {
        for(var x=0;x<this.$store.getters.getStudentlist.length;x++){
            if(this.$store.getters.getStudentlist[x].usn == this.usn){
              localStorage.setItem("id", this.$store.getters.getStudentlist[x].id);
              localStorage.setItem("loggeduser", "true");
              localStorage.setItem("question", this.$store.getters.getStudentlist[x].question);
          this.$router.push("/details");
          return
            }
        }
        this.$store
          .dispatch("addStudent", {
            usn: this.usn,
            name: this.name,
            section: this.section
          })
          .then(() => {
            this.$store.dispatch("studentLogin");
          })
          .catch(
            err => console.log(err),
            localStorage.setItem("loggeduser", "false"),
            this.$store.dispatch("studentLogout"),
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
    width: 100%; 
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
  margin: 0 0 10px 0;
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

@media only screen and (max-width: 768px) {
  .frame{
    margin: auto;
  width: 70%;
    position: relative;
  left: 0;
  transform: translateX(0px);
  border-radius: 5px;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  padding: 20px;
  background: #ffffff;
  color: #497081;
  font-family: "Open sans", Helvetica, sans-serif;
  }
  .heading{
    font-size: 30px;
  }
  .search .searchfield{
    font-size: 18px;
  }
  .search .input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%; 
    border-radius: 5px;
    background: rgb(240, 240, 240);
    color: #2a3036;
    font-size: 18px;
    padding: 3px;
    outline: 0;
    max-width: 100%;
    
  }
}
</style>

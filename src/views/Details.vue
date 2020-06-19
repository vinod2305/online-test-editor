<template>
  <div class="details">
    <form @submit.prevent="addDetails">
      <div class="search">
        <label for="usn" class="searchfield">Course Code</label>
        <select v-model="coursecode">
          <option
            v-for="item in this.$store.getters.getCourselist"
            :key="item.id"
            v-bind:value="item.coursecode"
          >{{ item.coursecode }}</option>
        </select>
      </div>

      <div class="search">
        <label for="name" class="searchfield">Teacher Name</label>
        <select v-model="teachername">
          <option
            v-for="item in this.$store.getters.getTeacherlist"
            :key="item.id"
            v-bind:value="item.teachername"
          >{{ item.teachername }}</option>
        </select>
      </div>
      <div>
        <button type="submit" class="login-button" :disabled="this.press" @click="addDetails">Get Questions</button>
      </div>
    </form>
    <div class="question" id="question"></div>

    <button type="submit" class="login-button" :disabled="this.start" @click="addQuestion">Start</button>
  </div>
</template>

<script>
import { db } from "@/main";
// @ is an alias to /src

export default {
  name: "Deatils",
  data() {
    return {
      coursecode: "",
      teachername: "",
      teacherslist: [],
      courselist: [],
      question: "",
      press: false,
      start: true
    };
  },
  methods: {
    addDetails() {
      if (this.coursename != "" && this.teachername != "") {
        db.collection("studentlist")
          .doc(localStorage.getItem("id"))
          .update({
            coursecode: this.coursecode,
            teachername: this.teachername
          })
          .then(response => {
            if (response) {
              // eslint-disable-next-line no-console
              
              console.log(response);
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
          this.press = true;
          this.fetchquestion();
      }
    },
    fetchquestion(){
      let questionlist = this.$store.getters.getQuestionlist.filter(item => item.coursecode == this.coursecode);
      console.log(questionlist);
      let x =Math.floor(Math.random() * questionlist.length)
      console.log(x)
      this.question = questionlist[x];
      console.log(this.question)
      document.getElementById("question").innerHTML = this.question.question;
      this.start = false;

    },
    addQuestion(){
       db.collection("studentlist")
          .doc(localStorage.getItem("id"))
          .update({
            question: this.question.question
          })
          .then(response => {
            if (response) {
              // eslint-disable-next-line no-console
              
              console.log(response);
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
        this.$router.push("/editor");
    }
  }
};
</script>

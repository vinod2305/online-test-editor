<template>
  <div class="frame">
    <form @submit.prevent="addDetails">
      <div class="search">
        <label for="usn" class="searchfield">Course Code</label>
        <select v-model="coursecode" class="button1select">
          <option
            v-for="item in this.$store.getters.getCourselist"
            :key="item.id"
            v-bind:value="item.coursecode"
          >{{ item.coursecode }}</option>
        </select>
      </div>

      <div class="search">
        <label for="name" class="searchfield">Teacher Name</label>
        <select v-model="teachername" class="button1select">
          <option
            v-for="item in this.$store.getters.getTeacherlist"
            :key="item.id"
            v-bind:value="item.teachername"
          >{{ item.teachername }}</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          v-bind:class="{ 'login-button1' : this.press, 'login-button2': !this.press }"
          :disabled="this.press"
          @click="addDetails"
        >Get Questions</button>
      </div>
    </form>
    <div class="questionheading">Question</div>
    <div class="question" id="question"></div>

    <button
      type="submit"
      class="login-button"
      v-bind:class="{ 'login-button1' : this.start, 'login-button2': !this.start }"
      :disabled="this.start"
      @click="addQuestion"
    >Start</button>
  </div>
</template>

<script>
import { db } from "@/main";
// @ is an alias to /src

export default {
  name: "Deatils",
  mounted() {
    this.$store.dispatch("setStudent").then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    if (localStorage.getItem("question") != "") {
      if (localStorage.getItem("question") == "undefined") {
        return;
      }

      this.press = true;
      this.start = false;
      document.getElementById("question").innerHTML = localStorage.getItem(
        "question"
      );
      this.question = { question: localStorage.getItem("question") };
    }
  },
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
              console.log(response);
            }
          })
          .catch(error => {
            console.log(error);
          });
        this.press = true;
        this.fetchquestion();
      }
    },
    fetchquestion() {
      let questionlist = this.$store.getters.getQuestionlist.filter(
        item => item.coursecode == this.coursecode
      );
      let x = Math.floor(Math.random() * questionlist.length);
      this.question = questionlist[x];
      document.getElementById("question").innerHTML = this.question.question;
      localStorage.setItem("question", this.question.question);
      this.start = false;
    },
    addQuestion() {
      db.collection("studentlist")
        .doc(localStorage.getItem("id"))
        .update({
          question: this.question.question
        })
        .then(response => {
          if (response) {
            console.log(response);
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.$router.push("/editor");
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
.questionheading {
  margin-top: 20px;
  font-weight: 400;
  font-size: 20px;
}
.button1select {
  z-index: 10;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 165px;
  height: 20px;
  border-radius: 5px;
  background: #fff;
  font-size: 15px;
  outline: 0;
  max-width: 100%;
}
.question {
  color: rgb(0, 0, 0);
  margin-top: 10px;
  font-size: 25px;
}
.login-button1 {
  background: rgb(220, 225, 252);
  color: #fffefe;
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
.login-button2 {
  background: rgb(87, 111, 245);
  color: #fffefe;
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
  .question{
    font-size: 20px;
  }

  .search .searchfield{
    font-size: 18px;
  }
  .questionheading{
    font-size: 18px;
  }
}
</style>
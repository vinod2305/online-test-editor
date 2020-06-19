<template>
  <div class="content">
    <button @click="logout" class="logout" style="right: 0; position: absolute;">Logout</button>
    <div class="frame">
      <div class="list">
        <div class="head">
          <div class="titilehead">Questions</div>
        </div>
        <div class="inputbar">
          <textarea v-model="question" placeholder="add question"></textarea>
        </div>
        <button @click="addQuestion" class="add">Add</button>
        <div
          v-if="
            this.$store.getters.getQuestion &&
              this.$store.getters.getQuestion.length > 0
          "
        >
          <div v-for="item in this.$store.getters.getQuestion" :key="item.id" class="titles">
            <div class="task">{{ item.question }}</div>
            <small @click="deleteQuestion(item.id)" class="delete">
              <img src="https://img.icons8.com/material-sharp/24/000000/delete-forever.png" />
            </small>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    this.$store.dispatch("setQuestion").then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  },
  data: function() {
    return {
      question: ""
    };
  },
  methods: {
    addQuestion() {
      if (this.question != "") {
        this.$store.dispatch("addQuestion", {
          question: this.question,
          coursecode: localStorage.getItem("coursecode"),
          created_at: Date.now()
        });
        this.question = "";
      }
    },
    deleteQuestion(id) {
      if (id) {
        this.$store.dispatch("deleteQuestion", id);
      }
    },
    logout(){
    this.$router.push("/teacherlogin");
    localStorage.setItem("loggedteacher", "false");      
  }
  }
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:600);
input,
button {
  border: 0;
  width: 100%;
  margin: 0 0 10px;
  padding: 7px;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.3);
}
input {
  font-size: 12px;
}

.logout{
  background: #e72c2c;
  margin-left: 80%;
  color: #fff;
  width: 100px;
  height: 35px;
  border-radius: 25px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  box-sizing: border-box;
  border-radius: 25px;
  border-style: none;
}
.titles {
  display: flex;
  width: 97%;
  margin: 0 10px 15px;
  padding-top: 3px;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.content {
  display: flex;
  width: 100%;
}
.task {
  flex: 10;
  margin-left: 10px;
  text-align: left;
  line-height: 35px;
}
.delete {
  flex: 2;
  transform: translateY(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.frame {
  position: absolute;
  width: 650px;
  height: 800px;
  left: 50%;
  transform: translateX(-325px);
  border-radius: 3px;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
  font-family: "Open Sans", Helvetica, sans-serif;
  color: #497081;
}
.inputbar {
  margin-top: 15px;
  
  textarea{
    padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
    width: 600px;
    height: 100px;
    padding: 10px;
  }
}
.button1select {
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
.add {
  background: #5ca4ea;
  color: #fff;
  width: 100px;
  height: 35px;
  border-radius: 25px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  box-sizing: border-box;
  border-radius: 25px;
  border-style: none;
}
.list {
  position: absolute;
  width: 100%;
  height: 780px;
  background: #ffffff;
  border-radius: 3px;
  .head {
    padding: 20px 0;
    margin: 0 30px;
    border-bottom: 1px solid #d4dce0;
  }
  .titilehead {
    font-weight: 600;
    font-size: 40px;
    line-height: 30px;
    text-align: center;
  }
  ul {
    list-style: none;
    padding: 4px 0;
    margin: 0 30px;
  }
  li {
    position: relative;
    display: block;
    height: 14px;
    margin: 24px 0;
  }
  .text {
    float: left;
    font-size: 13px;
    line-height: 14px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .button {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    float: right;
    cursor: pointer;
    transition: all 0.4s ese-out 0.5s;
  }
  input {
    &:checked ~ .text {
      color: #c8d4d9;
    }
  }
}

</style>

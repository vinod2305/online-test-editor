<template>
  <div class="content">
    <button @click="logout" class="add1" style="right: 0; position: absolute;">Logout</button>
    <div class="frame1">
      <div class="list">
        <div class="head">
          <div class="titilehead">Course List</div>
        </div>
        <div class="inputbar">
          Semester
          <select v-model="coursesem" class="button1select" >
            <option disabled value="">Please select one</option>
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
          </select>
        </div>
        <div class="inputbar">
          Course Code
          <input v-model="coursecode" class="button1" />
        </div>
        <div class="inputbar">
          Course Name
          <input v-model="coursename" class="button1" />
        </div>
        <button @click="addCourse" class="add">Add</button>
        <div
          v-if="
            this.$store.getters.getCourselist &&
              this.$store.getters.getCourselist.length > 0
          "
        >
          <div
            v-for="item in this.$store.getters.getCourselist"
            :key="item.id"
            class="titles"
          >
            <div class="task">{{ item.coursesem }}</div>
            <div class="task">{{ item.coursecode }}</div>
            <div class="task">{{ item.coursename }}</div>
            <small @click="deleteCourse(item.id)" class="delete">
              <img
                src="https://img.icons8.com/material-sharp/24/000000/delete-forever.png"
              />
            </small>
            <br />
          </div>
        </div>
      </div>
    </div>
    <div class="frame2">
      <div class="list">
        <div class="head">
          <div class="titilehead">Teachers List</div>
        </div>
        <div class="inputbar">
          Semester
          <select v-model="teachersem" class="button1select" >
            <option disabled value="">Please select one</option>
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
          </select>
        </div>
        <div class="inputbar">
          Section
          <select v-model="teachersect" class="button1select" >
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
        <div class="inputbar">
          Name
          <input v-model="teachername" class="button1" />
        </div>
        <button @click="addTeacher" class="add">Add</button>
        <div
          v-if="
            this.$store.getters.getTeacherlist &&
              this.$store.getters.getTeacherlist.length > 0
          "
        >
          <div
            v-for="item in this.$store.getters.getTeacherlist"
            :key="item.id"
            class="titles"
          >
            <div class="task">{{ item.teachersem }}</div>
            <div class="task">{{ item.teachersect }}</div>
            <div class="task">{{ item.teachername }}</div>
            <small @click="deleteTeacher(item.id)" class="delete">
              <img
                src="https://img.icons8.com/material-sharp/24/000000/delete-forever.png"
              />
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
  },
  data: function() {
    return {
      coursecode: "",
      coursename: "",
      coursesem: "",
      teachersem: "",
      teachersect: "",
      teachername: "",
    };
  },
  methods: {
    addTeacher() {
      if (
        this.teachersem != "" &&
        this.teachersect != "" &&
        this.teachername != ""
      ) {
        this.$store.dispatch("addTeacher", {
          teachersem: this.teachersem,
          teachersect: this.teachersect,
          teachername: this.teachername,
          created_at: Date.now(),
        });
        this.teachersem = "";
        this.teachersect = "";
        this.teachername = "";
      }
    },
    deleteCourse(id) {
      if (id) {
        this.$store.dispatch("deleteCourse", id, { root: true });
      }
    },
    addCourse() {
      if (
        this.coursecode != "" &&
        this.coursename != "" &&
        this.coursesem != ""
      ) {
        this.$store.dispatch("addCourse", {
          coursecode: this.coursecode,
          coursename: this.coursename,
          coursesem: this.coursesem,
          created_at: Date.now(),
        });
        this.coursecode = "";
        this.coursename = "";
        this.coursesem = "";
      }
    },
    deleteTeacher(id) {
      if (id) {
        this.$store.dispatch("deleteTeacher", id, { root: true });
      }
    },
    logout(){
    this.$router.push("/admin");
    localStorage.setItem("loggedadmin", "false");      
  }
  },
  
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
.titile {
  font-size: 25px;
  font-weight: 700;
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
  border-bottom: 1px solid #666;
  margin: 20px;
}
.titles {
  display: flex;
  width: 100%;
  margin: 0 0 10px;
  padding-top: 3px;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
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
}
.frame1 {
  position: absolute;
  width: 400px;
  height: 800px;
  top: 40%;
  left: 10%;
  margin: -200px 0 0 0px;
  border-radius: 3px;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
  font-family: "Open Sans", Helvetica, sans-serif;
  color: #497081;
}
.frame2 {
  position: absolute;
  width: 400px;
  height: 800px;
  top: 40%;
  right: 10%;
  margin: -200px 0 0 0px;
  border-radius: 3px;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
  font-family: "Open Sans", Helvetica, sans-serif;
  color: #497081;
}
.inputbar {
  margin-top: 0px;
  margin-left: 3px;
  .button1 {
    z-index: 10;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 365px;
    height: 20px;
    border-radius: 5px;
    background: #fff;
    font-size: 20px;
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
.add1{
  background: #5ca4ea;
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
  width: 380px;
  height: 780px;
  top: 10px;
  left: 10px;
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
@media only screen and (max-width: 450px) {
  .list {
    background: #fda231;
    background: -webkit-linear-gradient(bottom left, #fda231 0%, #fdca31 100%);
    background: -moz-linear-gradient(bottom left, #fda231 0%, #fdca31 100%);
    background: -o-linear-gradient(bottom left, #fda231 0%, #fdca31 100%);
    background: linear-gradient(to top right, #fda231 0%, #fdca31 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FDA231', endColorstr='#FDCA31',GradientType=1 );
    color: #497081;
  }
  .titles {
    display: flex;
    width: 95%;
    margin-left: 2%;
    margin-bottom: 10px;
    padding: 7px;
    box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background: #fff;
  }
}
</style>

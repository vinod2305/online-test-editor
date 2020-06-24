import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";
// eslint-disable-next-line no-unused-vars
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    courselist: [],
    teacherlist: [],
    questionlist: [],
    question: [],
    studentDetails: [],
    teacherlogin: false,
    adminlogin: false,
    studentlogin: false,
  },
  getters: {
    getCourselist: (state) => {
      return state.courselist;
    },
    getTeacherlist: (state) => {
      return state.teacherlist;
    },
    getQuestionlist: (state) => {
      return state.questionlist;
    },
    getQuestion: (state) => {
      return state.question;
    },
    getStudent: (state) => {
      return state.studentDetails;
    },
    getStudentlog: (state) => {
      return state.studentlogin;
    },
  },
  mutations: {
    addCourse(state, items) {
      state.courselist = [...state.courselist, items];
    },
    deleteCourse(state, id) {
      state.courselist = state.courselist.filter((item) => item.id != id);
    },
    setCourses(state, items) {
      state.courselist = items;
    },
    addTeacher(state, items) {
      state.teacherlist = [...state.teacherlist, items];
    },
    deleteTeacher(state, id) {
      state.teacherlist = state.teacherlist.filter((item) => item.id != id);
    },
    setTeacher(state, items) {
      state.teacherlist = items;
    },
    addQuestion(state, items) {
      state.questionlist = [...state.questionlist, items];
    },
    deleteQuestion(state, id) {
      state.questionlist = state.questionlist.filter((item) => item.id != id);
    },
    setQuestion(state, items) {
      var useritem = items.filter(
        (item) => item.coursecode == localStorage.getItem("coursecode")
      );
      state.question = useritem;
    },
    setQuestionlist(state, items) {
      state.questionlist = items;
    },
    setStudent(state, items) {
      state.studentDetails = items;
    },
    addStudent(state, items) {
      state.studentID = items;
    },
    studentLogin(state){
      state.studentlogin = true;
    },
    studentLogout(state){
      state.studentlogin = false;
    }

  },
  actions: {
    addCourse({ commit }, payload) {
      commit("addCourse", payload);
      db.collection("courselist")
        .add(payload)
        .then((response) => {
          if (response) {
            // eslint-disable-next-line no-console
            console.log(response);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    deleteCourse({ commit }, id) {
      if (id) {
        commit("deleteCourse", id);
        db.collection("courselist")
          .doc(id)
          .delete()
          .then(function() {})
          .catch(function(error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    },
    setCourses(context) {
      let items = [];
      db.collection("courselist")
        .orderBy("created_at")
        .onSnapshot((snapshot) => {
          items = [];
          snapshot.forEach((doc) => {
            items.push({
              id: doc.id,
              coursecode: doc.data().coursecode,
              coursename: doc.data().coursename,
              coursesem: doc.data().coursesem,
            });
          });
          context.commit("setCourses", items);
        });
    },

    addTeacher({ commit }, payload) {
      commit("addTeacher", payload);
      db.collection("teacherlist")
        .add(payload)
        .then((response) => {
          if (response) {
            // eslint-disable-next-line no-console
            console.log(response);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    deleteTeacher({ commit }, id) {
      if (id) {
        commit("deleteTeacher", id);
        db.collection("teacherlist")
          .doc(id)
          .delete()
          .then(function() {})
          .catch(function(error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    },
    setTeacher(context) {
      let items = [];
      db.collection("teacherlist")
        .orderBy("created_at")
        .onSnapshot((snapshot) => {
          items = [];
          snapshot.forEach((doc) => {
            items.push({
              id: doc.id,
              teachersem: doc.data().teachersem,
              teachersect: doc.data().teachersect,
              teachername: doc.data().teachername,
            });
          });

          context.commit("setTeacher", items);
        });
    },

    addQuestion({ commit }, payload) {
      commit("addQuestion", payload);
      db.collection("questionlist")
        .add(payload)
        .then((response) => {
          if (response) {
            // eslint-disable-next-line no-console
            console.log(response);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    deleteQuestion({ commit }, id) {
      if (id) {
        commit("deleteQuestion", id);
        db.collection("questionlist")
          .doc(id)
          .delete()
          .then(function() {})
          .catch(function(error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    },
    setQuestionlist(context) {
      let items = [];
      db.collection("questionlist")
        .orderBy("created_at")
        .onSnapshot((snapshot) => {
          items = [];
          snapshot.forEach((doc) => {
            items.push({
              id: doc.id,
              question: doc.data().question,
              coursecode: doc.data().coursecode,
            });
          });
          context.commit("setQuestionlist", items);
        });
    },
    setQuestion(context) {
      let items = [];
      db.collection("questionlist")
        .orderBy("created_at")
        .onSnapshot((snapshot) => {
          items = [];
          snapshot.forEach((doc) => {
            items.push({
              id: doc.id,
              question: doc.data().question,
              coursecode: doc.data().coursecode,
            });
          });
          context.commit("setQuestion", items);
        });
    },
    setStudent(context) {
      db.collection("studentlist")
        .doc(localStorage.getItem("id"))
        .get()
        .then((doc) => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            context.commit("setStudent", doc.data());
          }
        })
        .catch((err) => {
          console.log("Error getting document", err);
        });
      
    },

    addStudent({ commit }, payload) {
      db.collection("studentlist")
        .add(payload)
        .then((response) => {
          if (response) {
            commit("addStudent", response.id);
            // eslint-disable-next-line no-console
            localStorage.setItem("id", response.id);
            localStorage.setItem("loggeduser", "true");
            router.push("details");
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    studentLogin(context){
      context.commit("studentLogin");
    },
    studentLogout(context){
      context.commit("studentLogout");
    },
  },

  modules: {},
});

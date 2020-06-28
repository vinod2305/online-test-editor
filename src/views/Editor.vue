<template>
  <div >
    <div class="loader" id="loader"></div>
    <div class="question">
      {{ this.question}}
    </div>
    <div class="language">
          Language
          <select v-model="language" class="button1select" >
            <option disabled value="">Please select one</option>
            <option>java</option>
          </select>
      </div>
    <div class="grid-container">
      
      <div class="text-editor">
          Code
        <textarea
          onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"
          name="text-editor"
          v-model="code"
          id="text-editor"
          spellcheck="false"
          data-gramm_editor="false"
         
          class="text-area"
        ></textarea>
      </div>
      <div class="input">
          Input
        <textarea
          name="text-editor"
          v-model="input"
          id="input"
          spellcheck="false"
          data-gramm_editor="false"
          oncopy="return false"
          ondrag="return false"
          ondrop="return false"
          onpaste="return false"
          class="input-area"
        ></textarea>
      </div>
      <div class="output">
          Output
        <textarea
          name="text-editor"
          v-model="output"
          id="output"
          spellcheck="false"
          data-gramm_editor="false"
          oncopy="return false"
          ondrag="return false"
          ondrop="return false"
          onpaste="return false"
          class="output-area"
          readonly
        ></textarea>
      </div>
      <div class="submit">
          <div>
        <button type="submit" class="login-button" @click="runCode">Run</button>
      </div>
      <div>
        <button type="submit" class="login-button" @click="submit">Submit</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { storageRef } from '@/main';
import axios from "axios";
import router from "../router";
import https from 'https';


export default {
  name: "Editor",
  mounted(){
    
    this.$store.dispatch("setStudent").then(
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
      language: "",
      code: "",
      input: "",
      output: "",
      run: false,
      question: localStorage.getItem("question")
    };
  },
  methods: {
    axiosTest() {
      console.log(https)
      https.globalAgent.options.rejectUnauthorized = false;
  return axios.post('https://3.7.167.244:443/', {
    "lang":this.language,
    "code":this.code,
    "id":this.$store.getters.getStudent.usn,
    "stdin": this.input
},{
httpsAgent: new https.Agent({
rejectUnauthorized: false
})
})
  .then(function (response) {
    return response;
    
  })
  .catch(function (error) {
         return error;
    
  });
},
firestoreUpload(thisRef,file){
  
  return thisRef.put(file).then(function (response) {
    return response;
    
  })
  .catch(function (error) {
         return error;
    
  });
},
    runCode() {
      console.log("hello")
      if(this.language == ""){
        alert("Choose a language");
        return 
      }
      if(this.code == ""){
        alert("Please write some code");
        return 
      }
      document.getElementById("loader").style.display = "block";
 this.axiosTest().then(response => {
  if(response.data.error == ""){
      document.getElementById("output").value = response.data.output;
      this.output = response.data.output;
    }
    else{
       document.getElementById("output").value = response.data.error;
       this.output = response.data.error;
    }
    document.getElementById("loader").style.display = "none";
    this.run = true;
}).catch(error => {
        console.log(error);
        document.getElementById("loader").style.display = "none";
        alert("Server is busy.... Retry running the CODE. DONOT SUBMIT");
        this.run = false;
})
    },
    submit() {
      if(this.run == false){
        alert("Run the code to submit");
        return;
      }
        db.collection("studentlist")
          .doc(localStorage.getItem("id"))
          .update({
            language: this.language,
            code: this.code,
            input: this.input,
            output: this.output,
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
 
           var file = new Blob(["USN:"+this.$store.getters.getStudent.usn+"\r\n\r\n"+"Code:"+"\r\n"+this.code+"\r\n\r\n"+"Input:"+"\r\n"+this.input+"\r\n\r\n"+"Output:"+"\r\n"+this.output], {type: 'text/plain'});

        var thisRef = storageRef.child(this.$store.getters.getStudent.usn+".java");
      // eslint-disable-next-line no-unused-vars
      this.firestoreUpload(thisRef,file).then(function(snapshot) {
         alert("File Uploaded")
         console.log('Uploaded a blob or file!');
          router.push("/");
          localStorage.setItem("id", "");
          localStorage.setItem("loggeduser", "false");
      }).catch(error => {
            alert("Code NOT Submited due to network issue")
            console.log(error);
          });

    },
  }
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas: "text-editor text-editor text-editor input" "text-editor text-editor text-editor output" "text-editor text-editor text-editor submit";
}

.language {
  margin-bottom: 20px;
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
  border: 1px solid rgb(0, 0, 0);
}

.button1select{
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
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #1d252b; /* Blue */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
  left: 50%;
  top: 50%;
  position: absolute;
  display: none;
}
.question{
  margin: 15px 0;
  font-size: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.text-editor {
  grid-area: text-editor;
  padding: 10px;
  font-size: 20px;
  .text-area {
    width: 100%;
    height: 80vh;
    line-height: 1.5em;
    font-size: 15px;
  }
}

.input {
  grid-area: input;
  padding: 10px;
  font-size: 20px;
  .input-area {
    width: 100%;
    height: 80%;
    line-height: 1.5em;
    font-size: 15px;
  }
}

.output {
  grid-area: output;
  padding: 10px;
  font-size: 20px;
  .output-area {
    width: 100%;
    height: 80%;
    line-height: 1.5em;
    font-size: 15px;
  }
}

.submit {
  grid-area: submit;
}
</style>




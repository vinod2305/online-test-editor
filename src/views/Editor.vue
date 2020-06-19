<template>
  <div>
    
    <div class="language">
          Language
          <select v-model="language" class="button1select" >
            <option disabled value="">Please select one</option>
            <option>Java</option>
          </select>
      </div>
    <div class="grid-container">
      
      <div class="text-editor">
          Code
        <textarea
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
          id="text-editor"
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
          id="text-editor"
          spellcheck="false"
          data-gramm_editor="false"
          oncopy="return false"
          ondrag="return false"
          ondrop="return false"
          onpaste="return false"
          class="output-area"
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

export default {
  name: "Editor",
  data() {
    return {
      language: "",
      code: "",
      input: "",
      output: ""
    };
  },
  methods: {
    runCode() {

    },
    submit() {
        console.log(this.language)
        console.log(this.code)
        console.log(this.input)
        console.log(this.output)
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
        this.$router.push("/");
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




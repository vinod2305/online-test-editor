<template>
  <div>
    <div class="grid-container">
      <div class="language">
          Language
          <select v-model="language" class="button1select" >
            <option disabled value="">Please select one</option>
            <option>Java</option>
          </select>
      </div>
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
  grid-template-areas: "language text-editor text-editor input" ". text-editor text-editor output" ". text-editor text-editor submit";
}

.language {
  grid-area: language;
}

.text-editor {
  grid-area: text-editor;

  .text-area {
    width: 100%;
    height: 80vh;
    line-height: 1.5em;
  }
}

.input {
  grid-area: input;
  .input-area {
    width: 100%;
    height: 80%;
    line-height: 1.5em;
  }
}

.output {
  grid-area: output;
  .output-area {
    width: 100%;
    height: 80%;
    line-height: 1.5em;
  }
}

.submit {
  grid-area: submit;
}
</style>




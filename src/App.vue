<template>
  <div class="main">
    <Header />
  
  <div class="container" v-if="openai_apikey">

    <div class="col">
      <textarea v-model="prompt"></textarea>
      <button @click="generate">Generate</button>
    </div>


    <div class="col">

      <div class="inner">
      <Editor 
        theme='vs-light'
        :options="{
            lineNumbers:true, 
            minimap:{enabled:false}, 
            showFoldingControls:false, 
            quickSuggestions:false, 
            scrollbar:{vertical:'hidden'},
            overviewRulerBorder:false,
            overviewRulerLanes:0,
            hideCursorInOverviewRuler:true,
            acceptSuggestionOnCommitCharacter:false, 
            padding:0,
            readOnly:true
        }"
        :value="output"
        defaultLanguage="json"
    />
    
    </div>

      <button class="alt" v-if="output && !key" @click="publish">Publish</button>
      <p v-if="key"><a target="_blank" :href="`${base}/u/${key}`">Get the API URL</a></p>
  </div>
</div>

  <div class="modal" v-if="!openai_apikey">
    <h2>Prompt API</h2>
    <p>Create API responses from your prompt and publish them to easy consume.</p>
    <p>Set your OpenAI API key</p>
    <input type="text" v-model="temp_apikey" placeholder="sk-proj-..." />
    <button @click="saveOpenAIKey">Save</button>
  </div>

  <Footer />
</div>
</template>




<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import axios from 'axios'
import Editor from '@guolao/vue-monaco-editor'

export default {
  name: 'App',
  components: {
    Editor,
    Header,
    Footer
  },
  mounted() {
    this.openai_apikey = localStorage.getItem('prompt_api:openai_apikey') || ''
    if(this.openai_apikey) {
      this.setOpenAIKey()
    }
  },
  data() {
    return {
      prompt: '',
      output: '',
      compact: '',
      key: '',
      editor: null,
      base: import.meta.env.VITE_APP_WORKER_APP_BASE_URL,
      temp_apikey: '',
      openai_apikey: ''
    }
  },
  methods: {
    async generate() {
      const response = await axios.post(this.base + '/generate', 
        {
          question: this.prompt
        }
      )
      const out = response.data

      const { result, question, total_tokens } = out || {}

      this.compact = out
      
      this.output = JSON.stringify(result, null, 2)
    },
    async publish() {
      const response = await axios.post(this.base + '/publish', 
        {
          output: this.compact
        }
      )
      this.key = response.data.key
    },

    setOpenAIKey() {
      this.openai_apikey = localStorage.getItem('prompt_api:openai_apikey')
      axios.defaults.headers.common['Authorization'] = this.openai_apikey
    },
    saveOpenAIKey() {
      localStorage.setItem('prompt_api:openai_apikey', this.temp_apikey)
      this.setOpenAIKey()
    }
  }
}
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  height: 100%;
  width: 100%;
}


.col {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: .25rem;
}

textarea {
  width: 100%;
  height: 100%;
  padding: .5rem;
  font-size: 1.1rem;
  resize: none;
  border: none;
  border: 1px solid #ccc;
}

p{
  text-align: center;
}

.inner{
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

a{
  color: steelblue;
}

button {
  padding: .5rem;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid rgb(20, 66, 104); 
  border-radius: .25rem;
  margin-top: .5rem;
  background-color: steelblue;
  color: white;
}
button:hover {
  background-color: slategrey;
}

button.alt{
  background-color: rgb(3, 112, 3);
}

.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.modal{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>

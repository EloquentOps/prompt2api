<template>
    
  <div class="container">

        <div class="col">
            <textarea v-model="prompt" placeholder="i.e.:
            
list 10 e-commerce products 

or 

array with object {a:Random(1,10), b:Some Person Name, c:age(10,80)}"></textarea>

            <div class="actions">
                <span v-if="tokens">{{ tokens }} tokens consumed</span>
                <span class="error" v-if="error">Error: {{ error }}</span>
                <button :disabled="loading === 'generate'" @click="generate">{{ loading === 'generate' ? 'Generating...' : 'Generate' }}</button>
            </div>
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

        <div class="actions">
            <span v-if="key"><a target="_blank" :href="`${base}/u/${key}`">Public URL</a></span>
            <button :disabled="loading === 'publish' || !output || key" class="alt" @click="publish">{{ loading === 'publish' ? 'Publishing...' : 'Publish' }}</button>
        </div>

            
        </div>
        </div>
</template>

<script>
import axios from 'axios'
import Editor from '@guolao/vue-monaco-editor'

export default {
    components: {
        Editor
    },
    data() {
        return {
            prompt: '',
            output: '',
            key: '',
            compact: '',
            key: '',
            editor: null,
            base: import.meta.env.VITE_APP_WORKER_APP_BASE_URL,
            loading: '',
            tokens: 0,
            error: ''
        }
    },  
    mounted() {
        const key = localStorage.getItem('prompt2api:openai_apikey') || ''
        axios.defaults.headers.common['Authorization'] = key
    },
    methods: {
        async generate() {
            this.loading = 'generate'
            this.error = ''
            this.tokens = 0
            try {
                const response = await axios.post(this.base + '/generate', 
                    {
                        question: this.prompt
                    }
                )
                const out = response.data
                
                if(typeof out === 'string'){
                    this.error = 'Error: Invalid JSON output'
                    this.loading = ''
                    return
                }

                const { result, question, total_tokens } = out || {}

                this.compact = out
                this.tokens = total_tokens

                this.output = JSON.stringify(result, null, 2)
                this.key = null
            } catch (error) {
                this.error = error.message
            }
            this.loading = ''
        },
        async publish() {
            this.loading = 'publish'
            const response = await axios.post(this.base + '/publish', 
                {
                    output: this.compact
                }
            )
            this.key = response.data.key
            this.loading = ''
        },
    }
}
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  height: 100%;
  width: 100%;
}


.col {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: .25rem;
  flex: 1;
}

.actions{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem; 
    margin-top: .5rem;
}
.inner{
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}


@media (max-width: 568px) {
    .container {
        padding: .3rem;
        flex-direction: column;
    }
}
</style>
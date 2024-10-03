<template>
    <div class="modal">
        <h2>Prompt2API</h2>
        <p>Put your <b>OpenAI API key</b> (it's stored on localStorage)<br />
        It uses <b>GPT-4o-mini</b>, so just pennies.</p>
        <input type="text" v-model="temp_apikey" placeholder="sk-proj-..." />
        <button @click="saveOpenAIKey">Save</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            temp_apikey: ''
        }
    },
    methods: {
        saveOpenAIKey() {
            localStorage.setItem('prompt_api:openai_apikey', this.temp_apikey)
            this.$emit('updated')
        }
    }
}
</script>

<style scoped>
.modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

input{
    min-width: 300px;
}
</style>
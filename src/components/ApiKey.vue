<template>
    <div class="modal">
        <h2>Prompt2API</h2>
        <h4>The fastest way to create synthetic (mock) data for your apps.</h4>
        <p>Put your <b>OpenAI API key</b> (it'll be stored on localStorage)<br />
        It uses <b>GPT-4o-mini</b>, so it's just pennies.</p>
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
            localStorage.setItem('prompt2api:openai_apikey', this.temp_apikey)
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

h2{
    margin: 0;
}

h4{
    margin: 0;
    margin-bottom: 1rem;
}

input{
    min-width: 300px;
}
</style>
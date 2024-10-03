<template>
    <footer>
        <b>Prompt2API</b>
         by <a href="https://eloquentops.com">EloquentOps</a>
         - <a href="https://github.com/eloquentops/prompt2api">GitHub</a>
         - <a v-if="key" href="" @click="forgetOpenAIKey">Forget my OpenAI API KEY</a>
    </footer>
</template>

<script>
export default {
    methods: {
        forgetOpenAIKey() {
            localStorage.removeItem('prompt2api:openai_apikey')
        }
    },
    data() {
        return {
            key: localStorage.getItem('prompt2api:openai_apikey') ? true : false
        }
    }
}
</script>

<style scoped>
footer {
    font-size: 0.8rem;
    text-align: center;
    margin: 0;
    padding: .5rem;
    background-color: #f0f0f0;
    width: 100%;
}

a{
    white-space: nowrap;
}
</style>
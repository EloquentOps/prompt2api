<template>
    <footer>
        <b>Prompt2API</b>
         by <a href="https://eloquentops.com">EloquentOps</a>
         - <a href="https://github.com/eloquentops/prompt2api">GitHub</a>
         - <a href="" @click="forgetOpenAIKey">Forget OpenAI API KEY</a>
    </footer>
</template>

<script>
export default {
    methods: {
        forgetOpenAIKey() {
            localStorage.removeItem('prompt_api:openai_apikey')
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
</style>
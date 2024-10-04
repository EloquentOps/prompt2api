<template>
    <div class="modal">
        <h2>Prompt2Api</h2>
        <h4>The fastest way to create synthetic (mock) data for your apps.</h4>

        <div class="vid-container">
            <video src="/demo.mp4" autoplay loop muted></video>
        </div>
        <p>Put your <b>OpenAI API key</b> (it'll be stored on localStorage)<br />
        It uses <b>GPT-4o-mini</b>, so it's just pennies.</p>
        
        <div class="form-container">
            <input type="text" v-model="temp_apikey" placeholder="sk-proj-..." />
            <button @click="saveOpenAIKey">Save</button>
        </div>
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

.vid-container{
    max-width: 600px;
    width: 100%;
    padding: .5rem;
}

.form-container{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: .5rem;
    width: 100%;
    max-width: 600px;
}

.form-container input{
    height: 100%;
    margin: 0;
}

video{
    width: 100%;
    object-fit: contain;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
}

input{
    flex: 1;
}
</style>
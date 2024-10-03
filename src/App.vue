<template>
  <div class="main">
    <Header />
    <ApiKey @updated="hasKey=true" v-if="!hasKey" />
    <Main v-if="hasKey" />
    <Footer />
  </div>
</template>



<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ApiKey from './components/ApiKey.vue'
import Main from './components/Main.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ApiKey,
    Main
  },
  mounted() {
    this.hasKey = localStorage.getItem('prompt_api:openai_apikey') ? true : false
  },
  data() {
    return {
      hasKey: false
    }
  }
}
</script>


<style scoped>


.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}


</style>

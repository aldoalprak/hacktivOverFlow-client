<template>
  <div class="home">
    <Navbar/>
    <Sidenav/>
    <Question/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidenav from '@/components/Sidenav.vue'
import Question from '@/components/Question.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    Sidenav,
    Question
  }
}
</script>

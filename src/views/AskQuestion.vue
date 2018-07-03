<template>
  <div class="askquestion">
    <Navbar/>
    <Sidenav/>
    <AskQuestion/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidenav from '@/components/Sidenav.vue'
import AskQuestion from '@/components/AskQuestion.vue'

export default {
  name: 'askquestion',
  components: {
    Navbar,
    Sidenav,
    AskQuestion
  }
}
</script>

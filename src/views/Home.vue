<template>
  <div class="home">
    <Navbar/>
    <Sidenav/>
    <Content/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidenav from '@/components/Sidenav.vue'
import Content from '@/components/Content.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    Sidenav,
    Content
  }
}
</script>

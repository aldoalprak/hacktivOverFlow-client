<template>
    <div class="register">
        <div class="container">
            <Register/>
        </div>
    </div>
    
</template>

<script>
import Register from '../components/Register.vue'

export default {
    name:"register",
    components:{
        Register   
    }
}
</script>

<style scoped>
.register {
    background-image: url("https://i.stack.imgur.com/jGlzr.png");
    background-size: cover
}
</style>

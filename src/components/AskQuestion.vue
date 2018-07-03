<template>
    <div class="wrapper">
        <div class="row">
            <form method="post">
                    <textarea name="title" id="title" cols="30" rows="10" placeholder="Title" v-model="title"></textarea>
                    <br>
                    <wysiwyg v-model="questionText"/>
            </form>
            <br>
            <div class="row">
                <div class="col 4 offset-s10">
                    <button class="waves-effect waves-light btn" @click="addQuestion()"><i class="material-icons left">mail</i>submit</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'


export default {
   data(){
       return{
           title:"",
           questionText:""
       }
       
   }, 
   created() {
          
   }, 
   methods: {
       addQuestion() {
           axios({
               method:"post",
               url:"http://localhost:3000/questions/add",
               data:{
                   title: this.title,
                   content: this.questionText
               },
               headers:{
                   token: localStorage.getItem("token")
               }
           })
           .then(response=>{
               console.log(response);
               this.$router.push("/") 
           })
           .catch(err=>{
               console.log(err.message);
           })
       }
   }
}
</script>


<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.wrapper {
    padding-left: 310px;
}

@media only screen and (max-width : 992px) {
      .wrapper {
        padding-left: 0;
      }
    }

/* .ques{
    background-color: aquamarine
}    

.butn {
    background-color: black
} */
</style>


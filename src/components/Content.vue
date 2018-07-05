<template>
    <div class="wrapper">
        <div class="row">
            <div class="col s11 ques">
                <div class="row">
                    <div class="col s10">
                        <h5>Top Questions</h5>
                    </div>
                    <div class="col s2 ">
                        <button class="waves-effect waves-light btn" @click="questionAsk()">Ask_Question</button>
                    </div>        
                </div>
                <hr>
                <div class="row">
                    <div class="col s12">
                        <div class="card blue-grey darken-1"  v-for="(question,index) in allQuestions" :key="index">
                            <div class="card-content white-text">
                                <span class="card-title">{{question.userId.username }}</span>
                                <router-link :to="`/questions/${question._id}`" class="link"><p>{{question.title}}</p></router-link>
                            </div>
                            <div class="card-action">
                                <router-link :to="`/questions/${question._id}`">Answers {{question.answerId.length}}</router-link>
                                <router-link :to="`/questions/${question._id}`">Votes {{question.votes.length}}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            allQuestions:[],
            adminStatus : false
        }
    },
    created() {
        if(localStorage.hasOwnProperty("token")){
            this.adminStatus = true
        }else{
            this.adminStatus = false
        }
        this.getAllPost()
    },
    methods:{

        getAllPost() {
            axios({
                method:"get",
                url:"https://api_hacktivoverflow.alprak.net/questions/show",
            })
            .then(({data})=>{
                this.allQuestions = data.dataQuestions
                console.log(this.allQuestions);
                console.log("xxxx",this.allQuestions[0].userId.username);
            })
        },
        questionAsk() {
            if(this.adminStatus == true) {
                this.$router.push("/askquestion")
            }else{
                swal(
                    'you must login to ask',
                    '.',
                    'warning'
                )
            }
            
        }
    }

}
</script>





<style scoped>
.wrapper {
    padding-left: 310px;
}

@media only screen and (max-width : 992px) {
      .wrapper {
        padding-left: 0;
      }
    }

 .link { color:white; }
</style>


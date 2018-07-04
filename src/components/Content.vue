<template>
    <div class="wrapper">
        <div class="row">
            <div class="col s11 ques">
                <div class="row">
                    <div class="col s10">
                        <h5>Top Questions</h5>
                    </div>
                    <div class="col s2 ">
                       <router-link :to="'/askquestion'"><button class="waves-effect waves-light btn">Ask_Question</button></router-link>
                    </div>        
                </div>
                <hr>
                <div class="row">
                    <div class="col s12">
                        <div class="card blue-grey darken-1" v-for="(question,index) in allQuestions" :key="index">
                            <div class="card-content white-text">
                                <span class="card-title">{{question.userId.username}}</span>
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
            allQuestions:[]
        }
    },
    created() {
        this.getAllPost()
    },
    methods:{

        getAllPost() {
            axios({
                method:"get",
                url:"http://localhost:3000/questions/show",
            })
            .then(({data})=>{
                this.allQuestions = data.dataQuestions
                console.log(this.allQuestions);
                
            })
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


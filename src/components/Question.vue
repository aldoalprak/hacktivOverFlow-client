<template>
    <div class="wrapper">
        <div class="row">
            <div class="col s10">
                <h5>{{dataQuestion.title}}</h5>
            </div>
            <div class="col s2">
                <router-link :to="'/askquestion'"><button class="waves-effect waves-light btn">Ask_Question</button></router-link>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col s8 ques">
                <div class="row" id="question">
                    <div class="col s3">
                        upvote
                    </div>
                    <div class="col s9">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">{{questionUsername}}</span>
                                <p>{{dataQuestion.content}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h6>{{answerLength}} answers</h6>        
                <hr>
                <div id="answers" v-for="(answer,index) in dataAnswer" :key="index">
                    <div class="row" id="answer">
                        <div class="col s3">
                            upvote
                        </div>
                        <div class="col s9">
                            <div class="card green lighten-2">
                                <div class="card-content white-text">
                                    <span class="card-title">{{answer.userId.username}}</span>
                                    <p>{{answer.content}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>    
            </div>
        </div>

    </div>        
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            dataQuestion:{},
            answerLength:0,
            questionUsername:"",
            dataAnswer:[]
        }
    },
    created() {
        this.getOneQuestion()
        this.getAnswers()
    },
    methods:{
        getOneQuestion() {
            axios({
                method:"get",
                url:`http://localhost:3000/questions/showone/${this.$route.params.id}`
            })
            .then(({data})=>{
                console.log(data.dataQuestion.answerId.length);
                this.answerLength = data.dataQuestion.answerId.length
                this.dataQuestion = data.dataQuestion
                this.questionUsername = data.dataQuestion.userId.username
            })
            .catch(err=>{
                console.log(err.message);
            })
        },
        getAnswers() {
            axios({
                method:"get",
                url:`http://localhost:3000/answers/showbypostid/${this.$route.params.id}`
            })
            .then(({data})=>{
                console.log(data.dataAnswer)
                this.dataAnswer = data.dataAnswer
            })
            .catch(err=>{
                console.log(err.message);
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

/* .ques{
    background-color: aquamarine
}    

.butn {
    background-color: black
} */
</style>


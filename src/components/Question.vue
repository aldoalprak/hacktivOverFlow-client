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
                            <div class="card-action" v-if="questionId == currUserId">
                                <button class="btn-floating btn-small waves-effect waves-light red" @click="deleteAnswer(answer._id)"><i class="material-icons">delete</i></button> 
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
                                <hr>
                                <div class="card-action" v-if="answer.userId._id == currUserId">
                                    <button class="btn-floating btn-small waves-effect waves-light red" @click="deleteAnswer(answer._id)"><i class="material-icons">delete</i></button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                <br>
                <h6>Your Answer</h6>
                <form method="post">
                    <wysiwyg v-model="answerText"/>
                </form>
                <br>
                <div class="row">
                    <div class="col 4 offset-s9">
                        <button class="waves-effect waves-light btn" @click="postAnswer()"><i class="material-icons left">mail</i>submit</button>
                    </div>
                </div>    
            </div>
        </div>

    </div>        
</template>

<script>
import axios from 'axios'
import { mapState,mapActions } from 'vuex'

export default {
    data() {
        return {
            dataQuestion:{},
            questionUsername:"",
            questionId:"",
            answerLength:0,
            dataAnswer:[],
            answerText:""
        }
    },
    created() {
        this.getOneQuestion()
        this.getAnswers()
    },
    computed: {
        ...mapState([
            'currUserId'
        ])
    },
    methods:{
        getOneQuestion() {
            axios({
                method:"get",
                url:`http://localhost:3000/questions/showone/${this.$route.params.id}`
            })
            .then(({data})=>{
                console.log(data.dataQuestion.answerId.length);
                this.questionId = data.dataQuestion.userId._id
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
        },
        postAnswer(){
            axios({
                method:"post",
                url:"http://localhost:3000/answers/add",
                data:{
                    content:this.answerText,
                    questionId: this.$route.params.id,
                },
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            .then(({data})=>{
                console.log(data)
                this.answerText=""
                this.getAnswers()
            })
            .catch(err=>{
                console.log(err.message);
            })
        },
        deleteAnswer(id){
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
            .then((result) => {
                if (result.value) {
                    axios({
                        method:"delete",
                        url:`http://localhost:3000/answers/delete/${id}`
                    })
                    .then(response=>{
                        swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                        this.getAnswers()      
                        console.log(response);
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })             
                }
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
</style>


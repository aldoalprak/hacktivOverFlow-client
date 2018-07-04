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
            <div class="col s11 ques">
                <!-- ===================================Pertanyaan============================================ -->
                <div class="row" id="question">
                    <div class="col s3">
                        <div class="row">
                            <i class="material-icons medium hoverable upvote" @click="checkUpvoteQuestion()">keyboard_arrow_up</i>
                        </div>
                            <h5>{{questionVote.length}}</h5>
                        <div class="row">
                            <i class="material-icons medium hoverable downvote" @click="checkDownvoteQuestion()">keyboard_arrow_down</i>
                        </div>
                    </div>
                    <div class="col s9">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">{{questionUsername}}</span>
                                <p>{{dataQuestion.content}}</p>
                            </div>
                            <div class="card-action" v-if="questionId == currUserId">
                                 <button data-target="updateModalQuestion" class="btn-floating btn-small waves-effect waves-light modal-trigger" @click="modalJsQuestion(dataQuestion.content)" ><i class="material-icons">edit</i></button> 
                                <button class="btn-floating btn-small waves-effect waves-light red" @click="deleteQuestion()"><i class="material-icons">delete</i></button> 
                            </div>
                        </div>
                        <!-- Modal Structure -->
                        <div id="updateModalQuestion" class="modal">
                            <div class="modal-content">
                                <wysiwyg v-model="updateQuestion"/>
                            </div>
                            <div class="modal-footer">
                                <button class="modal-close waves-effect waves-green btn" @click="editQuestion()">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h6>{{answerLength}} answers</h6>        
                <hr>
                <!-- ===================================list jawaban============================================ -->
                <div id="answers" v-for="(answer,index) in dataAnswer" :key="index">
                    <div class="row" id="answer">
                        <div class="col s3">
                            <div class="row">
                                <i class="material-icons medium hoverable upvote" @click="checkUpvoteAnswer(index)">keyboard_arrow_up</i>
                            </div>
                                <h5>{{answer.votes.length}}</h5>
                            <div class="row">
                                <i class="material-icons medium hoverable downvote" @click="checkDownvoteAnswer(index)">keyboard_arrow_down</i>
                            </div>
                        </div>
                        <div class="col s9">
                            <div class="card green lighten-2">
                                <div class="card-content white-text">
                                    <span class="card-title">{{answer.userId.username}}</span>
                                    <p>{{answer.content}}</p>
                                </div>
                                <hr>
                                <div class="card-action" v-if="answer.userId._id == currUserId">
                                    <button data-target="updateModal" class="btn-floating btn-small waves-effect waves-light modal-trigger" @click="modalJs(answer.content,answer._id)" ><i class="material-icons">edit</i></button> 
                                    <button class="btn-floating btn-small waves-effect waves-light red" @click="deleteAnswer(answer._id)"><i class="material-icons">delete</i></button>
                                </div>
                            </div>
                            <!-- Modal Structure -->
                            <div id="updateModal" class="modal">
                                <div class="modal-content">
                                    <wysiwyg v-model="updateAnswer"/>
                                </div>
                                <div class="modal-footer">
                                    <button class="modal-close waves-effect waves-green btn" @click="editAnswer()">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                <br>
                <!-- ===================================textbox jawaban============================================ -->
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
            questionId:"", // question userId
            answerLength:0,
            dataAnswer:[],
            answerText:"",
            updateAnswer:"",
            updateAnswerId:"",
            updateQuestion:"",

            questionVote:[]
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
        modalJsQuestion(content) {
            this.updateQuestion = content
            var elems = document.querySelectorAll('#updateModalQuestion');
            var instances = M.Modal.init(elems);
        },
        modalJs(content,id) {
            this.updateAnswerId = id
            this.updateAnswer = content
            var elems = document.querySelectorAll('#updateModal');
            var instances = M.Modal.init(elems);
        },
        getOneQuestion() {
            axios({
                method:"get",
                url:`http://localhost:3000/questions/showone/${this.$route.params.id}`
            })
            .then(({data})=>{
                this.questionId = data.dataQuestion.userId._id
                this.answerLength = data.dataQuestion.answerId.length
                this.dataQuestion = data.dataQuestion
                this.questionUsername = data.dataQuestion.userId.username
                this.questionVote = data.dataQuestion.votes
                console.log("hehehhe",this.questionVote,this.questionVote.indexOf(this.currUserId)); 
                console.log("hohoho", this.currUserId,this.questionId);
                   
            })
            .catch(err=>{
                console.log(err.message);
            })
        },
        deleteQuestion() {
            axios({
                method:"delete",
                url:`http://localhost:3000/questions/delete/${this.$route.params.id}`
            })
            .then(response=>{
                this.$router.push("/")
            })
            .catch(err=>{
                console.log(err.message);
            })
        },
        editQuestion() {
            axios({
                method:"put",
                url:`http://localhost:3000/questions/update/${this.$route.params.id}`,
                data:{
                    content:this.updateQuestion
                }
            })
            .then(response=>{
                this.getOneQuestion()
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
                // console.log(data.dataAnswer)
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
                        url:`http://localhost:3000/answers/delete/${id}`,
                        headers:{
                            token:localStorage.getItem("token")
                        },
                        data:{
                            questionId:this.$route.params.id
                        }
                    })
                    .then(response=>{
                        swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                        this.getOneQuestion() 
                        this.getAnswers()   
                        console.log(response);
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })             
                }
            })
        },
        editAnswer() {
            axios({
                method:"put",
                url:`http://localhost:3000/answers/update/${this.updateAnswerId}`,
                data:{
                    content: this.updateAnswer
                },
                headers:{
                    token: localStorage.getItem("token")
                }
            })
            .then(response=>{
                console.log(response);
                this.getAnswers()
            })
            .catch(err=>{
                console.log(err.message);
            })
        },
        checkUpvoteQuestion() {
            if(this.questionId !== this.currUserId){
                console.log("masuk upvote",this.questionVote,this.currUserId);
                
                if(this.questionVote.indexOf(this.currUserId) == -1) {
                    this.questionVote.push(this.currUserId)
                    axios({
                        method:"put",
                        url:`http://localhost:3000/questions/upvote/${this.$route.params.id}`,
                        data: {
                            userId: this.currUserId
                        }
                    })
                    .then(response=>{
                        console.log(response);
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })
                }else{
                    swal(
                        'you\'ve already upvoted this question',
                        '.',
                        'warning'
                    )
                }
            }else{
                swal(
                    'you cant\'t upvote your question',
                    '.',
                    'warning'
                )  
            }
        },
        checkDownvoteQuestion() {
            if(this.questionId !== this.currUserId){
                // console.log("masuk upvote",this.questionVote,this.currUserId);
                if(this.questionVote.indexOf(this.currUserId) !== -1) {
                    let index = this.questionVote.indexOf(this.currUserId)
                    
                    this.questionVote.splice(index,1)
                    console.log("xxxxx",this.questionVote);
                    console.log("id====",this.$route.params.id);
                    
                    axios({
                        method:"put",
                        url:`http://localhost:3000/questions/downvote/${this.$route.params.id}`,
                        data: {
                            currVotes: this.questionVote
                        }
                    })
                    .then(response=>{
                        console.log(response);
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })
                }else{
                    swal(
                        'you haven\'t upvoted, so you cant\'t downvote this question',
                        '.',
                        'warning'
                    ) 
                }
            }else{
                swal(
                    'you cant\'t downvote your question',
                    '.',
                    'warning'
                )  
            }
        },
        checkUpvoteAnswer(index) {
            if(this.dataAnswer[index].userId._id !== this.currUserId) {
                console.log("msk answer");
                if(this.dataAnswer[index].votes.indexOf(this.currUserId) == -1) {
                    this.dataAnswer[index].votes.push(this.currUserId)

                    axios({
                        method:"put",
                        url:`http://localhost:3000/answers/upvote/${this.dataAnswer[index]._id}`,
                        data:{
                            userId:this.currUserId
                        }
                    })
                    .then(response=>{
                        console.log(response);
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })
                }else{
                    swal(
                        'you\'ve already upvoted this answer',
                        '.',
                        'warning'
                    )
                } 
            }else{
               swal(
                    'you cant\'t upvote your answer',
                    '.',
                    'warning'
                )   
            }
        },
        checkDownvoteAnswer(index) {
            if(this.dataAnswer[index].userId._id !== this.currUserId) {
                console.log("msk answer");
                if(this.dataAnswer[index].votes.indexOf(this.currUserId) !== -1) {
                    let indexUserId = this.dataAnswer[index].votes.indexOf(this.currUserId)
                    this.dataAnswer[index].votes.splice(indexUserId,1)
                    axios({
                        method:"put",
                        url:`http://localhost:3000/answers/downvote/${this.dataAnswer[index]._id}`,
                        data:{
                            currVotes:this.dataAnswer[index].votes
                        }
                    })
                    .then(response=>{
                        console.log(response);
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })
                }else{
                    swal(
                        'you haven\'t upvoted so you can\'t downvote this answer',
                        '.',
                        'warning'
                    )
                } 
            }else{
               swal(
                    'you cant\'t downvote your answer',
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

.upvote {
    cursor: pointer;
}

.downvote {
    cursor: pointer;
}

@media only screen and (max-width : 992px) {
      .wrapper {
        padding-left: 0;
      }
    }
</style>


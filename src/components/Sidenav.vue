<template>
    <div class="col s3" id="sidebar"> <!-- Note that "m4 l3" was added -->
        <ul id="slide-out" class="sidenav sidenav-fixed">
            <li><div class="user-view">
                    <div class="background">
                        <img src="https://s.tmimgcdn.com/blog/wp-content/uploads/2016/04/1-9-2.jpg?x54449">
                    </div>
                    <router-link :to="'/'"><img class="circle" src="https://wallpapercave.com/wp/MOyrUQC.jpg"></router-link>
                    <span class="white-text name">Hello {{username}} !</span>
                    <span class="white-text email">{{email}}</span>
                    <a  href class="waves-effect waves-light white-text"  v-if="adminStatus == true" @click="logout()">LogOut</a>
                    <a  href class="waves-effect waves-light white-text"  v-if="adminStatus == false" @click="login()">LogIn</a>
                </div></li>
            <li><router-link :to="'/'"><i class="material-icons">cloud</i>Welcome</router-link></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">Stack Overflow</a></li>
            
        </ul>
        <a href="#" data-target="slide-out" @click="sideNavJs()" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'

export default {
    data() {
        return{
            adminStatus:false
        }
        
    },
    created(){
        if(localStorage.hasOwnProperty('token')){
            console.log(this.adminStatus);
            this.adminStatus = true
        }else{
            this.adminStatus = false
        }
        this.showUser()
    },
    methods:{
        ...mapActions([
            'showUser'
        ]),
        sideNavJs() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);
        },
        logout() {
            localStorage.clear()
            this.$router.push('/')
        },
        login() {
            this.$router.push('/login')
        }
    },
    computed:{
        ...mapState([
            'username',
            'email'
        ])
    }

}
</script>


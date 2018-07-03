<template>
    <div class="col s3" id="sidebar"> <!-- Note that "m4 l3" was added -->
        <ul id="slide-out" class="sidenav sidenav-fixed">
            <li><div class="user-view">
                    <div class="background">
                        <img src="https://2.bp.blogspot.com/-f1lVE6dZO5o/VMekdVmR4qI/AAAAAAAAOfY/IB7HjtXucNA/w800-h800/Full%2BComputer%2BSize%2BMaterial%2BDesign%2BWallpaper%2B(1).jpg">
                    </div>
                    <router-link :to="'/'"><img class="circle" src="https://wallpapercave.com/wp/MOyrUQC.jpg"></router-link>
                    <span class="white-text name">Hello {{username}} !</span>
                    <span class="white-text email">{{email}}</span>
                    <a  href class="waves-effect waves-light white-text"  @click="logout()">LogOut</a>
                </div></li>
            <li><router-link :to="'/'"><i class="material-icons">cloud</i>Welcome</router-link></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">Stack Overflow</a></li>
            
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'

export default {
    created(){
        this.showUser()
    },
    methods:{
        ...mapActions([
            'showUser'
        ])
    },
    computed:{
        ...mapState([
            'username',
            'email'
        ])
    }

}
</script>


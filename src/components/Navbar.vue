<template>
    <div class="wrapper">
        <div class="navbar-fixed">
            <nav class="grey darken-3">
                <div class="nav-wrapper">
                <router-link :to="'/'"><a href class="brand-logo"><i class="material-icons">cloud</i>StackExchange</a></router-link>
                </div>
            </nav>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    padding-left: 301px;
}

@media only screen and (max-width : 992px) {
      .wrapper {
        padding-left: 0;
      }
    }
</style>

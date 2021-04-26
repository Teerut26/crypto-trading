<template>
    <div class="home">
        <h1>{{$store.state.current_page}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                slug:this.$route.params.slug
            }
        },
        components: {
        },
        created: function () {
            this.$store.state.current_page = this.$route.params.slug
        }
    }
</script>
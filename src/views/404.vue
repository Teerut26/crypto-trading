<template>
    <div class="hello">
        <center>
            <h1 style="color: white;" class="mt-5">(404) Page NotFound</h1>
            <h5 style="color: white;">"{{path}}"</h5>
        </center>
    </div>
</template>

<script>
    export default {
        data: () => ({
            path: "",
        }),
        created: function () {
            this.path = this.$route.fullPath
        }
    };
</script>
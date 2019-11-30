<template>

</template>

<script>

  import axios from "../../utils/httpUtils"

    export default {
        name: "list",
        data() {
            return {

            }
        },
        created() {
            axios.get()
        },
    }
</script>

<style scoped>

</style>

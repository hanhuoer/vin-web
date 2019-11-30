<template>
  <div class="index-page main-content">
    <h1>
      {{this.$route.params.notebookName}}
    </h1>
  </div>
</template>

<script>
    import hljs from "highlight.js"
    import Headroom from "headroom.js";

    export default {
        name: "index",
        data() {
            return {}
        },
        created() {
            this.fetchData()
        },
        mounted() {
            setTimeout(() => {
                this.init();
            }, 400)
        },
        methods: {
            init() {
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/styles/style.min.css";

  .index-page {
    min-height: 500px;
  }


</style>

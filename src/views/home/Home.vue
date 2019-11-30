<template>
  <div class="home">
    <div class="container">

      <div class="main-top">
        <div>
          <img v-if="userInfo !== null" :src="userInfo.avatar" alt="">
        </div>
      </div>
      <div class="main-content">

      </div>
    </div>
  </div>
</template>

<script>
    import axios from "@/utils/httpUtils";

    export default {
        name: "Home",
        data() {
            return {}
        },
        created() {
            // get user info
            axios.get("/api/vin/home/user/info")
                .then(response => {
                    // console.log(response)
                    if (response.data.code === "20000") {
                        this.$store.commit("setUserInfo", response.data.data)
                    }
                })
                .catch(error => {
                    // console.log(error)
                })
        },
        computed: {
            userInfo: {
                get() {
                    if (this.$store.state.user.info !== null) {
                        return this.$store.state.user.info
                    }
                    return null;
                }
            }
        },
    }
</script>

<style scoped>

  .home {
    width: 100%;
    height: 100%;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: beige;
  }

</style>

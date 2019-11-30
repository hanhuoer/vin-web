<template>

</template>

<script>
    import axios from "../../utils/httpUtils";
    import { deleteToken, setToken, signIn, signOut } from "../../utils/tokenUtils";

    export default {
        name: "LoginOauthGithub",
        data() {
            return {
                currentRoute: null
            };
        },
        created() {
            // console.log("== loading begin ==");
            console.log(this.$store);

            this.currentRoute = this.$router.currentRoute;
            // console.log(this.currentRoute);

            let code = this.currentRoute.query.code;
            if (code === null || code === undefined) {
                //
                // console.log("code is null.");
            } else {

                axios.post("/api/vin/oauth/github/redirect", { "code": code })
                    .then(response => {
                        // console.log(response)
                        if (response.data.code !== "20000") {
                            // console.log("else");
                        } else {
                            signOut();
                            signIn(response.data.data)
                            this.$router.push("/")
                        }
                    })
                    .catch(error => {
                        // console.log("error " + error);
                    });

            }

            // console.log("== loading end ==");
            // console.log(this.$store);
        },
        mounted() {
        }
    };
</script>

<style scoped>

</style>

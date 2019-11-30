<template>
  <div id="login-wrapper">
    <div id="sit">
      <!--        login-->
      <div id="username">
        <input name="username" type="text" :value="username"/>
      </div>
      <div id="password">
        <input name="password" type="text" :value="password"/>
      </div>
      <div id="login">
        <button type="button">Sign in</button>
      </div>
    </div>
    <div id="oauth">
      <!--        oauth list-->
      <div class="split-line">
        <span class="split-line-left"></span>
        <span class="split-line-right"></span>
      </div>
      <div id="oauth-list">
        <ul>
          <li @click="oauthGithub">
            <span>
              <font-awesome-icon :icon="iconGithub" style="font-size: 25px"/>
            </span>
          </li>
        </ul>
        <!--        <button @click="oauthGithub()">temp</button>-->
      </div>
    </div>
  </div>
</template>

<script>
    import axios from "../../utils/httpUtils";
    import { faGithub } from "@fortawesome/free-brands-svg-icons";
    import { getCookie, setCookie, deleteCookie } from "../../utils/cookieUtils";
    import { getGithubClientId } from "@/api/oauth"

    export default {
        name: "Login",
        data() {
            return {
                iconGithub: faGithub,
                username: "",
                password: ""
            };
        },
        methods: {
            signIn() {

            },
            oauthGithub() {
                // console.log("==begin==");
                // console.log(process.env);

                // 1. get github client id from api
                getGithubClientId().then(response => {
                    const githubClientId = response.data.value

                    // 2. set redirect uri
                    let redirectUri = ""
                    if (process.env.NODE_ENV === "development") {
                        redirectUri = "http://localhost:8080/oauth/github/redirect";
                    } else if (process.env.NODE_ENV === "production") {
                        // baseURL = "http://api.scoder.club/";
                        redirectUri = "http://blog.scoder.club/oauth/github/redirect";
                    }

                    // 3. url
                    var url = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}`;
                    window.open(url, "_bank");

                })

                // console.log("==end==");
            }, testToken() {
                axios.post("/api/vin/oauth/test")
                    .then(response => {
                        // console.log(response);
                    }).catch(error => {
                    // console.log(error);
                });
            }
        },
        created() {
            // console.log(this.$store);
        }
    };
</script>

<style scoped>

  #login-wrapper {
    margin: 0 auto;
    padding: 50px;
    width: 600px;
    background: aliceblue;
    position: relative;
    top: 25%;
  }

  #username, #password, #login {
    margin: 0 auto;
    padding: 5px;
    width: 300px;
  }

  #username, #password {
    height: 50px;
  }

  #login {
    height: 40px;
  }

  #login button {
    border: 1px;
    background: burlywood;
  }

  #username input, #password input, #login button {
    width: 100%;
    height: 100%;
  }

  #username input, #password input {
    padding: 10px;
  }

  #oauth {
    overflow: auto;
  }

  #oauth-list {
    width: 300px;
    margin: 0 auto;
  }

  #oauth ul {
    overflow: hidden;
    width: 25px;
    margin: 0 auto;
  }

  #oauth ul li {
    list-style-type: none;
    float: left;
    height: 25px;
    width: 25px;
    color: #4a4a4a;
  }

  #oauth ul li:hover {
    cursor: pointer;
    color: #000000;
  }

  #oauth .split-line {
    overflow: hidden;
    margin: 0 auto;
    padding: 5px;
    width: 300px;
  }

  #oauth .split-line-left {
    float: left;
  }

  #oauth .split-line-right {
    float: right;
  }

  #oauth .split-line-left, #oauth .split-line-right {
    display: block;
    width: 50px;
    height: 1px;
    border: 1px solid #666666;
  }

</style>

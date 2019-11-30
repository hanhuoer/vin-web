<template>
  <div>
    <header id="header" class="header bg-white">
      <div class="navbar-container">
        <a href="/" class="navbar-logo">
          <img src="/logo.png" alt="Vin">
        </a>
        <div class="navbar-menu">
          <a href="/archives">Archives</a>
          <a href="/links">Links</a>
          <a href="/about">About</a>
        </div>
        <div class="navbar-mobile-menu" onclick="">
          <span class="icon-menu cross"><span class="middle"></span></span>
          <ul>
            <li><a href="/archives">Archives</a></li>
            <li><a href="/links">Links</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div class="navbar-user" v-if="userIsSignIn">
          <div>
            <a class="user-avatar" href="#">
              <img :src="userAvatar" alt="Vin">
            </a>
          </div>
          <ul class="dropdown-menu">
            <li>
              <a href="#" v-if="isMaster">
                <font-awesome-icon :icon="faHome"/>
                <span>主页</span>
              </a>
            </li>
            <li @click="confirmIsMaster">
              <a v-if="isMaster">
                <font-awesome-icon :icon="faHome"/>
                <span>写作</span>
              </a>
            </li>
            <li>
              <a href="#" @click="signOut">
                <font-awesome-icon :icon="faCog"/>
                <span>退出</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="navbar-sigin" style="float: right; height: 100%" v-if="!userIsSignIn">
          <a href="/login" style="cursor: pointer">Sign In</a>
        </div>
      </div>
    </header>

    <router-view/>

    <footer id="footer" class="footer bg-white">
      <div class="footer-social">
        <div class="footer-container clearfix">
          <div class="social-list">
            <a class="social rss" target="blank" href="http://blog.scoder.club/">BLOG</a>
            <a class="social github" target="blank" href="https://github.com/Hanhuoer">GITHUB</a>
          </div>
        </div>
      </div>
      <div class="footer-meta">
        <div class="footer-container">
          <div class="meta-item meta-copyright">
            <div class="meta-copyright-info">
              <a href="/" class="info-logo">
                <img src="/logo.png" alt="Vin">
              </a>
              <div class="info-text">
                <p>Theme is <a href="https://github.com/chakhsu/pinghsu" target="_blank">Pinghsu</a> by <a
                  href="https://www.linpx.com/" target="_blank">Chakhsu</a></p>
                <p>Powered by <a href="http://www.typecho.org" target="_blank" rel="nofollow">Vin</a></p>
                <p>© 2019 <a href="http://scoder.club/">H</a></p>
              </div>
            </div>
          </div>
          <div class="meta-item meta-posts">
            <h3 class="meta-title">RECENT POSTS</h3>
            <li v-if="articleList != null" v-for="item in articleList">
              <router-link :to="'/article/' + item.id">{{item.title}}</router-link>
            </li>
          </div>
          <div class="meta-item meta-comments">
            <h3 class="meta-title">RECENT COMMENTS</h3>
            <li v-if="commentList != null" v-for="item in commentList">
              <router-link :to="'/article/' + item.articleId">{{item.name}} : {{item.content}}</router-link>
            </li>
          </div>
          <div class="meta-item meta-mobile-user">
            <div v-if="userIsSignIn">
              <a href="#">
                <span>
                  <img :src="userAvatar" alt="Vin">
                </span>
              </a>
              <button class="meta-mobile-user-item">{{userName}}</button>
              <span class="meta-mobile-user-line">|</span>
              <button class="meta-mobile-user-item" v-if="isMaster">个人中心</button>
              <button class="meta-mobile-user-item" v-if="!isMaster">游客</button>
              <span class="meta-mobile-user-line">|</span>
              <button class="meta-mobile-user-item" @click="signOut">退出</button>
            </div>
            <div v-if="!userIsSignIn">
              <button class="meta-mobile-user-item" @click="signIn">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
    import Headroom from "headroom.js";
    import { findAllArticle } from "@/api/article";
    import { findAllComment } from "@/api/comment";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import { faCog, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import { signOut } from "../utils/tokenUtils"
    import store from "../store"
    import { confirmIsMaster } from "../api/write";
    import { MessageBox, Message } from 'element-ui'

    export default {
        name: "Layout",
        data() {
            return {
                articleList: null,
                commentList: null,
                faHome: faPlusCircle,
                faCog: faCog,
                userDropdownMenu: false,
                isSignIn: false
            }
        },
        created() {
            // this.fetchData()
        },
        mounted() {
            this.init()
        },
        methods: {
            fetchData() {
                // findAllArticle().then(res => {
                //   this.articleList = res.data
                // })
                // findAllComment().then(res => {
                //   this.commentList = res.data
                // })
                // console.log("sadsf")
            },
            init() {
                var header = new Headroom(document.getElementById("header"), {
                    tolerance: 0,
                    offset: 70,
                    classes: {
                        initial: "animated",
                        pinned: "slideDown",
                        unpinned: "slideUp"
                    }
                });
                header.init();
            },

            signIn() {
                this.$router.push("/login")
            },

            signOut() {
                signOut()
            },

            confirmIsMaster() {
                confirmIsMaster().then(response => {
                    // console.log(response)
                    if (response.code == "41003") {
                        // console.log(response.message)
                    } else if (response.code == "42000") {
                        // console.log("token 过期了")
                        signOut()
                    } else {
                        this.$router.push("/writer")
                    }
                })
            }


        },
        computed: {
            userIsSignIn: {
                get() {
                    return this.$store.getters.userIsSignIn
                }
            },

            userAvatar: {
                get() {
                    return this.$store.getters.userAvatar
                }
            },

            userName: {
                get() {
                    return this.$store.getters.userName
                }
            },

            userRole: {
                get() {
                    // console.log(this.$store.getters.userRole)
                    return this.$store.getters.userRole
                }
            },

            isMaster: {
                get() {
                    // console.log(this.$store.getters.userRole)
                    return this.$store.getters.userRole == 1
                }
            }

        }
    }
</script>

<style lang="scss" scoped>


</style>

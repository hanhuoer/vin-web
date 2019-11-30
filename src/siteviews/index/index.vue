<template>
  <div class="index-page main-content">
    <div class="post-lists">
      <div class="post-lists-body">
        <div class="post-list-item" v-if="articleList == null || articleList.length == 0">
          <p>还有没有发表文章呢！</p>
        </div>
        <div class="post-list-item" v-else v-for="item in articleList">
          <div class="post-list-item-container">
            <div class="item-thumb bg-deepgrey" :style="'background-image:url(' + item.origin + ');'"></div>
            <router-link :to="'/article/' + item.noteId">
              <div class="item-desc">
                <p :text="item.noteAbstract">{{item.noteAbstract}}</p>
              </div>
            </router-link>
            <div class="item-slant reverse-slant bg-deepgrey"></div>
            <div class="item-slant"></div>
            <div class="item-label">
              <div class="item-title">
                <router-link :to="'/article/' + item.noteId" v-text="item.title"></router-link>
              </div>
              <div class="item-meta clearfix">
                <div class="item-meta-ico bg-ico-book"
                     style="background: url(/bg-ico.png) no-repeat;background-size: 40px auto;"></div>
                <div class="item-meta-cat"><a :href="/notebook/ + item.notebookName">{{item.notebookName}}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lists-navigator clearfix">
      <ol class="page-navigator">
        <li v-if="current > 1" class="prev">
          <a :href="'/page/' + (current - 1)">←</a>
        </li>
        <li v-for="i in pages" :class="current == i ? 'current' : ''">
          <a :href="'/page/' + i">{{i}}</a>
        </li>
        <li v-if="current < pages" class="next">
          <a :href="'/page/' + (current + 1)">→</a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
    import { getArticleListForSite, findPublishedOfNoteListByPage } from '@/api/article'

    export default {
        name: "index",
        data() {
            return {
                articleList: null,
                current: 0,
                pages: 0,
                total: 0
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                let param = this.$route.params.page
                if (param != undefined) {
                    this.current = param
                }
                if (param == undefined) {
                    param = 1
                }
                // getArticleListForSite(param).then(res => {
                //     this.articleList = res.data.rows
                //     this.current = res.data.current
                //     this.pages = res.data.pages
                //     this.total = res.data.total
                // })
                findPublishedOfNoteListByPage(param)
                    .then(response => {
                        // console.log(response)
                        this.articleList = response.data.data
                        this.total = response.data.totalSize
                        this.current = response.data.currentPage
                        this.pages = response.data.totalPage
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
  @import "~@/styles/style.min.css";
</style>


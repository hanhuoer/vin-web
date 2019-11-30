<template>
  <div class="main-content archive-page clearfix">
    <div class="categorys-item">
        <span v-if="archives != null || archives.length > 0" v-for="item in archives">
            <div class="categorys-title">{{item.date}}</div>
            <div class="post-lists">
                <div class="post-lists-body">
                    <div class="post-list-item" v-for="note in item.notes">
                        <div class="post-list-item-container">
                            <div class="item-label">
                                <div class="item-title">
                                    <a :href="'/article/' + note.noteId">{{note.title}}</a>
                                </div>
                                <div class="item-meta clearfix">
                                    <div class="item-meta-date">{{note.firstPublishTime}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </span>
    </div>
  </div>

</template>

<script>
    import { findArchives } from '@/api/article'

    export default {
        name: "index",
        data() {
            return {
                archives: null
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                findArchives().then(response => {
                    this.archives = response.data
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
  @import "~@/styles/style.min.css";
</style>

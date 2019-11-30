<template>
  <div class="note-container">
    <p class="tip">{{ noteStatus }}</p>
    <div class="note-title-container">
      <input type="text" class="note-title"
             v-model="title">
    </div>
    <vue-simplemde v-model="content"
                   ref="markdownEditor"
                   preview-class="markdown-body"
                   :highlight="true"
                   :configs="configs"/>
  </div>
</template>

<script>
    import axios from "../../utils/httpUtils";
    import store from "../../store";
    import VueSimplemde from "vue-simplemde";
    import SimpleMDE from 'simplemde';
    import hljs from "highlight.js";
    import marked from "marked"

    window.hljs = hljs;

    // VueSimplemde.codemirror.on("change", function(){
    //     // console.log(VueSimplemde.value());
    // });

    export default {
        components: {
            VueSimplemde
        },
        data() {
            return {
                configs: {
                    // toolbar: false,

                    autoDownloadFontAwesome: false,
                    status: false,
                    // autosave: {
                    //     enabled: true,
                    //     uniqueId: 'MyUniqueID',
                    //     delay: 1000
                    // },
                    toolbar: [
                        {
                            name: "save",
                            title: "Save Button",
                            // className: "fa fa-star",
                            className: "fa fa-save",
                            action: function() {
                                // console.log(store)

                                store.commit("setNoteStatus", "保存中")
                                const note = store.state.note;
                                const autoSaveUrl = "/api/vin/author/note/save";

                                axios.post(autoSaveUrl, {
                                    "noteId": note.noteId,
                                    "title": note.title,
                                    "content": note.content,
                                    "contentHtml": marked(note.content)
                                }).then(response => {
                                    // console.log(response)
                                    if (response.data.code === "20000") {
                                        // console.log("success auto save.")
                                        store.commit("setNoteStatus", "已保存")
                                    }
                                }).catch(error => {
                                    // console.log(error)
                                })

                            },
                        },
                        {
                            name: "publish",
                            title: "Publish Button",
                            className: "fa fa-share",
                            action: function() {
                                // console.log("----------------------------")
                                store.commit("setNoteStatus", "发布中")
                                const note = store.state.note;
                                // console.log(note)

                                axios.post("/api/vin/author/note/publish", {
                                    "noteId": note.noteId,
                                }).then(response => {
                                    // console.log(response)
                                    if (response.data.code === "20000") {
                                        // console.log("success auto save.")
                                        store.commit("setNoteStatus", "已发布")
                                    }
                                }).catch(error => {
                                    // console.log(error)
                                })

                                // console.log("----------------------------")
                            }
                        },
/*                        "|",
                        "bold", "italic", "strikethrough", "heading",
                        "|",
                        "quote", "code", "unordered-list", "ordered-list", "clean-block",
                        "|",
                        "link", "image", "table", "horizontal-rule",*/
                        "|",
                        "preview", "side-by-side", "fullscreen", "guide",
                        "|"
                    ]
                }
            };
        },
        methods: {
            save: function() {
                alert("sad")
            }
        },
        created() {

        },
        computed: {
            title: {
                get() {
                    if (this.$store.state.note !== null) {
                        return this.$store.state.note.title;
                    }
                    return ""
                },
                set(value) {
                    if (this.$store.state.note !== null) {
                        this.$store.commit("setNoteTitle", value);
                    }
                }

            },
            content: {
                get() {
                    if (this.$store.state.note !== null) {
                        return this.$store.state.note.content;
                    }
                    return ""
                },
                set(value) {
                    if (this.$store.state.note !== null) {
                        this.$store.commit("setNoteContent", value);
                    }
                }
            },
            noteStatus: function() {
                if (this.$store.state.note !== null) {
                    return this.$store.state.note.status;
                }
                return ""
            }
        },
        watch: {
            title(newValue, oldValue) {
                this.lastModifiedTitleTime = new Date();
                this.allowAutoSaveTitle = true;
            },
            content(newValue, oldValue) {
                this.lastModifiedContentTime = new Date();
                this.allowAutoSaveContent = true;
            }

        },
        mounted() {

        }
    };

</script>

<style scoped>
  @import '~simplemde/dist/simplemde.min.css';
  @import '~github-markdown-css';
  /*@import '~simplemde/dist/simplemde.min.css';*/
  @import '~highlight.js/styles/atom-one-dark.css';
  @import "~font-awesome/css/font-awesome.min.css";

  .note-container {
    position: relative;
  }

  .note-title-container {
    position: absolute;
  }

  .note-title-container {
    min-height: 54px;
  }

  .note-title {
    width: 100%;
    padding: 10px 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .vue-simplemde {
    height: calc(100% - 54px);
    margin-top: 54px;
    position: relative;
  }

  .vue-simplemde >>> .CodeMirror {
    height: calc(100% - 48px);
    border: 0;
  }

  .vue-simplemde >>> .editor-toolbar {
    border: 0;
    background: #d9d9d9;
    border-radius: 0;
  }

  .tip {
    position: absolute;
    right: 4px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 0, 0, .65);
  }

  .CodeMirror .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word) {
    background: none !important;
  }

</style>

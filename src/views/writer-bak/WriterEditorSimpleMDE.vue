<template>
  <div class="note-container">
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
    import VueSimplemde from "vue-simplemde";
    import hljs from "highlight.js";

    window.hljs = hljs;

    export default {
        components: {
            VueSimplemde
        },
        data() {
            return {
                configs: {
                    // toolbar: false,
                    status: false
                }
            };
        },
        methods: {

        },
        created() {

        },
        computed: {
            title: {
                get() {
                    return this.$store.state.note.title;
                },
                set(value) {
                    // console.log("set")
                    this.$store.commit("setNoteTitle", value);
                }

            },
            content: {
                get() {
                    return this.$store.state.note.content;
                },
                set(value) {
                    this.$store.commit("setNoteContent", value);
                }
            }
        },
        watch: {}
    };
</script>

<style scoped>
  @import '~simplemde/dist/simplemde.min.css';
  @import '~github-markdown-css';
  @import '~simplemde/dist/simplemde.min.css';
  @import '~highlight.js/styles/atom-one-dark.css';

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
    height: calc(100% - 96px);
    border: 0;
  }

  .vue-simplemde >>> .editor-toolbar {
    border: 0;
    background: #d9d9d9;
    border-radius: 0;
  }
</style>

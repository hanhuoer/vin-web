<template>
  <div class="writer">
    <div id="notebook-container">
      <writer-notebook id="notebook"/>
    </div>
    <div id="note-container">
      <writer-note id="note"/>
      <writer-editor-simple-m-d-e id="editor-container"/>
    </div>
  </div>
</template>

<script>
    import WriterNotebook from "./WriterNotebook";
    import WriterNote from "./WriterNote";
    import WriterEditor from "./WriterEditor";
    import WriterEditorSimpleMDE from "./WriterEditorSimpleMDE";

    export default {
        name: "Writer",
        components: { WriterEditorSimpleMDE, WriterNote, WriterNotebook }
    };
</script>

<style scoped>
  html, body {
    height: 100%;
  }

  .writer {
    height: 100%;
    overflow: hidden;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  }

  #notebook-container {
    height: 100%;
    width: 16.66666667%;
    float: left;
    position: relative;
  }

  #note-container {
    height: 100%;
    width: 83.33333333%;
    float: left;
    position: relative;
  }

  #notebook {
    height: 100%;
  }

  #note {
    height: 100%;
    width: 30%;
    float: left;
  }

  #editor-container {
    height: 100%;
    width: 70%;
    float: left;
  }
</style>

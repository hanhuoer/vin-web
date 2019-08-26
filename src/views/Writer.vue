<template>
  <div class="writer">
    <div id="notebook-container">
      <writer-notebook id="notebook"/>
    </div>
    <div id="note-container">
      <writer-note id="note"/>
      <writer-editor id="editor"/>
    </div>
  </div>
</template>

<script>
import WriterNotebook from './WriterNotebook'
import WriterNote from './WriterNote'
import WriterEditor from './WriterEditor'

export default {
  name: 'Writer',
  components: { WriterEditor, WriterNote, WriterNotebook }
}
</script>

<style scoped>
  html, body {
    height: 100%;
  }

  .writer {
    height: 100%;
    overflow: hidden;
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

  #editor {
    height: 100%;
    width: 70%;
    float: left;
  }
</style>

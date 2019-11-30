<template>
  <div class="writer-note">
    <div class="writer-note-top"
         @click="newNote()">
      <font-awesome-icon :icon="faPlusCircle" class="top-icon"/>
      <span> 新建文章</span>
    </div>
    <div class="writer-note-middle">
      <ul class="middle-ul">
        <li class="middle-li"
            v-for="(item, index) in notes"
            @click="active(item, index)"
            :class="{'active': item.active}">
          <font-awesome-icon class="middle-icon"
                             :icon="faStickyNoteOpen"/>
          <div class="setting-button note-option"
               @click="enableOperate = !enableOperate">
            <font-awesome-icon :icon="faCog"
                               v-if="item.active"/>
            <span v-if="item.active && enableOperate">
              <ul class="note-option-set">
                <li @click="deleteNote(item, index)">
                  <span>删除</span>
                </li>
              </ul>
            </span>
          </div>
          <span class="middle-title">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <div class="writer-note-bottom"></div>
  </div>
</template>

<script>
    import axios from "../../utils/httpUtils";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import { faCog, faPlusCircle, faStickyNote as faStickyNoteClose } from "@fortawesome/free-solid-svg-icons";
    import { faStickyNote as faStickyNoteOpen } from "@fortawesome/fontawesome-free-regular";

    export default {
        name: "WriterNote",
        data() {
            return {
                faPlusCircle: faPlusCircle,
                faStickyNoteOpen: faStickyNoteOpen,
                faStickyNoteClose: faStickyNoteClose,
                faCog: faCog,
                enableOperate: false
            };
        },
        methods: {
            active: function(item, index) {
                this.$store.state.notes.forEach(function(item) {
                    item.active = false;
                });
                item.active = true;

                var urlNoteContent = "/api/vin/write/notebook/" + item.notebookId + "/note/" + item.noteId + "/content";
                // var url = "/note/draft/content/" + draftId;
                // console.log("===============================================")
                // console.log(item)
                // console.log("===============================================")
                axios.get(urlNoteContent)
                    .then(response => {
                        // console.log(response);
                        const note = response.data.data;
                        note.status = "已保存"
                        this.$store.commit("setNote", note)
                    })
                    .catch(error => {
                        // console.log(error);
                    });
                // console.log(this.$store)
            },
            getNotes: function(notebookId) {
                var urlAllNote = "/api/vin/notebook/" + notebookId + "/note/all";
                axios.get(urlAllNote)
                    .then(response => {
                        const notes = response.data.data;
                        notes.forEach(item => {
                            item.active = false;
                        })
                        if (notes.length > 0) {
                            notes[0].active = true
                        }
                        this.$store.commit("setNotes", notes)
                    }).catch(error => {
                    // console.log(error);
                });
            },
            newNote: function() {
                // 1. new note
                const newNoteUrl = "/api/vin/note/append"
                let notebookId = null;
                this.$store.state.notebooks.forEach(item => {
                    if (item.active !== null && item.active === true) {
                        notebookId = item.id
                    }
                })
                axios.post(newNoteUrl, {
                    "notebookId": notebookId,
                }).then(response => {
                    // console.log(response)

                    if (response.data.code === "20000") {
                        // 2. get all note
                        var urlAllNote = "/api/vin/notebook/" + notebookId + "/note/all";
                        axios.get(urlAllNote)
                            .then(response => {
                                const notes = response.data.data;
                                notes.forEach(item => {
                                    item.active = false;
                                })
                                notes[notes.length - 1].active = true
                                this.$store.commit("setNotes", notes)
                            }).catch(error => {
                            // console.log(error);
                        });
                    }

                }).catch(error => {
                    // console.log(error)
                })


            },
            deleteNote: function(item, index) {
                // delete one
                const deleteNoteUrl = "/api/vin/notebook/" + item.notebookId + "/note/" + item.noteId + "/delete"
                axios.delete(deleteNoteUrl)
                    .then(response => {
                        // console.log(response)
                        if (response.data.code === "20000") {
                            // get all notes again
                            this.$store.state.notebooks.forEach(item => {
                                if (item.active === true) {
                                    this.getNotes(item.id)
                                }
                            })
                        }
                    })
                    .catch(error => {
                        // console.log(error)
                    })
            }
        },
        comments: {
            FontAwesomeIcon
        },
        created() {
        },
        mounted() {
        },
        computed: {
            notes: function() {
                return this.$store.state.notes;
            }
        },
        watch: {
            notes: function(newValue, oldValue) {
                // console.log("watch notes ============================")
                // console.log(newValue)
                if (newValue.length > 0) {
                    newValue.forEach((item, index) => {
                        if (item.active === true) {
                            // console.log(item)
                            this.active(item, index)
                        }
                    })
                } else {
                    this.$store.commit("setNote", null)
                }
                // console.log("watch notes ============================")
            }
        }
    };
</script>

<style scoped>
  .writer-note {
    background-color: #f5f5f5;
    overflow: auto;
  }

  .writer-note ul {
    padding: 0;
  }

  .writer-note-top {
    line-height: 19px;
    font-size: 15px;
    font-weight: 400;
    padding: 20px 0 20px 25px;
    cursor: pointer;
    color: #595959;
  }

  .writer-note-top:hover {
    color: #262626;
  }

  .top-icon {
    padding-right: 3px;
    font-size: 18px;
    vertical-align: bottom;
  }

  .writer-note-middle {
    /*overflow: auto;*/
  }

  .middle-ul {
    position: relative;
    margin-bottom: 0;
    background-color: #efe9d9;
    border-top: 1px solid #d9d9d9;
  }

  .middle-ul .middle-li {
    position: relative;
    height: 90px;
    color: #595959;
    background-color: #fff;
    margin-bottom: 0;
    padding: 15px 10px 15px 60px;
    -webkit-box-shadow: 0 0 0 1px #d9d9d9;
    box-shadow: 0 0 0 1px #d9d9d9;
    border-left: 5px solid transparent;
    list-style: none;
    line-height: 60px;
    cursor: pointer;
  }

  .middle-ul .middle-li:hover {
    background-color: #e6e6e6 !important;
  }

  .middle-icon {
    position: absolute;
    top: 30px;
    left: 20px;
    width: 22px;
    height: 30px;
  }

  .middle-title {
    display: block;
    height: 60px;
    line-height: 60px;
    margin-right: 40px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
  }

  .writer-note-middle .setting-button {
    float: right;
    font-size: 16px;
    width: 40px;
    text-align: center;
    position: relative;
    min-height: 30px;
    max-height: 50px;
  }

  .active {
    background-color: #e6e6e6 !important;
    border-left: 3px solid #ec7259 !important;
  }

  .note-option .note-option-set {
    position: absolute;
    display: block;
    z-index: 99;
    right: 0;
    /*top: 100%;*/
    font-size: 14px;
    -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    list-style: none;
    background-color: #fff;
    color: #595959;
    border-radius: 6px;
  }

  .note-option .note-option-set li {
    padding: 10px 20px;
    line-height: 20px;
    white-space: nowrap;
    text-align: left;
    position: relative;
    font-size: 14px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    list-style: none;
    background-color: #fff;
    color: #595959;
    /*border-radius: 6px;*/
  }

  .note-option .note-option-set li span {
    display: block;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .note-option .note-option-set li:hover {
    background-color: #666666 !important;
    color: #ffffff;
  }


</style>

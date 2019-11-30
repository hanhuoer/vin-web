<template>
  <div class="notebook">
    <div class="notebook-top">
    </div>
    <div class="notebook-new">
      <div class="notebook-new-inner"
           @click="enableEdit=true">
        <font-awesome-icon :icon="faPlus"/>
        <span> 新建文集</span>
      </div>
      <transition name="slide-fade">
        <div class="notebook-new-edit"
             v-show="enableEdit">
          <input type="text" placeholder="请输入文集名..." name="name">
          <button type="submit">
            <span>提 交</span>
          </button>
          <button type="button" @click="enableEdit=false">
            <span>取 消</span>
          </button>
        </div>
      </transition>
    </div>
    <div class="notebook-option">
      <ul>
        <li v-for="(item, index) in notebooks"
            @click="item.active?null:active(item, index)"
            :class="{'active': item.active}">
          <span v-if="!item.active || !enableEditNotebookName">{{ item.name }}</span>
          <input type="text"
                 v-if="item.active && enableEditNotebookName"
                 :value="item.name"
                 @keyup.enter="updateNotebookName(item.id, index, $event)"/>
          <div class="notebook-option-icon setting-button"
               v-show="item.active"
               @click="clickNotebookOperate">
            <font-awesome-icon :icon="faCog"/>
            <span v-if="enableOperate">
              <ul class="notebook-option-set">
                <li @click="showEditNotebookName">
                  <span>修改</span>
                </li>
                <li>
                  <span>删除</span>
                </li>
              </ul>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import axios from "../../utils/httpUtils";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";

    export default {
        name: "WriterNotebook",
        data() {
            return {
                faPlus: faPlus,
                faCog: faCog,
                enableEdit: false,
                enableOperate: false,
                enableEditNotebookName: false
            };
        },
        methods: {
            getNote() {
                axios.get("/api/vin/notebook/query").then(response => {
                    response.data.data.forEach(function(item) {
                        item.active = false;
                    });
                    this.$store.state.notebooks = response.data.data;
                }).catch(error => {
                    // console.log(error);
                });
            },
            init() {
                // 1. notebook
                axios.get("/api/vin/notebook/query").then(response => {
                    response.data.data.forEach(function(item) {
                        item.active = false;
                    });
                    this.$store.state.notebooks = response.data.data;
                    if (response.data.data.length > 0) {
                        // 2. notes
                        this.$store.state.notebooks[0].active = true;
                        axios.get("/api/vin/note/notes", {
                            params: {
                                notebookId: response.data.data[0].id
                            }
                        }).then(response => {
                            this.$store.state.notes = response.data.data;
                            if (response.data.data.length > 0) {
                                // 3. note
                                if (this.$store.state.notes.length > 0) {
                                    var url = "/api/vin/note/draft/content/" + this.$store.state.notes[0].draftId;
                                    axios.get(url)
                                        .then(response => {
                                            this.$store.state.note = response.data.data;
                                        })
                                        .catch(error => {
                                            // console.log(error);
                                        });
                                }
                            }
                        }).catch(error => {
                            // console.log(error);
                        });
                    }
                }).catch(error => {
                    // console.log(error);
                });

            },
            active(item, index) {
                // init state
                this.enableEditNotebookName = false;
                this.enableOperate = false;
                // console.log("active()");
                // update store notebook state
                this.$store.state.notebooks.forEach(function(item) {
                    item.active = false;
                });
                item.active = true;
                // update store notes
                axios.get("/api/vin/note/notes", {
                    params: {
                        notebookId: item.id
                    }
                }).then(response => {
                    this.$store.state.notes = response.data.data;
                }).catch(error => {
                    // console.log(error);
                });
            },
            clickNotebookOperate() {
                this.enableOperate = !this.enableOperate;
                return this.enableOperate;
            },
            showEditNotebookName() {
                this.enableEditNotebookName = !this.enableEditNotebookName;
                // console.log(this.enableEditNotebookName);
                return this.enableEditNotebookName;
            },
            updateNotebookName(notebookId, index, e) {
                this.$store.state.notebooks.forEach(item => {
                    if (notebookId === item.id) {
                        item.name = e.target.value;
                    }
                });

                // console.log(e)
                // console.log(notebookId);
                // console.log(this.$store.state.notebooks[index])

                this.enableEditNotebookName = false

            }
        },
        comments: {
            FontAwesomeIcon
        },
        computed: {
            notebooks() {
                return this.$store.state.notebooks;
            },
            notes() {
                return this.$store.state.notes;
            },
            note() {
                return this.$store.state.note;
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style scoped>

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(10px);
    opacity: 0;
  }

  .notebook {
    font-size: 14px;
    line-height: 1.5;
    color: #f2f2f2;
    background-color: #404040;
  }

  .notebook-top {
    padding: 30px 18px 5px;
    text-align: center;
  }

  .notebook-new {
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .notebook-new-inner {
    color: #f2f2f2;
    cursor: pointer;
  }

  .notebook-new-inner:hover {
    color: #fff;
  }

  .notebook-new-inner span {
    margin-left: 4px;
  }

  .notebook-new-edit {
    overflow: hidden;
  }

  .notebook-new-edit input {
    width: 100%;
    height: 35px;
    color: #ccc;
    background-color: #595959;
    border: 1px solid #333;
    padding: 4px 6px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
  }

  .notebook-new-edit > button:nth-child(2) {
    color: #42c02e;
    margin-left: 4px;
    background-color: #404040;
    position: relative;
    display: inline-block;
    text-align: center;
    height: 30px;
    line-height: 20px;
    padding: 4px 12px;
    border: 1px solid #42c02e;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    transition: all .2s cubic-bezier(.645, .045, .355, 1);
  }

  .notebook-new-edit > button:nth-child(3) {
    margin-left: 8px;
    background-color: #404040;
    border-color: transparent;
    color: #999;
    position: relative;
    display: inline-block;
    text-align: center;
    height: 30px;
    line-height: 20px;
    padding: 4px 12px;
    border: 1px solid transparent;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    transition: all .2s
  }

  .notebook-option input {
    background-color: rgba(0, 0, 0, 0);
    border: 0px;
    font-size: 15px;
  }

  .notebook-option input:focus {
    outline: none;
  }

  .notebook-option ul {
    position: relative;
    z-index: 0;
    background-color: #8c8c8c;
  }

  .notebook-option ul li {
    /*position: relative;*/
    line-height: 40px;
    list-style: none;
    font-size: 15px;
    color: #f2f2f2;
    background-color: #404040;
    padding: 0 15px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
  }

  .notebook-option ul li:hover {
    background-color: #666;
    color: #ffffff;
  }

  .notebook-option .notebook-option-icon {
    float: right;
  }

  .notebook-option .notebook-option-set {
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

  .notebook-option .notebook-option-set li {
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

  .notebook-option .notebook-option-set li span {
    display: block;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .active {
    background-color: #666 !important;
    border-left: 3px solid #ec7259 !important;
    padding-left: 12px !important;
  }


</style>

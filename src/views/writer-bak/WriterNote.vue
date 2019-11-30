<template>
  <div class="writer-note">
    <div class="writer-note-top">
      <font-awesome-icon :icon="faPlusCircle" class="top-icon"/>
      <span> 新建文章</span>
    </div>
    <div class="writer-note-middle">
      <ul class="middle-ul">
        <li v-for="(item, index) in notes"
            @click="active(item.draftId, item.title)">
          <font-awesome-icon class="middle-icon" :icon="faStickyNoteOpen"/>
          <div class="setting-button">
            <font-awesome-icon :icon="faCog"/>
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
                faCog: faCog
            };
        },
        methods: {
            active: function(draftId, title) {
                var url = "/note/draft/content/" + draftId;
                axios.get(url)
                    .then(response => {
                        // console.log(response);
                        this.$store.state.note = response.data.data;
                    })
                    .catch(error => {
                        // console.log(error);
                    });
                // console.log(this.$store)
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
        }
    };
</script>

<style scoped>
  .writer-note {
    background-color: #f5f5f5;
    overflow: auto;
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

  .middle-ul li {
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

  .middle-ul li:hover {
    background-color: #e6e6e6;
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


</style>

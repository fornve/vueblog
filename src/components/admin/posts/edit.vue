<template>
  <v-container>
    <v-layout row wrap align-center>
      <div v-if="!post.metadata">Post is loading</div>
      <v-flex grid-list-xl v-if="post.metadata">
        <v-layout
            wrap
            justify-space-between
        >
          <v-flex xs12>
            <v-form ref="form">
              <v-text-field
                  v-model="name"
                  label="Post name"
              ></v-text-field>
            </v-form>
          </v-flex>

          <v-flex xs12>
            <v-textarea
                v-if="false"
                v-model="description"
                label="Description"
                auto-grow
            ></v-textarea>
            <editor-menu-bar :editor="editor">
              <v-flex xs6 class="menubar" slot-scope="{ commands, isActive }">
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                >
                  <v-icon>format_bold</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                >
                  <v-icon>format_italic</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                >
                  <v-icon>strikethrough_s</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                >
                  <v-icon>format_underline</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                >
                  <v-icon>code</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.paragraph() }"
                    @click="commands.paragraph"
                >
                  <v-icon>format_line_spacing</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 2 })"
                >
                  <v-icon>title</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 3 })"
                >
                  <v-icon small>title</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                >
                  <v-icon>format_list_bulleted</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                >
                  <v-icon>format_list_numbered</v-icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                >
                  <v-icon>format_quote</v-icon>
                </button>

                <button
                    class="menubar__button"
                    @click="commands.horizontal_rule"
                >
                  <v-icon>subdirectory_arrow_left</v-icon>
                </button>

                <button
                    class="menubar__button"
                    @click="commands.undo"
                >
                  <v-icon>chevron_left</v-icon>
                </button>

                <button
                    class="menubar__button"
                    @click="showImagePrompt(commands.image)"
                >
                  <v-icon>image</v-icon>
                </button>

                <button
                    class="menubar__button"
                    @click="commands.redo"
                >
                  <v-icon>chevron_right</v-icon>
                </button>
              </v-flex>
            </editor-menu-bar>
            <editor-content :editor="editor" />
          </v-flex>

          <v-flex xs12>
            <v-checkbox
                v-model="published"
                label="Published"
                data-vv-name="checkbox"
                type="checkbox"
            ></v-checkbox>
          </v-flex>

          <v-flex xs12>
            <v-btn color="success" v-on:click="update()">Update</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>

</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    Image,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
  } from 'tiptap-extensions'

  export default {
    name: "New",
    components: {
      EditorContent, EditorMenuBar
    },
    computed: {
      ...mapState({
        post: state => state.admin.posts.post
      }),
      ...mapGetters(['user']),
      name: {
        set(value) {
          this.$store.commit('admin/posts/updatePostName', value)
        },
        get() {
          return this.post.metadata.name;
        }
      },
      published: {
        set(value) {
          this.$store.commit('admin/posts/updatePostPublished', value)
        },
        get() {
          return this.post.metadata.published;
        }
      }
    },
    data() {
      return {
        editor: null
      }
    },
    methods: {
      ...mapActions(['admin/posts/retrievePost', 'admin/posts/updatePost']),
      update() {
        this['admin/posts/updatePost'](this.user.uid)
      },
      showImagePrompt(command) {
        const src = prompt('Enter the url of your image here')
        if (src !== null) {
          command({ src })
        }
      },
    },
    mounted() {
      this['admin/posts/retrievePost'](this.$route.params.id)
      this.editor = new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Image(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: this.post.metadata.description,
        onUpdate: state => {
          console.log(state.getHTML())
          this.$store.commit('admin/posts/updatePostDescription', state.getHTML())
        }
      })
    },
    beforeDestroy() {
      this.editor.destroy()
    },
  }
</script>

<style scoped>

</style>
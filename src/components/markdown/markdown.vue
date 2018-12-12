<template>
  <div class="m-editor" :style="{'width': width, 'height': height }">
    <i-menu
      :theme="theme"
      :preview-visible="previewVisible"
      @toggle="togglePreview"
      @input="insertMarkText"
    ></i-menu>
    <div class="m-editor-content">
      <div class="m-editor-left">
        <textarea id="m-editor" class="m-editor-textarea" :class="theme" v-model="markText"></textarea>
      </div>
      <div class="m-editor-right" v-html="markHtml" :class="theme" v-show="previewVisible"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import IMenu from './menu.vue';
import marked from 'marked';
import { getCursorPosition } from '../../utils/index';

@Component({
  components: {
    IMenu
  }
})
export default class MarkDown extends Vue {
  @Prop({ default: 'default' }) theme!: string;
  @Prop({ default: '960px' }) width!: string;
  @Prop({ default: '750px' }) height!: string;

  previewVisible: boolean = true;
  markText: string = '';
  markHtml: string = '';
  textareaDom!: HTMLInputElement;

  mounted() {
    this.textareaDom = document.getElementById('m-editor') as HTMLInputElement;
  }

  @Watch('markText')
  onMarkTextChange(value: string, oldValue: string) {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    this.markHtml = marked(value);
  }

  togglePreview() {
    this.previewVisible = !this.previewVisible;
  }

  insertMarkText(text: string) {
    const textareaDom = this.textareaDom;
    if (textareaDom) {
      textareaDom.focus();
      const rangeData = getCursorPosition(textareaDom);
      this.markText =
        this.markText.substring(0, rangeData.start) +
        text +
        this.markText.substring(rangeData.end, this.markText.length);
      textareaDom.selectionStart = rangeData.start + text.length;
      textareaDom.selectionEnd = rangeData.end + text.length;
    }
  }
}
</script>

<style lang="scss">
.m-editor {
  position: relative;
  padding-top: 36px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 6px;
  &-content {
    width: 100%;
    height: 100%;
    display: flex;
  }
  &-left {
    flex: 1;
    height: 100%;
    background: #fafbfc;
  }
  &-textarea {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    resize: none;
    font-size: 14px;
  }
  &-textarea.default {
    background: #fafbfc;
  }
  &-right {
    width: 50%;
    height: 100%;
    border-left: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;
    ul {
      margin: 10px 20px;
      list-style-type: square;
      padding: 0;
    }
    ol {
      margin: 10px 20px;
      list-style-type: decimal;
      padding: 0;
    }
    li {
      display: list-item;
      padding: 0;
    }
    hr {
      margin: 15px 0;
      border-top: 1px solid #eeeff1;
    }
    pre {
      display: block;
      margin: 10px 0;
      padding: 8px;
      border-radius: 4px;
      background-color: #f2f2f2;
      color: #656565;
      font-size: 14px;
    }
    blockquote {
      display: block;
      border-left: 4px solid #ddd;
      margin: 15px 0;
      padding: 0 15px;
    }
    img {
      margin: 20px 0;
    }
    a {
      color: #41b883;
    }
    table {
      border: 1px solid #eee;
      border-collapse: collapse;
    }
    tr {
      border: 1px solid #eee;
    }
    th {
      padding: 8px 30px;
      border-right: 1px solid #eee;
      background-color: #f2f2f2;
    }
    td {
      padding: 8px 30px;
      border-right: 1px solid #eee;
    }
  }
}
</style>

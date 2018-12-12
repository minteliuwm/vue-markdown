<template>
  <div class="m-menu" :class="theme">
    <div class="m-menu-left">
      <font-item :theme="theme" @input="handleInput"></font-item>
      <menu-item :theme="theme" icon="icon-bold" tips="加粗" @click.native="handleInput(' **Bold** ')"></menu-item>
      <menu-item :theme="theme" icon="icon-italic" tips="斜体字" @click.native="handleInput(' *Italic* ')"></menu-item>
      <menu-item :theme="theme" icon="icon-underline" tips="下划线" @click.native="handleInput(' <u>Underline</u> ')"></menu-item>
      <menu-item :theme="theme" icon="icon-strikethrough" tips="删除线" @click.native="handleInput(' ~~Strikethrough~~ ')"></menu-item>
      <menu-item :theme="theme" icon="icon-line" tips="水平线" @click.native="handleInput('* * *\n')"></menu-item>
      <menu-item :theme="theme" icon="icon-quote" tips="引用块" @click.native="handleInput('> Blockquote\n\n')"></menu-item>
      <menu-item :theme="theme" icon="icon-unorderedlist" tips="无序列表" @click.native="handleInput('1. Ordered List\n')"></menu-item>
      <menu-item :theme="theme" icon="icon-orderedlist" tips="有序列表" @click.native="handleInput('- Unordered List\n')"></menu-item>
      <menu-item :theme="theme" icon="icon-check" tips="任务" @click.native="handleInput('* [ ] ')"></menu-item>
      <menu-item :theme="theme" icon="icon-link" tips="插入链接" @click.native="handleInput('[链接](https://www.baidu.com)')"></menu-item>
      <menu-item :theme="theme" icon="icon-image" tips="插入图片" @click.native="handleInput('![图片](url)\n')"></menu-item>
      <table-item :theme="theme" @input="handleInput"></table-item>
      <!-- <menu-item :theme="theme" icon="icon-linechart" tips="插入图表"></menu-item> -->
      <menu-item :theme="theme" icon="icon-code" tips="代码块" @click.native="handleInput('```\n\n```\n')"></menu-item>
    </div>
    <div class="m-menu-right">
      <menu-item :theme="theme" icon="icon-fenlan" :tips="previewVisible ? '收起预览' : '展开预览'" @click.native="toggle"></menu-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MenuItem from './menuItem.vue';
import FontItem from './font.vue';
import TableItem from './table.vue';

@Component({
  components: {
    MenuItem,
    FontItem,
    TableItem
  }
})
export default class Menu extends Vue {
  @Prop({ default: 'default' }) theme!: string;
  @Prop() previewVisible!: boolean;

  toggle() {
    this.$emit('toggle');
  }

  handleInput(text: string) {
    this.$emit('input', text);
  }
}
</script>

<style lang="scss">
.m-menu {
  position: absolute;
  top: 0;
  height: 36px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 0 10px;
  &-left {
    display: flex;
  }
  &-right {
    display: flex;
  }
}

.m-menu.default {
  background-color: #fffffe;
}
</style>

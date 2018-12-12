<template>
  <div class="m-menu-font" @mouseleave="hide">
    <menu-item :theme="theme" icon="icon-fonttitle" tips="标题" @click.native="show"></menu-item>
    <ul class="m-menu-ul" v-show="visible">
      <li @click="handleClick('# 标题1')"><h1>标题1</h1></li>
      <li @click="handleClick('## 标题2')"><h2>标题2</h2></li>
      <li @click="handleClick('### 标题3')"><h3>标题3</h3></li>
      <li @click="handleClick('#### 标题4')"><h4>标题4</h4></li>
      <li @click="handleClick('##### 标题5')"><h5>标题5</h5></li>
      <li @click="handleClick('###### 标题6')"><h6>标题6</h6></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MenuItem from './menuItem.vue';

@Component({
  components: {
    MenuItem
  }
})
export default class FontItem extends Vue {
  @Prop({ default: 'default' }) theme!: string;

  visible: boolean = false;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  handleClick(text: string) {
    this.$emit('input', text);
    this.hide();
  }
}
</script>

<style lang="scss">
.m-menu-font {
  position: relative;
  .m-menu-ul {
    position: absolute;
    z-index: 10;
    white-space: nowrap;
    padding: 0;
    margin: 0;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    li {
      list-style-type: none;
      padding: 0 10px;
      color: #807f7f;
      text-align: center;
      cursor: pointer;
      h1,h2,h3,h4,h5,h6 {
        margin: 0;
      }
      h4,h5,h6 {
        line-height: 24px;
      }
    }
    li:hover {
      background: #eee;
    }
  }
}
</style>

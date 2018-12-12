<template>
  <div class="m-menu-item" :class="theme" @mouseleave="hideTips" @mouseenter="showTips">
    <i class="m-menu-icon" :class="icon"></i>
    <div class="m-menu-tips" v-show="tipsVisible">{{tips}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MenuItem extends Vue {
  @Prop({ default: 'default' }) theme!: string;
  @Prop() icon!: string;
  @Prop() tips!: string;

  tipsVisible: boolean = false;

  showTips() {
    this.tipsVisible = true;
  }

  hideTips() {
    this.tipsVisible = false;
  }
}
</script>

<style lang="scss">
.m-menu-item {
  position: relative;
  width: 24px;
  height: 24px;
  margin: 0 2px;
  cursor: pointer;
  text-align: center;
}

.m-menu-icon {
  line-height: 24px;
}

.m-menu-item.default {
  .m-menu-icon:before {
    color: #6e6e6e;
  }
  .m-menu-icon:hover:before {
    color: #0f1010;
  }
}

.m-menu-tips {
  position: absolute;
  z-index: 100;
  padding: 0 4px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  user-select: none;
}
</style>

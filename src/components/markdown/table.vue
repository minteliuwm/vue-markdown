<template>
  <div class="m-menu-table" @mouseleave="hide">
    <menu-item :theme="theme" icon="icon-table" tips="插入表格" @click.native="show"></menu-item>
    <div class="m-menu-panel" v-show="visible">
      <div v-for="(item, index) in cells" :key="index" class="m-menu-cell"
        :class="{'hover': item.x <= selectedCell.x && item.y <= selectedCell.y}"
        @mouseover="selectCell(item)"
        @click="handleClick(item)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MenuItem from './menuItem.vue';

interface Cell {
  x: number;
  y: number;
}

@Component({
  components: {
    MenuItem
  }
})
export default class TableItem extends Vue {
  @Prop({ default: 'default' }) theme!: string;

  visible: boolean = false;
  cells: Cell[] = [];
  selectedCell: Cell = {
    x: 0,
    y: 0
  };

  created() {
    const cells = [];
    for (let i = 0; i < 25; i++) {
      cells.push({
        x: Math.floor(i / 5),
        y: i % 5
      });
    }
    this.cells = cells;
  }

  selectCell(item: Cell) {
    this.selectedCell = item;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  handleClick(item: Cell) {
    const x = item.x;
    const y = item.y;
    let text = '';
    for (let i = 0; i <= y + 1; i++) {
      for (let j = 0; j <= x + 1; j++) {
        if (j !== 0) {
          text += i === 1 ? ' --- ' : ' ';
        }
        text += '|';
        if (j === x + 1) {
          text += '\n';
        }
      }
    }
    this.$emit('input', text);
  }
}
</script>

<style lang="scss">
.m-menu-table {
  position: relative;
  .m-menu-panel {
    position: absolute;
    padding: 6px;
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    cursor: pointer;
    .m-menu-cell {
      width: 24px;
      height: 24px;
      margin: 3px;
      background: #eaeaea;
      border-radius: 4px;
    }
    .m-menu-cell.hover {
      background: #232323;
    }
  }
}
</style>

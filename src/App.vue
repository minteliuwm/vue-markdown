<template>
  <div id="app">
    <mark-down :theme="theme" width="960px" height="750px"></mark-down>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MarkDown from './components/markdown';

@Component({
  components: {
    MarkDown
  }
})
export default class App extends Vue {
  theme: string = 'default';
}
</script>

<style lang="scss">
@import './scss/index.scss';
</style>

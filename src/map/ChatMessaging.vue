<template>
  <v-layout fluid fill-height>
    <div ref="one" :id=one class="mr-2">
      <chat-history></chat-history>
    </div>
    <div ref="two" :id=two>
      <chat-window></chat-window>
    </div>
    <!-- <v-btn @click.stop="setSizes(20,20)"></v-btn> -->

  </v-layout>
</template>
<script>
import Split from 'split.js'

import ChatHistory from './ChatHistory';
import ChatWindow from './ChatWindow';
// import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  components: {
    ChatHistory,
    ChatWindow,
  },
  data () {
    return {
      width1: 200,

      one: "one",
      two: "two",
      split: {}
    }
  },
  mounted () {
    var vm = this

    const split = Split([this.$refs.one, this.$refs.two], {
       sizes: [15, 85],
      minSize: [0, 1200],
      gutterSize: 5,
    //       elementStyle: function (dimension, size, gutterSize) {
    //     return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
    // },
     gutterStyle: function (dimension, gutterSize) {
        return { 'flex-basis':  gutterSize + 'px' }
    },
      onDrag: function () {
        // localStorage.setItem('split-sizes', JSON.stringify(split.getSizes()));
        vm.onDrag(split.getSizes())
      },
      onDragEnd: function () {
        // localStorage.setItem('split-sizes', JSON.stringify(split.getSizes()));
        vm.onDragEnd(split.getSizes())
      },
      onDragStart: function () {
        // localStorage.setItem('split-sizes', JSON.stringify(split.getSizes()));
        vm.onDragStart(split.getSizes())
      }
    })
    this.split = split
    console.log(this.split.getSizes())

  },
  computed: {
    showSidebar () {
      /* eslint-disable-next-line */
      return this.$route.params.uuid === undefined;
    },
    showWindow () {
      /* eslint-disable-next-line */
      return this.$route.params.uuid !== undefined;
    },

  },
  methods: {

    setSizes (x, y) {
      // this.split.setSizes([200, 300])
      this.split.collapse(0)

    },
    onDrag (size) {
      console.log('Drag', size) // callback new size
      if (size[0] < 15) {
        this.split.collapse(0)

      }
    },
    onDragStart (size) {
      console.log('Drag End', size) // callback new size
    },
    onDragEnd (size) {
      console.log('Drag End', size) // callback new size
    },
    getSizes () {
      console.log(this.$refs.mySplit.getSizes())
    }

  }
}

</script>
<style lang="stylus" scoped>
.v-list{
background: red !important;

}
.theme--dark.v-list{
background: red !important;
}
.gutter{
    padding: 20px;
    background-color: "red";
}
/* #flex {
    display: flex;
    flex-direction: row;
} */

</style>
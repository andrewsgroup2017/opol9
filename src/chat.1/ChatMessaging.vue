<template>
  <v-layout fluid fill-height>
    <div ref="one" :id=one>
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
      // sizes: [50, 50],
      minSize: [0, 400],
      gutterSize: 10,
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
      if (size[0] < 10) {
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
.gutter {
   /* background: black; */
  /* padding-left: 6px; */
  border-right: 2px solid black;

}
.v-navigation-drawer: {
    background-color: #1a1a1a;

}

/* #flex {
    display: flex;
    flex-direction: row;
} */

</style>
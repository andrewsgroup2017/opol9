<template>
  <v-container class="fill-height pa-0 ma-0 messaging fluid" id="messaging">
    <template v-if="!$vuetify.breakpoint.smAndDown">
      <v-layout row>

        <multipane class="vertical-panes" layout="vertical">
          <!-- <multipane-resizer v-if="!showDetailPane">1</multipane-resizer> -->

          <!-- <span class="pane" v-show="!showDetailPane">
            <multipane-resizer></multipane-resizer>

          </span> -->
          <!-- <span class="pane" :style="{  minWidth: '2px',  width: '2px'}">
          </span> -->
          <div class="pane" v-show="showDetailPane" ref="detailpane" v-bind:style="{ minWidth: '2px', width: dpWidth + 'px' }">
            <!-- <v-flex lg3 class="white"> -->
            <!-- <div v-show="showDetailPane"> -->
            <resize-observer @notify="handleResize" />

            <chat-history>

            </chat-history>
            <!-- </v-flex> -->
          </div>
          <multipane-resizer v-show="showDetailPane"></multipane-resizer>

          <div class="pane" v-show="!showDetailPane" ref="detailpane" v-bind:style="{ minWidth: '2px', width: dpWidth + 'px' }">
          </div>
          <!-- </div> -->
          <multipane-resizer v-show="!showDetailPane"></multipane-resizer>

          <div class="pane" :style="{ flexGrow: 1 }">

            <!-- <v-flex lg9> -->
            <chat-window></chat-window>
            <!-- </v-flex> -->
          </div>
        </multipane>
      </v-layout>

    </template>
    <template v-else>
      <v-layout column>
        <v-flex sm12 class="white" v-if="showSidebar">
          <chat-history>
          </chat-history>
        </v-flex>
        <v-flex sm12 v-if="showWindow">
          <chat-window></chat-window>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import ChatHistory from './ChatHistory';
import ChatWindow from './ChatWindow';
import { Multipane, MultipaneResizer } from 'vue-multipane';

export default {
  components: {
    ChatHistory,
    ChatWindow,
    Multipane,
    MultipaneResizer
  },
  data () {
    return {
      dpWidth: 200,
      altered: false,
      showDetailPane: true
    };
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
    handleResize () {

      console.log('width ', this.$refs.detailpane.clientWidth)
      console.log('dpwidth ', this.dpWidth)
      console.log(this.altered)
      if (!this.altered) {
        this.dpWidth = this.$refs.detailpane.clientWidth

        if (this.$refs.detailpane.clientWidth < 140) {
          this.showDetailPane = false;
          this.dpWidth = 2;
          this.altered = true        }
      }
      if (this.altered) {

        if (this.$refs.detailpane.clientWidth > 140) {
          this.altered = false
          // this.dpWidth = 140;

          this.showDetailPane = true;        }
      }
    },
    // handleResize2 () {
    //   this.detailpanedpWidth = this.$refs.detailpane2.clientWidth
    //   this.detailpanedpWidth = this.$refs.detailpane.clientWidth
    //   console.log('resized2 ', this.$refs.detailpane.clientWidth)
    //   if (this.$refs.detailpane2.clientWidth > 140) { this.showDetailPane = true; }
    //   if (this.$refs.detailpane2.clientWidth < 140) { this.showDetailPane = false; this.dpWidth = 2 }
    //   // if (this.$refs.detailpane.clientWidth > 10) { this.dpWidth = 140; }
    //   // if (this.$refs.detailpane.clientWidth > 40) { this.showDetailPane = true; }

    // }
  }
};
</script>
<style>
.custom-resizer {
  width: 100%;
  height: 100%;
}
.custom-resizer > .pane {
  text-align: left;
  padding: 15px;
  overflow: hidden;
  /* background: #eee; */
  background: rgb(100, 11, 11);
  border: 1px solid #ccc;
}
.custom-resizer > .multipane-resizer {
  margin: 0;
  left: 0;
  position: relative;
}
.custom-resizer > .multipane-resizer:before {
  display: block;
  content: "";
  width: 3px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -1.5px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.custom-resizer > .multipane-resizer:hover:before {
  border-color: #999;
}
</style>
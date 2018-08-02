<template>
  <div id="chat" class="chat">
    <template v-if="!$vuetify.breakpoint.smAndDown">
      <v-navigation-drawer class="pa-0 chat-drawer" fixed permanent app width="64">
        <chat-menu :items="menus" class="chat-drawer--menu">
        </chat-menu>
      </v-navigation-drawer>
      <v-content class="chat-main">
        <transition>
          <router-view></router-view>
        </transition>
      </v-content>
       <v-footer

    fixed
    app
  >
  <v-toolbar>
   <v-spacer></v-spacer>
    <v-btn
          v-for="icon in icons"
          :key="icon"
         class="chat-drawer--menu"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
  </v-toolbar>

    <!-- <v-card
      class="flex"
      flat
      tile
    >
      <v-card-actions>
             <v-spacer></v-spacer>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3"

          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card> -->
  </v-footer>
    </template>
    <template v-else>
      <!-- <v-toolbar color="primary" fixed>
        <v-btn icon @click="handleClick">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar> -->
      <v-content class="chat-main">
        <transition>
          <router-view></router-view>
        </transition>
      </v-content>
      <v-bottom-nav :value="true" absolute color="primary" app fixed v-if="!hideBottomNav">
        <v-btn  flat :value="item.to.path" v-for="(item, index) in menus" :key="index" :to="item.to">
          <span>{{item.text}}</span>
          <v-icon>{{item.icon}}</v-icon>
        </v-btn>
      </v-bottom-nav>
    </template>
  </div>
</template>
<script>
import API from '@/api';
import ChatMenu from './ChatMenu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
  components: {
    VuePerfectScrollbar,
    ChatMenu
  },
  data: () => ({
    menus: API.getChatMenu,
        icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
  }),
  computed: {
    hideBottomNav () {
      /* eslint-disable-next-line */
      return this.$route.params.uuid !== undefined && this.$route.name === 'ChatMessaging';
    },
  },
  methods: {
    handleClick () {
      this.$router.go(-1);
    }
  }
};
</script>
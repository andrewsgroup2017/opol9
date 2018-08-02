<template>
     <v-app dark>
    <template v-if="!$route.meta.public">
        <app-drawer class="app--drawer"></app-drawer>
        <!-- <app-toolbar class="app--toolbar"></app-toolbar> -->
        <v-content>
          <!-- Page Header -->
          <!-- <page-header v-if="$route.meta.breadcrumb"></page-header> -->
          <div class="page-wrapper">
            <router-view></router-view>




          </div>
          <!-- App Footer -->
          <!-- <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">isocked.com Design &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> Make With Love </span>
            <v-icon color="pink" small>favorite</v-icon>
          </v-footer> -->
        </v-content>
        <!-- Go to top -->
        <!-- <app-fab></app-fab> -->
        <!-- theme setting -->
        <!-- <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings"> -->
        <!-- <v-icon>settings</v-icon> -->
        <!-- </v-btn> -->
        <v-navigation-drawer class="setting-drawer" temporary right v-model="rightDrawer" hide-overlay fixed>
          <theme-settings></theme-settings>
        </v-navigation-drawer>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar :timeout="3000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
     </v-app>
</template>
<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';
import ThemeSettings from '@/components/ThemeSettings';
import AppEvents from './event';

export default {
  components: {
    AppDrawer,
    AppToolbar,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: '',
    }
  }),
  computed: {

  },

  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;

  },
  methods: {
    openThemeSettings () {
      this.$vuetify.goTo(0);
      this.rightDrawer = (!this.rightDrawer);
    }
  },

};
</script>
<style lang="stylus">
  $color-pack = false

// $material-dark := {
//   status-bar: {
//     regular: #E0E0E0,
//     lights-out: rgba(#fff, .7)
//   },
//   app-bar: #F5F5F5,
//   background: #FAFAFA, // here
//   cards: #FFFFFF,
// }
//   @import '~vuetify/src/stylus/main'
// .theme--dark {
// background: red !important;

// }


// .v-list{
// background: red !important;

// }
.v-list{
background: #212121 !important;
}
// .v-list{
// background: red !important;

// }
// .theme--dark.v-list{
// background: red !important;
// }
// .v-footer{
// background: red !important;

// }
.application .theme--dark.v-card, .theme--dark .v-card{
background: #212121 !important;

}
.v-toolbar__content, .v-toolbar__extension{
background: #4CAF50 !important;
height: 35px !important;

}
.v-navigation-drawer{
background: #1a1a1a !important;
}
.theme--dark {
background: #212121 !important;
}
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>

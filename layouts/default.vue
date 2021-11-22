<template>
  <v-app dark>
    <v-responsive>
      <v-app-bar
        :clipped-left="clipped"
        fixed
        app
        class="d-flex justify-center"
      >
        <Logo :title="title" />
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; Ramon Oliveira {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-responsive>
  </v-app>
</template>

<script>
export default {
  components: {
    Logo: () => import("~/components/Logo.vue"),
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      rightDrawer: false,
      title: "ZGLIFY",
    };
  },
};
</script>

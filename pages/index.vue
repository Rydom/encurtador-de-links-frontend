<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <!-- <v-card-title class="headline"> Welcome to the ZGLify </v-card-title> -->
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <div>
                <p>Encurtador de links</p>
                <v-text-field v-model="model.originalLink" outlined />
                <input
                  id="shortened-url"
                  v-model="shortenedUrl"
                  type="hidden"
                />
              </div>
            </v-col>
            <v-col cols="4" class="d-flex align-center">
              <v-btn color="#98c14c" class="button-custom" @click="save">{{
                buttonLabel
              }}</v-btn>
            </v-col>
          </v-row>
          <v-row class="d-flex align-center">
            <v-col cols="12" class="d-flex justify-center">
              <div>Encurtando: <b>1345</b> URLs</div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div class="align-start">Foram acessadas: <b>3500</b> vezes</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from "vue";
import { LinkService } from "~/services";
import config from "~/config";
export default Vue.extend({
  name: "Index",
  data: function () {
    return {
      model: {
        originalLink: "",
      },
      buttonLabel: "Encurtar",
      shortenedUrl: "",
    };
  },
  computed: {
    baseUrl() {},
  },
  methods: {
    async save() {
      const linkService = new LinkService(this.$axios);

      await linkService.save(this.model).then((res) => {
        const { shortLink } = res.data;
        if (shortLink) {
          const baseUrl = config.WEBSITE_BASE_URL;
          const shortenedUrl = baseUrl + "/" + shortLink;
          this.shortenedUrl = shortenedUrl;
          this.buttonLabel = "Copiar";
          this.copyUrl();
        }
      });
    },
    async copyUrl() {
      let testingCodeToCopy = document.querySelector("#shortened-url");
      if (testingCodeToCopy) {
        testingCodeToCopy.setAttribute("type", "text");
        testingCodeToCopy.select();

        try {
          var successful = document.execCommand("copy");
          var msg = successful ? "successful" : "unsuccessful";
          alert("Testing code was copied " + msg);
        } catch (err) {
          alert("Oops, unable to copy");
        }

        /* unselect the range */
        testingCodeToCopy.setAttribute("type", "hidden");
        window.getSelection().removeAllRanges();
      }
    },
  },
});
</script>

<style>
.input {
  border-radius: 5px;
  background-color: #e9f7e9;
}

.button-custom {
  border-radius: 5px;
  padding: 28px 15px !important;
  margin-top: 10px;
  /* height: 56px !important; */
}
</style>

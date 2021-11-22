<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" justify="center" align="center">
      <v-card max-width="1600">
        <div class="container-titulo">
          <v-card-title class="titulo">{{ titulo }}</v-card-title>
        </div>
        <v-card-text style="max-width: 800px">
          <alert-sucess ref="alertSucess"></alert-sucess>
          <alert-error ref="alertError"></alert-error>
          <v-row>
            <v-col cols="10">
              <v-text-field
                v-model="model.originalLink"
                placeholder="Encurte o seu link"
                outlined
              />
              <input id="shortened-url" v-model="shortenedUrl" type="hidden" />
            </v-col>
            <v-col cols="2">
              <v-btn
                color="light-green darken-1"
                class="button-custom"
                @click="generateLink"
                >{{ buttonLabel }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
        <div>
          <!-- Informações -->
          <v-row class="d-flex align-left">
            <v-col cols="12" class="d-flex justify-center">
              <div>Encurtando: <b>1345</b> URLs</div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div class="align-start">Foram acessadas: <b>3500</b> vezes</div>
            </v-col>
          </v-row>
          <v-col cols="6" sm="12">
            <span>Seu link: {{ shortenedUrl }}</span>
            <v-icon dark right @click="copyUrl"> mdi-content-copy </v-icon>
          </v-col>
        </div>
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
      titulo:
        "O ZGLIFY é um encurtador de links, com ele você pode encutar seus links tornando mais fácil de compartilhar entre amigos, colocar na descrição do seu canal do youtube e muito mais.",
      model: {
        originalLink: "",
      },
      buttonLabel: "Encurtar",
      shortenedUrl: "o",
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

          if (this.copyUrl()) {
            const messageConfig = {
              title: "Sucesso!",
              text: "Seu link foi encurcutado com sucesso e já foi copiado para a àrea de transferência`",
              timer: 5000,
            };
            this.showSucessMessage(messageConfig);
          }
        }
      });
    },
    async copyUrl() {
      let htmlElement = document.querySelector("#shortened-url") as HTMLElement;
      if (htmlElement && htmlElement.value != "") {
        htmlElement.setAttribute("type", "text");
        htmlElement.select();

        try {
          var successful = document.execCommand("copy");
          var msg = successful ? "successful" : "unsuccessful";
          this.$refs.alertSucess.start({
            title: "Copiado!",
            text: `O seu link foi copiado para a àrea de transferência`,
            timer: 5000,
          });
        } catch (err) {
          this.$refs.errorSucess.start({
            title: "Error",
            text: `Não foi possível copiar a url`,
            timer: 5000,
          });
        }

        /* unselect the range */
        htmlElement.setAttribute("type", "hidden");
        window.getSelection().removeAllRanges();
      }
    },
    showSucessMessage() {
      this.$refs.alertSucess.start({
        title: "Copiado!",
        text: `O seu link foi copiado para a àrea de transferência`,
        timer: 5000,
      });
    },
  },
});
</script>

<style scoped>
.input {
  border-radius: 5px;
  background-color: #e9f7e9;
}

.button-custom {
  border-radius: 5px;
  padding: 28px 15px !important;
  font-weight: 800;
  /* height: 56px !important; */
}
.container-titulo {
  max-width: 800px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.titulo {
  /* margin-top: 40px; */
  /* margin-bottom: 40px; */
  font-family: Roboto Slab, sans-serif;
  font-size: 24;
  line-height: 36px;
  text-align: left;
}
</style>

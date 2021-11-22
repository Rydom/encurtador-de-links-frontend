<template>
  <div></div>
</template>

<script lang="ts">
//@ts-nocheck
export interface SuccessAlertPayload {
  title: string
  text: string
  icon?: string
  timer?: number
}

import Vue from 'vue'

export default Vue.extend({
  name: 'SuccessAlert',
  data: () => ({
    defaultTimer: 5000,
    icon: 'success'
  }),
  methods: {
    toastTop(timer: number): any {
      const toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timer ? timer : this.defaultTimer,
        timerProgressBar: true,
        didOpen: (toast: any) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        },
      })
      return toast
    },
    start(obj: SuccessAlertPayload) {
      this.toastTop(obj.timer).fire({
        icon: this.icon,
        title: obj.title,
        text: obj.text,
        showConfirmButton: false,
      })
    },
  },
})
</script>

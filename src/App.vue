<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
    async created() {
        // await this.$store.dispatch('User/getUserToken')
    },
}
</script>


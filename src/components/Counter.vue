<template>
  <div>{{ count }}</div>
</template>

<script>

export default {
  name: 'counter',
  computed:{
    count () {
      return this.$store.state.test
    }
  }
}
</script>

<style>


  
</style>

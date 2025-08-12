<template>
  <q-item
    clickable
    tag="a"
    :href="smartTo"
    @click="handleClick"
    v-bind="passThroughAttrs"
  >
    <slot />
  </q-item>
</template>

<script>
export default {
  name: 'QuasarButCachedLink',
  props: {
    smartTo: {
      type: String,
      required: true
    }
  },
  computed: {
    passThroughAttrs() {
      const passAttrs = { ...this.$attrs };
      delete passAttrs.href;
      delete passAttrs.to;
      delete passAttrs.smartTo;
      return passAttrs;
    },
  },
  methods: {
    handleClick(e) {
        e.preventDefault()
        this.$router.push(this.smartTo);
    }
  }
};
</script>

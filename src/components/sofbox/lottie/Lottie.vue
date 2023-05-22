<template>
  <div :class="className" ref="lavContainer"></div>
</template>
<script>
import lottie from 'lottie-web'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'lottieweb',
  props: {
    option: {
      type: Object,
      required: true
    },
    className: {
      type: String,
      default: 'bodymovin'
    }
  },
  mounted () {
    lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: this.option
    })
  }
}
</script>

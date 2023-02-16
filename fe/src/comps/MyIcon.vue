<template>
  <div class="my-icon-layout">
    <div class="my-icon" :style="{fontSize: calcSize(size)}" @click="btnClick">
      <img :src="`/image/${name}.svg`" :style="imgStyle">
    </div>
  </div>
</template>
<script>
import { isNum } from '@/utils/validate'
export default {
  name: 'MyIcon',
  props: {
    name: { type: String, default: '' },
    color: { type: String, default: '' },
    size: { type: [String, Number], default: 26 }
  },
  emits: ['click'],
  setup (props, { emit }) {
    const btnClick = evt => {
      emit('click', evt)
    }
    const imgStyle = props.color ? { filter: `drop-shadow(${props.color} 1000px 0)`, left: '-1000px' } : {}
    const calcSize = size => {
      return isNum(size) ? `${size}px` : size
    }
    return {
      calcSize,
      btnClick,
      imgStyle
    }
  }
}
</script>
<style lang="scss">
.my-icon {
  line-height: 1;overflow: hidden;
  &-layout {
    display: inline-block;
  }
  img {
    width: 1em;height: 1em;position: relative;display: block;
  }
}

</style>

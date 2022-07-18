<template>
  <div class="text-center">
    <div>
      <button
        :class="value> 1 ? 'text-blue-600' : 'text-gray-400'"
        class="text-based font-bold"
        @click="value > 1 ? $emit('input', value-1) : ''"
      >
        Previous Page
      </button>
      <span class="mx-7">|</span>
      <button
        :class="value < totalPages ? 'text-blue-600' : 'text-gray-400'"
        class="text-based font-bold"
        @click="value < totalPages ? $emit('input', value+1) : ''"
      >
        Next Page
      </button>
    </div>
    <div class="mt-3.5 pl-7 text-base font-normal text-gray-400">
      Showing results {{ range }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      default: 1,
      type: Number
    },
    totalResults: {
      default: 1,
      type: Number
    },
    totalPages: {
      default: 1,
      type: Number
    }
  },
  computed: {
    range () {
      const from = 1 + (this.value - 1) * 20
      const to = 20 + (this.value - 1) * 20
      return from + '-' + to
    }
  }
}
</script>

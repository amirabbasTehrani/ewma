<template>
  <div>
    <div class="bg-gray-300 rounded flex p-7 items-center">
      Search release date:
      <client-only>
        <date-picker
          v-model="date"
          value-type="format"
          format="YYYY-MM-DD"
          class="ml-4"
          placeholder="Release Date"
          range
        />
      </client-only>

      <button
        class="ml-auto bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-3xl"
        @click="page=1 , getMovies()"
      >
        search
      </button>
    </div>
    <div class="mt-32 grid grid-cols-3 gap-16">
      <nuxt-link
        v-for="(item , index) in data.results"
        :key="index"
        :to="'/movies/'+item.id"
        class="bg-gray-100 hover:bg-gray-300  ease rounded border-2 border-gray-300 p-1 flex"
      >
        <img class="w-2/5 rounded-l" :src="$config.imagePrefix + item.poster_path" :alt="item.title">

        <div class="p-4 content-between grid">
          <h4 class="text-base font-bold">
            {{ item.title }}
          </h4>
          <div class="text-xs font-normal text-gray-500">
            <div class="mb-2">
              <font-awesome-icon icon="fa-solid fa-calendar" />
              {{ item.release_date }}
            </div>
            <span
              v-for="(genre , i) in item.genre_ids"
              :key="i"
            >
              {{ genreName(genre) }}
              <span v-if="i < item.genre_ids.length - 1">•</span>
            </span>
          </div>
        </div>
      </nuxt-link>
    </div>
    <ThePagination
      v-model="page"
      :total-pages="data.total_pages"
      :total-results="data.total_results"
      class="mt-44 mb-24"
    />
  </div>
</template>

<script>
export default {

  async asyncData ({ $axios, $config }) {
    const data = await $axios.$get('https://api.themoviedb.org/3/discover/movie?api_key=' + $config.apiKey)
    const genres = await $axios.$get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + $config.apiKey)
    return { data, genres }
  },
  data () {
    return {
      page: 1,
      date: null
    }
  },
  head () {
    return {
      title: 'Movies list'
    }
  },
  watch: {
    page () {
      this.getMovies()
    }
  },
  methods: {
    genreName (id) {
      return this.genres.genres.find(x => x.id === id).name
    },
    getMovies () {
      const $this = this
      this.$axios.$get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          'primary_release_date.gte': this.date[0],
          'primary_release_date.lte': this.date[1],
          page: this.page,
          api_key: this.$config.apiKey
        }
      }).then(function (res) {
        $this.data = res
      })
    }
  }
}
</script>

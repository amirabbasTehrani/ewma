<template>
  <div>
    <div class="bg-gray-300 rounded flex p-7 items-center">
      <nuxt-link
        class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-3xl"
        to="/movies"
      >
        back
      </nuxt-link>
      <div class="ml-16">
        <h1 class="text-lg font-bold">
          {{ movie.title }}
        </h1>
        <h3 class="text-lg">
          {{ movie.tagline }}
        </h3>
      </div>
    </div>
    <div class="mt-20 grid grid-cols-3 gap-16">
      <div>
        <img class="rounded w-full" :src="$config.imagePrefix + movie.poster_path" :alt="movie.title">
      </div>
      <div class="col-span-2">
        <table class="table-auto w-full movie-information">
          <tbody>
            <tr>
              <td class="font-bold">
                Budget
              </td>
              <td class="text-right">
                {{ usdFormatter(movie.budget) }}
              </td>
            </tr>
            <tr>
              <td class="font-bold">
                Revenue
              </td>
              <td class="text-right">
                {{ usdFormatter(movie.revenue) }}
              </td>
            </tr>
            <tr>
              <td class="font-bold">
                Release Date
              </td>
              <td class="text-right">
                {{ movie.release_date }}
              </td>
            </tr>
            <tr>
              <td class="font-bold">
                Runtime
              </td>
              <td class="text-right">
                {{ runtimeFormatter(movie.runtime) }}
              </td>
            </tr>
            <tr>
              <td class="font-bold">
                Score
              </td>
              <td class="text-right">
                <star-rating
                  v-model="movie.vote_average"
                  inline
                  :max-rating="10"
                  :increment="0.1"
                  :star-size="20"
                  read-only
                  :show-rating="false"
                />
                {{ movie.vote_average }}
                <span class="text-sm">({{ movie.vote_count }})</span>
              </td>
            </tr>
            <tr>
              <td class="font-bold">
                Genres
              </td>
              <td class="text-right text-sm">
                <span
                  v-for="(genre , i) in movie.genres"
                  :key="i"
                >
                  {{ genre.name }}
                  <span v-if="i < movie.genres.length - 1">, </span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="font-bold">
                IMDB Link
              </td>
              <td class="text-right text-sm">
                <a
                  class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  target="_blank"
                  :href="'https://www.imdb.com/title/'+movie.imdb_id"
                >
                  Link
                </a>
              </td>
            </tr>
            <tr>
              <td class="font-bold">
                Homepage Link
              </td>
              <td class="text-right text-sm">
                <a
                  class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  target="_blank"
                  :href="movie.homepage"
                >
                  Link
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="mt-14">
      {{ movie.overview }}
    </p>
    <div class="mt-20 mb-96">
      <h6 class="font-bold">
        Credits:
      </h6>
      <div class="mt-4">
        <span v-for="(item , index) in cast.items" :key="index">
          {{ item.name }}
          <span v-if="index < cast.items.length - 1">, </span>
        </span>
        <span v-if="cast.count > numberOfCast">
          and {{ cast.count - numberOfCast }} <span class="underline cursor-pointer" @click="numberOfCast = cast.count"> more</span>
        </span>
        <span v-if="cast.count > 10 && cast.count === numberOfCast" class="underline cursor-pointer" @click="numberOfCast = 10">
          show less
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ $axios, params, $config }) {
    const movie = await $axios.$get('https://api.themoviedb.org/3/movie/' + params.id + '?api_key=' + $config.apiKey)
    const credits = await $axios.$get('https://api.themoviedb.org/3/movie/' + params.id + '/credits?api_key=' + $config.apiKey)
    return { movie, credits }
  },
  data () {
    return {
      numberOfCast: 10
    }
  },
  head () {
    return {
      title: this.movie.title
    }
  },
  computed: {
    cast () {
      const items = this.credits.cast
      let sortedItems = items.sort((a, b) => (a.popularity < b.popularity) ? 1 : ((b.popularity < a.popularity) ? -1 : 0))
      sortedItems = sortedItems.slice(0, this.numberOfCast - 1)
      return {
        count: items.length,
        items: sortedItems
      }
    }
  },
  methods: {
    usdFormatter (value) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return formatter.format(value)
    },
    runtimeFormatter (value) {
      const m = value % 60
      const h = (value - m) / 60
      return h.toString() + 'h ' + (m < 10 ? '0' : '') + m.toString() + 'm'
    }
  }
}
</script>
<style>
.movie-information tr{
  height: 40px;
}
</style>

<script setup>
import {getMovies} from "@/composable/getMovies";
import {onMounted, ref} from "vue";
// import DeleteIcon from "@/components/icons/DeleteIcon.vue";

const movies = ref([])
onMounted(async () => {
  movies.value = await getMovies()
  console.log(movies.value)
})

const deleteMovie = async (movieId) => {
  try {
    const res = await fetch(`http://localhost:3000/movies/${movieId}`, { method: 'DELETE' })
    if (res.ok) {
      console.log(`Delete succesfully 🍒`)
      movies.value = movies.value.filter((mv) => mv.id !== movieId)
    } else {
      throw new Error('Cannot read movies data! 💔')
    }
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
}
</script>

<template>
  <div class="p-2 max-w-5xl border border-gray-200">
    <!--    <div class="w-full flex pb-5 space-x-3">-->
    <!--    </div>-->
    <div class="w-full">
      <div v-for="movie in movies" :key="movie.id">
        <div class="flex items-center space-x-2">
          <DeleteIcon class="text-red-400" @click="deleteMovie(movie.id)" />
          <h1 class="font-semibold">{{ movie.id }}. {{ movie.text }}</h1>
        </div>

        <ul>
          <li v-for="option in quest.options" :key="option.id">
            <p>{{ option.label }}. {{  option.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

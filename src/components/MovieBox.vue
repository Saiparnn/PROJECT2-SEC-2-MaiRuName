<script setup>
import {onMounted, ref, computed} from "vue";
import {getMovies} from "@/composable/getMovies";


const movies = ref([])
const props = defineProps(['filteredMovies'])

onMounted(async () => {
  movies.value = await getMovies()
})

</script>

<template>
  <div class="mx-5">
    <div class="h-full min-h-screen  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8 mt-9 ml-10 mr-10">
      <div v-for="(movie, index) in props.filteredMovies"
           :key="index">
        <img src="@/assets/images/avatar.jpeg" class="hover:opacity-80 transition easy-in-out duration-150 rounded-lg mb-2" alt=""/>
        <h2 class="text-white font-bold">{{ movie.name }}</h2>
        <div class="text-white">
          {{ movie.director }} | {{ movie.releaseDate }} <br />
        </div>
        <span class="text-sm text-white">
      {{ movie.category }}
    </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
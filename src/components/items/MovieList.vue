<script setup>
import {onMounted, ref} from "vue";
import {getMovies} from "@/composable/getMovies";

const movies = ref([])
onMounted(async () => {
  movies.value = await getMovies()
  console.log(movies.value)
})
</script>

<template>
  <div v-for="movie in movies" :key="movie.id">
    <img src="@/assets/images/avatar.jpeg" class="hover:opacity-80 transition easy-in-out duration-150 rounded-lg mb-2" alt=""/>
<!--        <img src="{{ movie.image }}" class="hover:opacity-80 transition easy-in-out duration-150"/>-->
<!--    <img :src="require(`${movie.image}`)" class="hover:opacity-80 transition easy-in-out duration-150 rounded-lg"/>-->
<!--      <div class="hover:opacity-80 transition easy-in-out duration-150">-->
<!--        {{ movie.image }}-->
<!--      </div>-->
      <h2 class="text-white font-bold">{{ movie.name }}</h2>
      <div class="text-white">
        {{ movie.director }} | {{ movie.releaseDate }} <br />
      </div>
      <span class="text-sm text-white">
      {{ movie.category }}
    </span>
    </div>
</template>

<style scoped>

</style>
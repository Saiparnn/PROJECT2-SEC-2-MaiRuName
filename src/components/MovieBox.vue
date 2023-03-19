<script setup>
  import MovieList from "@/components/items/MovieList.vue";
</script>

<template>
  <div class="mx-5">
<!--    <h2 class="mt-5 ml-5 uppercase text-lg font-semibold">All Movies</h2>-->
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8 mt-9 ml-10 mr-10">
      <MovieList />
      <MovieList />
      <MovieList />
      <MovieList />
      <MovieList />
      <MovieList />
      <MovieList />
    </div>
  </div>
</template>

<style scoped></style>
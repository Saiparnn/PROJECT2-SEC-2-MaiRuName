<script setup>
import {getMovies} from "@/composable/getMovies";
import {ref, onMounted, watch, computed} from "vue";
import MovieBox from "@/components/MovieBox.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const movies = ref([]);
const searchPayload = ref(route.params.searchPayload);

// watch(searchPayload, () => {
//   filteredMovies.value = .filter((item) =>
//       item.name.toLowerCase().includes(searchPayload.value.toLowerCase()),
//   )
// })
const filteredMovies = computed(() => {
  return movies.value.filter((movie) =>
      movie.name.toLowerCase().includes(searchPayload.value.toLowerCase())
  )
})
watch(searchPayload, async () => {
  const filteredMovies = await getMovies();
  filteredMovies.value = filteredMovies.filter((movie) =>
      movie.name.toLowerCase().includes(searchPayload.value.toLowerCase())
  );
});
// watch(
//     () => route.params.searchPayload,
//     (newSearchPayload) => {
//       searchPayload.value = newSearchPayload;
//     }
// );

onMounted(async () => {
  movies.value = await getMovies()
  console.log(movies.value)
})
</script>

<template>
<!--  <div class="app">-->
<!--    <div class="app-wrapper">-->
<!--      <div class="search-bar">-->
<!--        <h2>Search items</h2>-->
<!--        <input-->
<!--            id="search"-->
<!--            v-model="searchPayload"-->
<!--            type="search"-->
<!--            class="search"-->
<!--            placeholder="start typing"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="items-wrapper" id="items-wrapper">-->
<!--        <div class="item-card" v-for="movie in filteredMovies " :key="movie.id">-->
<!--          <h2 class="item-card__code">{{ movie.id }}</h2>-->
<!--          <div class="item-card__icon-circle">-->
<!--            <img :src="item.image" alt="banana" />-->
<!--          </div>-->
<!--          <p class="item-card__title">{{ movie.name }}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <MovieBox />
<!--  v-for="movie in filteredMovies"-->
</template>

<style scoped>
:root {
  font-size: 8px;
}
body {
  background-color: #ffffff;
}
h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  font-weight: 500;
  //letter-spacing: 2;
  line-height: 30px;
  color: #464141;
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  //letter-spacing: 2%;
  line-height: 24px;
  color: #464141;
}
p {
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  font-weight: normal;
  //letter-spacing: 2%;
  line-height: 20px;
  color: #a2a4aa;
}
.app {
  margin: auto;
  width: 100%;
  max-width: 1048px;
}
.app-warpper {
  margin: auto;
}
.search-bar {
  text-align: center;
  margin-top: 4rem;
}
.search-bar input {
  padding: 2rem;
  min-width: 40rem;
}
.items-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
/* item card */
.item-card {
  min-width: 160px;
  min-height: 180px;
  background-color: #f6f6f6;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px 10px 0;
}
.item-card__icon-circle {
  background-color: #fffcfc;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin: 0 auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-card__icon-circle img {
  max-width: 60px;
  max-height: 60px;
  object-fit: contain;
}
.item-card__variety {
  color: #464141;
  text-align: center;
  margin: 15px auto 0 auto;
  text-transform: lowercase;
  text-transform: capitalize;
}
.item-card__title {
  font-weight: 500;
  color: #464141;
  margin: 15px auto 15px auto;
  text-transform: lowercase;
  text-transform: capitalize;
}
.item-card__code {
  color: #36b16c;
  margin: 15px auto 0 auto;
}
</style>
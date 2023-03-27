<script setup>
import EmojioneV1AdmissionTickets from "../EmojioneV1AdmissionTickets.vue";
import { getMovies } from "../../composable/getMovies";
import {ref, onMounted, computed, onUpdated} from "vue"

const nameGenre = ref('Genre')
const movies = ref([]);
const searchPayload = ref('');
const isOpen = ref(false)
const isOpenGenre = ref(false)
const genre =ref([
  "Romance",
  "Comedy",
  "Horror",
  "Drama",
  "Action",
  "Sci-Fi",
  "Thriller",
  "Mystery",
  "Animation",
  "Adventure",
  "Fantasy",
  "Crime",
  "War",
])
const selectedGenre = ref("All");

onMounted(async () => {
  getMovieToFilter()
})

const selectGenre = (genre) => {
  selectedGenre.value = genre;
  isOpenGenre.value = false;
  nameGenre.value = genre
};

const getMovieToFilter = async () => {
  const res = await getMovies()
  res.map(x => movies.value.push(x))
}


const filterGenre = computed(() => { 
if (selectedGenre.value === "All") {
    return movies.value;
  }
  if (selectedGenre.value === "Others") {
  const isOthers = movies.value.filter(e => genre.value.every(a => !e.category.includes(a)));
    return isOthers
  }
  else {
    const movieFill =  movies.value.filter(e => e.category.toLowerCase().includes(selectedGenre.value.toLowerCase())
    );
    return movieFill
  }
})

const filteredMovies = computed(() => {
  if(searchPayload.value===''){
    return filterGenre.value
  }else {
    return filterGenre.value.filter((movie) => {
      return movie.name.toLowerCase().includes(searchPayload.value.toLowerCase())
    })
  }
})

</script>

<template>
<div class="bg-[#659DBD] h-full min-h-screen">
  <div class="flex bg-[#FBEEC1] pt-2 pb-2">
    <div class="ml-5 mt-2">
      <a href="#" class="flex items-center">
        <div class=""> <!-- resize icon -->
          <EmojioneV1AdmissionTickets />
        </div>
        <router-link to="/moviebox"><span class="self-center font-serif whitespace-nowrap ml-3 mr-4 mt-0.5 text-[#659DBD] font-bold text-2xl">MaiRuDuRai</span></router-link>
      </a>
    </div>
    <nav class="flex text-[#BC986A] items-center mt-1">
        <router-link to="/moviebox"><div className="menu-item">Home</div></router-link>
      <div @click="isOpenGenre=!isOpenGenre" class="flex" className="menu-item">
        {{nameGenre}}
        <svg viewBox="0 0 1030 638" width="10" class="w-2.5 ml-2.5">
          <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#BC986A"></path>
        </svg>
      </div>
      <div v-if="isOpenGenre" class="absolute left-[290px] mt-[625px] py-2 w-28 bg-[#BC986A] rounded-lg text-white">
        <div @click="selectGenre('All')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">All</div>
        <div @click="selectGenre('Comedy')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Comedy</div>
        <div @click="selectGenre('Horror')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Horror</div>
        <div @click="selectGenre('Thriller')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Thriller</div>
        <div @click="selectGenre('Mystery')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Mystery</div>
        <div @click="selectGenre('Drama')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Drama</div>
        <div @click="selectGenre('Action')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Action</div>
        <div @click="selectGenre('Sci-Fi')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Sci-Fi</div>
        <div @click="selectGenre('Animation')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Animation</div>
        <div @click="selectGenre('Adventure')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Adventure</div>
        <div @click="selectGenre('Fantasy')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Fantasy</div>
        <div @click="selectGenre('Crime')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Crime</div>
        <div @click="selectGenre('War')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">War</div>
        <div @click="selectGenre('Others')" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Others</div>
      </div>
    </nav>
    <!--Search toggle-->
    <form class="absolute right-16 w-max mr-2 mt-1 text-[#BC986A]">
      <input
          type="search"
          v-model.trim = "searchPayload"
          placeholder="Search for movies"
          class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none border-[#BC986A] focus:w-full focus:cursor-text focus:border-[#BC986A] focus:pl-16 focus:pr-4" />
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-[#BC986A] px-3.5 peer-focus:border-[#BC986A] peer-focus:stroke-[#BC986A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path class="border-[#BC986A]" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>

    <!-- Profile dropdown -->
    <div class="absolute right-0 justify-items-end mt-1">
      <button @click="isOpen=!isOpen" class="block h-12 w-12 mr-4 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
        <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </button>
      <div v-if="isOpen" class="absolute right-2 mt-1 py-2 w-48 bg-[#BC986A] rounded-lg text-white">
        <a href="#" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Your Profile</a>
        <a href="#" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">Sign Out</a>
      </div>
    </div>
  </div>
  <router-view :filteredMovies="filteredMovies" />
  <!-- :filterGenre="filterGenre" -->
</div>
</template>

<style>

nav .menu-item {
  color: #BC986A;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: #FBEEC1;
  border-bottom-color: #659DBD;
}

nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>
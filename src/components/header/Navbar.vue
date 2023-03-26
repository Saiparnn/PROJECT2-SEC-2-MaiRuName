<script setup>
import Dropdown from './Dropdown.vue'
import EmojioneV1AdmissionTickets from "../EmojioneV1AdmissionTickets.vue";
import { getMovies } from "../../composable/getMovies";
import {ref, onMounted, computed, onUpdated} from "vue"
import router from '../../router';

const movies = ref([]);
const searchPayload = ref('');
const isOpen = ref(false)
const genre = ref(['Romance', 'Comedy', 'Horror', 'Drama', 'Action', 'Sci-Fi'])

onMounted(async () => {
  getMovieToFilter()
})

const getMovieToFilter = async () => {
  const res = await getMovies()
  res.map(x => movies.value.push(x))
}

let filteredMovies = computed(() => {
  if(searchPayload.value===''){
    return movies.value
  }else {
    return movies.value.filter((movie) => {
      return movie.name.toLowerCase().includes(searchPayload.value.toLowerCase())
    })
  }
})

// const goToHomePage = () => {
//   router.push('/moviebox')
// }
</script>

<template>
<div class="bg-[#659DBD] h-full min-h-screen ">
  <div class="flex bg-[#FBEEC1] pt-2 pb-2">
    <div class="ml-5 mt-2">
      <router-link to="/moviebox">
        <a @click="goToHomePage" class="flex items-center">
        <div class=""> <!-- resize icon -->
          <EmojioneV1AdmissionTickets />
        </div>
        <router-link to="/moviebox"><span class="self-center font-serif whitespace-nowrap ml-3 mr-4 mt-0.5 text-[#659DBD] font-bold text-2xl">MaiRuDuRai</span></router-link>
        </a>
      </router-link>
    </div>
    <nav class="flex text-[#BC986A] items-center mt-1">
        <router-link to="/moviebox"><div className="menu-item">Home</div></router-link>
        <Dropdown title="Genre" :items="genre"/>
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
  <router-view :filteredMovies="filteredMovies"/>
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
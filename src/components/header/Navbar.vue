<script setup>
import EmojioneV1AdmissionTickets from "../EmojioneV1AdmissionTickets.vue";
import { ref } from "vue"

const emits = defineEmits(['filterCategory'])

const nameGenre = ref('Genre')
const isOpen = ref(false)
const isOpenGenre = ref(false)
const genres =ref([
  "All",
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
  "Others"
])

const userNameToShow = localStorage.getItem("userName")

const logOut = () => {
  router.push('/')
}

const selectGenre = (genre) => {
  isOpenGenre.value = false
  nameGenre.value = genre
};
</script>

<template>

  <div class="bg-[#659DBD]">
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
          {{ nameGenre }}
          <svg viewBox="0 0 1030 638" width="10" class="w-2.5 ml-2.5">
            <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#BC986A"></path>
          </svg>
        </div>
        <div v-if="isOpenGenre"  class="absolute left-[290px] mt-[625px] py-2 w-28 bg-[#BC986A] rounded-lg text-white">
          <div v-for="genre in genres" @click="$emit('filterCategory', $event.target.innerText),selectGenre($event.target.innerText)" class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">
            {{ genre }}
          </div>
        </div>
      </nav>
      
      <!-- Profile dropdown -->
      <div class="absolute right-0 justify-items-end mt-1">
        <button @click="isOpen=!isOpen" class="block h-12 w-12 mr-4 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
          <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </button>
        <div v-if="isOpen" class="absolute right-2 mt-1 py-2 w-48 bg-[#BC986A] rounded-lg text-white z-40">
          <p class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]">{{ userNameToShow }}</p>
          <p class="block px-4 py-2 hover:bg-white hover:text-[#BC986A]" @click="logOut">Sign Out</p>
        </div>
      </div>
    </div>
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
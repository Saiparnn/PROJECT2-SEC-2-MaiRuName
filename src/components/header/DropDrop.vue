<script setup>
  import {ref} from "vue";

  const isOpenC = ref(false)
</script>

<template>
  <div @click="isOpenC = !isOpenC">
    Genre
    <svg viewBox="0 0 1030 638" width="10" class="w-2.5 ml-2.5">
      <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#BC986A"></path>
    </svg>
    <div v-if="isOpenC" class="absolute right-2 mt-1 py-2 w-48 bg-[#BC986A] rounded-lg">
      <a href="#" class="block px-4 py-2 text-white hover:bg-white hover:text-[#BC986A]">Your Profile</a>
      <a href="#" class="block px-4 py-2 text-white hover:bg-white hover:text-[#BC986A]">Setting</a>
      <a href="#" class="block px-4 py-2 text-white hover:bg-white hover:text-[#BC986A]">Sign Out</a>
    </div>
  </div>
</template>

<style scoped>

</style>
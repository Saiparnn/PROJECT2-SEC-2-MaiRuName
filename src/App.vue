<script setup>
import { ref } from 'vue';
import Login from './components/Login.vue'

let showLogin = ref(false)
let showSignUp = ref(false)
</script>
 
<template>
<div v-show="!showLogin && !showSignUp" class="relative h-screen font-serif">
  <div class="flex h-screen bg-[#659DBD]  items-center justify-center text-center ">
    <div class="text-white">
      <h1 class="underline text-2xl pb-9">sec 2</h1>
      <h1 class="text-8xl font-bold pb-16">MaiRuDuRai</h1>
      <button @click="showLogin = !showLogin" class="bg-[#BC986A] w-96 h-16 rounded-full border border-white text-3xl active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] hover:bg-[#FBEEC1]">LOG IN</button>
    </div>
  </div>

  <div class="flex bg-[#FBEEC1] h-20 p-2 items-center justify-center absolute inset-x-0 bottom-0 ">
    <h1 class="text-3xl text-[#8D8741]">- MaiRuName -</h1>
    <button @click="showSignUp = !showSignUp" class="absolute right-5 bg-[#BC986A] rounded-full border-2 border-[#BC986A] w-28 h-11 text-2xl text-white active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] hover:bg-[#FBEEC1] hover:border-[#659DBD] hover:border-2">Sign Up</button>
  </div>
</div>

<!-- --------------------------------------------------------------------------------------------------------- -->

<div v-show="showLogin">
  <!-- <Login/> -->
  <div class="flex bg-[#BC986A] items-center justify-center h-screen font-serif text-black/60">
    <div class="bg-[#D9D9D9] h-200 w-128 rounded-lg p-10 relative">
      <h1 class="text-5xl mt-3">Log In</h1>
      <img @click="showLogin = !showLogin" src="./components/icons/icons8-close-30.png" class="absolute right-4 top-4">
      <div class="my-12">
        <p class="text-lg">Username</p>
        <input   type="text"    class="rounded-md w-97 h-16 p-2"/>
      </div>
      <div class="mb-16">
        <p class="text-lg">Password</p>
        <input type="password"  class="rounded-md w-97 h-16 p-2"/>
      </div>
      
      <button class="bg-[#99B89C] w-96 h-16 rounded-lg text-white text-3xl active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] hover:bg-white hover:border hover:border-[#BC986A] ">LOG IN</button>
      <p class="mt-2">New for MaiRuDuRai? <span ><button @click="showSignUp = !showSignUp, showLogin = !showLogin" class="font-bold text-black hover:underline">Sign up now !!!</button></span></p>
    </div>
  </div>
</div>

<!-- --------------------------------------------------------------------------------------------------------- -->

<div v-show="showSignUp">
  <div class="flex bg-[#BC986A] items-center justify-center h-screen font-serif text-black/60">
    <div class="bg-[#D9D9D9] h-200 w-128 rounded-lg p-10 relative">
      <h1 class="text-5xl mt-3">Sign Up</h1>
      <img @click="showSignUp = !showSignUp" src="./components/icons/icons8-close-30.png" class="absolute right-4 top-4">
      <div class="my-4">
        <p class="text-lg">Email</p>
        <input   type="text"    class="rounded-md w-97 h-16 p-2"/>
      </div>
      <div class="my-4">
        <p class="text-lg">Username</p>
        <input   type="text"    class="rounded-md w-97 h-16 p-2"/>
      </div>
      <div class="my-4">
        <p class="text-lg">Password</p>
        <input type="password"  class="rounded-md w-97 h-16 p-2"/>
      </div>
      <div class="my-4">
        <p class="text-lg">Confirm your Password</p>
        <input type="password"  class="rounded-md w-97 h-16 p-2"/>
      </div>
      
      <button class="bg-[#99B89C] mt-10 w-96 h-16 rounded-lg text-white text-3xl active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] hover:bg-white hover:border hover:border-[#BC986A] ">SIGN UP</button>
    </div>
  </div>
</div>

</template>
 
<style scoped>

</style>
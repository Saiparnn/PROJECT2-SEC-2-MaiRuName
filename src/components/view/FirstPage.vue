<script setup>
import { ref } from 'vue';
import login from './Login.vue'
import signup from './signUp.vue'

const props = defineProps(['startApp'])

let popupTriggers = ref({
  loginTrigger : ref(false),
  signUpTrigger : ref(false)
})

const TogglePopup = (trigger) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

</script>
 
<template>
  <div class="relative h-screen font-serif">
    <div class="flex h-screen bg-[#659DBD]  items-center justify-center text-center ">
      <div class="text-white">
        <h1 class="underline text-2xl pb-9">sec 2</h1>
        <h1 class="text-8xl font-bold pb-16">MaiRuDuRai</h1>
        <button @click="()=>TogglePopup('loginTrigger')" class="bg-[#BC986A] w-96 h-16 rounded-full border border-white text-3xl active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] hover:bg-[#FBEEC1]">LOG IN</button>
      </div>
    </div>
    
    <login v-if="popupTriggers.loginTrigger" :TogglePopup="()=>TogglePopup('loginTrigger')"/>
    <signup v-if="popupTriggers.signUpTrigger" :TogglePopup="()=>TogglePopup('signUpTrigger')" :popupTriggers="popupTriggers" /> 
     
    <div class="flex bg-[#FBEEC1] h-20 p-2 items-center justify-center absolute inset-x-0 bottom-0 ">
      <h1 class="text-3xl text-[#8D8741]">- MaiRuName -</h1>
      <button @click="()=>TogglePopup('signUpTrigger')" class="absolute right-5 bg-[#BC986A] rounded-full border-2 border-[#BC986A] w-28 h-11 text-2xl text-white active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] hover:bg-[#FBEEC1] hover:border-[#659DBD] hover:border-2">Sign Up</button>
    </div>
  </div>

</template>
 
<style >

</style>
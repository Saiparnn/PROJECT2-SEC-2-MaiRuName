<script setup>
const props = defineProps(['TogglePopup'])
</script>
 
<template>
<div class="popup">
  <div class="popup-inner">
        <div class="flex items-center justify-center h-screen font-serif text-black/60">
            <div class="bg-[#D9D9D9] w-128 rounded-lg p-10 relative">
            <h1 class="text-5xl mb-6">Sign Up</h1>
            <img @click="TogglePopup()" src="./icons/icons8-close-30.png" class="absolute right-4 top-4">
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
            
            <button class="bg-[#99B89C] mt-5 w-96 h-16 rounded-lg text-white text-3xl active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] hover:bg-white hover:border hover:border-[#BC986A] ">SIGN UP</button>
            </div>
        </div>
  </div>
</div>
</template>
 
<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgb(0, 0, 0, 0.4);

    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-inner {
    position: relative;
}
</style>
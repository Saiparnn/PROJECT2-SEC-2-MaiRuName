<script setup>
import { onUpdated, ref } from 'vue';
import getUser from '../../composable/getUser';
import signup from '../view/signUp.vue';
import router from '../../router/index.js'

const props = defineProps(['TogglePopup'])
const userNameForLogin=ref('')
const passWordForLogin=ref('')
const loginData=ref([])

let popupTriggers = ref({
  loginTrigger : ref(false),
  signUpTrigger : ref(false)
})

const TogglePopupSignUp = (trigger) => {
  if(trigger === 'signUpTrigger'){
    popupTriggers.loginTrigger = false
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
  }
}

onUpdated(async () =>{ // ใข้ onupdate เพือจะได้สามารถ login ได้ทันทีเลยเมื่อมีการเพิมค่า user ใน object
  loginData.value = await getUser() // ทำการใส่ค่า object เข้าไปใน loginData โดยใช้การเรียกใช้ฟังก์ชั่น getUser() ที่มีการ return ค่า
})

const userLogin = async () => {
  const notCorrectUser = loginData.value.includes(user => user.userName !== userNameForLogin.value )
  if(notCorrectUser){
    return alert('username or password is not correct')
  }
  if(userNameForLogin.value === '' || passWordForLogin.value === ''){
    return alert('You should type something. ')
  }
  if(userNameForLogin.value !== '' && passWordForLogin.value !== ''){
    try {
      const foundUser = loginData.value.find(user => user.userName === userNameForLogin.value && user.passWord === passWordForLogin.value);
      if (foundUser) {
        router.push('/moviebox')
        console.log('login successfull');
        localStorage.setItem("userName",userNameForLogin.value)
      } else {
        alert('Username or password is incorrect.') 
        throw new Error('Username or password is incorrect.') 
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
}
};
</script>

<template>
<div class="popup">
  <div class="popup-inner">
    <slot >
      <div class="bg-[#D9D9D9] w-128 rounded-lg p-10 relative">
        <h1 class="text-5xl mt-3">Log In</h1>
        <img @click="TogglePopup()" src="../icons/icons8-close-30.png" class="absolute right-4 top-4 cursor-pointer">
        <div class="my-12">
          <p class="text-lg">Username</p>
          <input   
          type="text"    
          class="rounded-md w-97 h-16 p-2"
          id="userNameLogin"
          v-model.trim="userNameForLogin"/>
        </div>
        <div class="mb-16">
          <p class="text-lg">Password</p>
          <input 
          type="password"  
          class="rounded-md w-97 h-16 p-2"
          id="passwordLogin"
          v-model.trim="passWordForLogin"/>
        </div>
         
        <button @click="userLogin" class="bg-[#99B89C] w-96 h-16 rounded-lg text-white text-3xl active:scale-105 ease-in-out duration-300 hover:text-[#BC986A]  hover:border hover:border-[#BC986A]">LOG IN</button>
        <p class="mt-2">New for MaiRuDuRai? <span ><button @click="TogglePopupSignUp('signUpTrigger')"  
          class="font-bold text-black hover:underline">Sign up now !!!</button> 
          <signup v-if="popupTriggers.signUpTrigger" :TogglePopup="()=>TogglePopup('signUpTrigger')"/>
        </span>
        </p>

        </div>
    </slot>
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
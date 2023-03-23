<script setup>
import getUser from '../composable/getUser'
import { ref,onUpdated } from 'vue';
const props = defineProps(['TogglePopup'])
const userNameForSignUp=ref('')
const passwordForSignUp=ref('')
const confirmPassword=ref('')
const loginData =ref([])

onUpdated (async () => { // ใข้ onupdate เพือจะได้สามารถ login ได้ทันทีเลยเมื่อมีการเพิมค่า user ใน object
  loginData.value = await getUser(); // ทำการใส่ค่า object เข้าไปใน loginData โดยใช้การเรียกใช้ฟังก์ชั่น getUser() ที่มีการ return ค่า
});

const updateUser = async () => {
  const foundUser = loginData.value.find(user => user.userName === userNameForSignUp.value);
  if(foundUser){
    return alert("you can't use this name")
  }
  if(confirmPassword.value !== passwordForSignUp.value){
    return alert("can't register your password and confirmpassword not correct")
  }
  if(userNameForSignUp.value === '' || passwordForSignUp === '' || confirmPassword === ''){
    return alert('You should type something. ')
  }
  if(userNameForSignUp.value !== '' && passwordForSignUp.value !== '' && confirmPassword.value !== ''){
  try {
    const res = await fetch(`http://localhost:5000/infoOfUser`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }, // แปลงข้อมูลที่ส่งไปให้กลายเป็น json ปกติ key: value json = "key":value
      body: JSON.stringify({
        userName: userNameForSignUp.value,
        passWord: passwordForSignUp.value
      })
    });
   
    if (res.ok) {
      console.log('Add success');
      props = false
    }
     else {
      throw new Error('cannot Add')
    }
  }
   catch (error) {
    console.log(`Error: ${error}`);
   }
}
};
</script>
 
<template>
<div class="popup">
  <div class="popup-inner">
        <div class="flex items-center justify-center h-screen font-serif text-black/60">
            <div class="bg-[#D9D9D9] w-128 rounded-lg p-10 relative">
            <h1 class="text-5xl mb-6">Sign Up</h1>
            <img @click="TogglePopup" src="./icons/icons8-close-30.png" class="absolute right-4 top-4 cursor-pointer">
            <div class="my-4">
                <p class="text-lg">Username</p>
                <input  v-model="userNameForSignUp" 
                type="text" 
                id="userNameSignup"
                class="rounded-md w-97 h-16 p-2"/>
            </div>
            <div class="my-4">
                <p class="text-lg">Password</p>
                <input v-model="passwordForSignUp"
                type="password"  
                id="passwordSignup"
                class="rounded-md w-97 h-16 p-2"/>
            </div>
            <div class="my-4">
                <p class="text-lg">Confirm your Password</p>
                <input 
                v-model="confirmPassword" 
                type="password"  
                id="confirmPassowrd"
                class="rounded-md w-97 h-16 p-2"/>
            </div>
            
            <button class="bg-[#99B89C] mt-5 w-96 h-16 rounded-lg text-white text-3xl 
            active:scale-105 ease-in-out duration-300 hover:text-[#BC986A] 
            hover:bg-white hover:border hover:border-[#BC986A] " 
            @click="updateUser" type="summit">SIGN UP</button>
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
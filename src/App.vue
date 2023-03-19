<script setup>
import { ref,onBeforeMount, onBeforeUpdate, onMounted, onUpdated  } from "vue";
import getUser from './composable/getUserPass.js'
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const modelUsername = ref('')
const modelPassLogin = ref('')
const loginData = ref([])

onUpdated (async () => { // ใข้ onupdate เพือจะได้สามารถ login ได้ทันทีเลยเมื่อมีการเพิมค่า user ใน object
  loginData.value = await getUser(); // ทำการใส่ค่า object เข้าไปใน loginData โดยใช้การเรียกใช้ฟังก์ชั่น getUser() ที่มีการ return ค่า
});

const updateUser = async () => {
  
  if(name.value !== '' && password.value !== '' && confirmPassword.value !== ''){
  try {
    const res = await fetch(`http://localhost:5000/infoOfSignup`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }, // แปลงข้อมูลที่ส่งไปให้กลายเป็น json ปกติ key: value json = "key":value
      body: JSON.stringify({
        userName: name.value,
        password: password.value
      })
    });
   
    if (res.ok) {
      console.log('Add success');
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

const saveLogin = async () => {
  if(modelUsername.value != '' && modelPassLogin.value != '')
  try {
    const foundUser = loginData.value.find(user => user.userName === modelUsername.value && user.password === modelPassLogin.value);
    if (foundUser) {
      console.log('login successfull');
    } else {
      throw new Error('Username or password is incorrect.')
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

</script>
<template>
  Name : {{ name }}<br />
  Password : {{ password }}<br />
  ConfirmPassword : {{ confirmPassword }}<br>

  <!-- Username : {{ modelUsername }}<br>
  Password : {{ modelPassLogin }} -->

  <div class="container" >
    <div class="form" >
      <label class="form-label" for="name">Name</label>
      <input class="form-input" type="text" id="name" v-model="name" />
      <label class="form-label" for="password">Password</label>
      <input
        class="form-input"
        type="password"
        id="password"
        v-model="password"
      />
      <label class="form-label" for="ConfirmPassword">Confirm Password</label>
      <input
        class="form-input"
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
      />
      <button @click=" updateUser "  class="form-submit" type="summit">
        Sign in
      </button>
    </div>
  </div>


  <div class="form" >
      <label class="form-label" for="userName">Name</label>
      <input class="form-input" type="text" id="userName" v-model="modelUsername" />
      
      <label class="form-label" for="passwordLogin">Password</label>
      <input
        class="form-input"
        type="password"
        id="passwordLogin"
        v-model="modelPassLogin"
      />
      <button @click="saveLogin" class="form-submit" type="summit">
        Login
      </button>
    </div>
  
</template>

<style scoped>
/* Center the container on the screen */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  background-color: #f7fafc;
}

/* Style the form */
.form {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
}

/* Style the form header */
.form h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Style the form inputs */
.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-input {
  border-color: #e2e8f0;
  border-width: 1px;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
}

/* Style the form submit button */
.form-submit {
  background-color: #4299e1;
  border-color: #4299e1;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
  width: 100%;
}

.form-submit:hover {
  background-color: #3182ce;
}
</style>

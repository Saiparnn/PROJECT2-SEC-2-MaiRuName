<script setup>
import { ref } from "vue";
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const modelUsername = ref('')
const modelPassLogin = ref('')

const signIns = {
  userName: [],
  passWords: [],
  confirmPass: []
};
const saveSignup = () => {
  if (password.value === confirmPassword.value) {
    signIns.userName.push(name.value);
    signIns.passWords.push(password.value);
    signIns.confirmPass.push(confirmPassword.value);
  } else  {
    alert("password and confirmpassword not agree");
  }
  console.log(`userName : ${signIns.userName}`);
console.log(`Password : ${signIns.passWords}`);
console.log(`ConfirmPass : ${signIns.confirmPass}`);
};

const saveLogin = ()=>{
  if(signIns.userName.includes(modelUsername.value) && signIns.passWords.includes(modelPassLogin.value)){
    alert('can login')
  }
  else{
    alert("username or password not correct or you does'have any account")
  }
}

</script>
<template>
  Name : {{ name }}<br />
  Password : {{ password }}<br />
  ConfirmPassword : {{ confirmPassword }}<br>

  Username : {{ modelUsername }}<br>
  Password : {{ modelPassLogin }}
  <!-- <br>
  Show saveName : {{ saveName }}<br>
  Show savePassword : {{ savePassword }} -->
  <div class="container">
    <form class="form" @submit.prevent="handleSubmit">
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
      <button @click="saveSignup()" class="form-submit" type="summit">
        Sign in
      </button>
    </form>
  </div>


  <form class="form" @submit.prevent="handleSubmit">
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
    </form>
  
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

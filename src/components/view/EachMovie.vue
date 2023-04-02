<script setup xmlns="http://www.w3.org/1999/html">
import { onMounted,  ref} from "vue";
import { useRoute } from 'vue-router';
import router from '../../router/index.js'
import Navbar from "../header/Navbar.vue";
import goToHomePage from '../../composable/goBack.js'
const route = useRoute();
const id = route.params.id
const getOneMovie = async () => {
  try {
    const res = await fetch(`http://localhost:3000/movies/${id}`)
    if (res.status === 200) {
        const movie = await res.json()
        return movie
    }else {
      throw new Error('Cant get one movie !!!')
    }
  }catch(error){
    console.log(`ERROR: ${error}`)
  }
}


// for Delete
let oneMovie = ref('')
onMounted(async () => {
  oneMovie.value = await getOneMovie()
})

let isConfirmingDelete = ref(false)
let ShowConfirmDelete = ref(false)

const DeleteClick = () =>{
      isConfirmingDelete.value = true;
      ShowConfirmDelete.value = true;
      setTimeout(() => {
        isConfirmingDelete.value = false;
        ShowConfirmDelete.value = false;
      }, 3000 ); // wait 3 seconds before resetting
}
const DoubleClickDelete = async (movieID) => {
  if(isConfirmingDelete){
  try{
    const response = await fetch(`http://localhost:3000/movies/${movieID}`, { 
      method: 'DELETE'})
      .then(() => router.push('/moviebox'))
      oneMovie.value=oneMovie.value.filter((movie) => movie.id !== movieID)
      isConfirmingDelete = false;
  }
  catch(error) {
    console.log(`ERROR: ${error}`);
  }
  }
}

</script>

<template>
<Navbar/>
<div class="bg-[#659DBD] h-full min-h-screen justify-center text-white ">
  <div class="flex font-bold text-4xl p-3">
      <img @click="goToHomePage" src="../icons/back.png" class="cursor-pointer pr-5 w-16">
      <h1>Movie Info...</h1>
  </div>

  <div class="container flex relative content-center justify-center p-8">
    <img :src="oneMovie.image" class="transition easy-in-out duration-150 rounded-lg w-80"/>
    <div class="ml-5">
      <h2 class="font-bold text-4xl mt-3 mb-2 underline underline-offset-2">{{ oneMovie.name }}</h2>
      <span class="font-bold mb-4">{{ oneMovie.releaseDate }} | {{ oneMovie.category }}</span>
      <p class="mt-4 mb-4">
        <span class="font-bold">StoryLine</span> <br> {{ oneMovie.storyLine }}
      </p>
      <p class="mt-4 mb-4"><span class="font-bold mb-4">Director</span> <br> {{ oneMovie.director }}</p>
      <p class="mt-2 mb-4"><span class="font-bold mb-4">Writer</span> <br> {{ oneMovie.writer }}</p>
      <p class="mt-2 mb-4"><span class="font-bold mb-4">Star</span> <br> {{ oneMovie.star }}</p>
    </div>
    <div class="absolute right-0 bottom-4" >
      <button class="bg-red-500 text-white border-2 p-[12px] rounded-lg m-2 w-40" @click="DeleteClick" @dblclick="DoubleClickDelete(oneMovie.id)">
        <span v-if="isConfirmingDelete==false">Delete</span>
        <span v-else="isConfirmingDelete==true">Comfirm Delete?</span>
      </button>
    </div> 
    <div class="absolute right-0 bottom-0 mr-4" v-show="ShowConfirmDelete">Wait 3 sec for cancel</div>
  </div>
</div>    
  
</template>

<style scoped>
</style>

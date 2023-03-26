<script setup xmlns="http://www.w3.org/1999/html">
import { onMounted,  ref} from "vue";
import { useRoute } from 'vue-router';

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

let oneMovie = ref('')
onMounted(async () => {
  oneMovie.value = await getOneMovie()
})
 
</script>

<template>
  <div class="container mx-auto flex mt-20 ">
    <img :src="oneMovie.image" class="transition easy-in-out duration-150 rounded-lg mb-2 w-80"/>
    <div class="ml-5">
      <h2 class="font-bold text-4xl mt-3 mb-2">{{ oneMovie.name }}</h2>
      <span class="font-bold mb-4">{{ oneMovie.releaseDate }} | {{ oneMovie.category }}</span>
      <p class="mt-4 mb-4">
        <span class="font-bold">StoryLine</span> <br> {{ oneMovie.storyLine }}
      </p>
      <p class="mt-4 mb-4"><span class="font-bold mb-4">Director</span> <br> {{ oneMovie.director }}</p>
      <p class="mt-2 mb-4"><span class="font-bold mb-4">Writer</span> <br> {{ oneMovie.writer }}</p>
      <p class="mt-2 mb-4"><span class="font-bold mb-4">Star</span> <br> {{ oneMovie.star }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
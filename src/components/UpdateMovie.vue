<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BinaryPreview from './BinaryPreview.vue'
import router from '../router/index.js'
const route = useRoute()



let id = ref(route.params.id)
let movie_name = ref('')
let movie_category = ref('')
let movie_storyLine = ref('')
let movie_director = ref('')
let movie_writer = ref('')
let movie_star = ref('')
let movie_releaseDate = ref('')
let file = ref(null)
let imgBeforeUpdate = ref('')

let previewImgBeforeUpdate = ref(true)
let hiddenWhenUpdate = ref(false)

const fetchData = () => {
    fetch("http://localhost:3000/movies/"+id.value)
    .then(res => res.json())
    .then((result) => {
        movie_name.value = result.name
        movie_category.value = result.category
        movie_storyLine.value = result.storyLine
        movie_director.value = result.director
        movie_writer.value = result.writer
        movie_star.value = result.star
        movie_releaseDate.value = result.releaseDate
        imgBeforeUpdate.value = result.image
    })
}
fetchData()

const selectedBinaryFile = ref('')
const chooseBinaryFile = (event) => {
  // for preview image
  selectedBinaryFile.value = event.target.files[0]

  // for insert image
  file.value = event.target.files[0]
  
  previewImgBeforeUpdate.value = false
  hiddenWhenUpdate.value = true
}

const updateMovie = async () => {
  if(file.value===null){
    try {
        let image = imgBeforeUpdate.value
        const response = await fetch(("http://localhost:3000/movies/"+id.value), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "image" : image,
                "name": movie_name.value,
                "category": movie_category.value,
                "storyLine": movie_storyLine.value,
                "director": movie_director.value,
                "writer": movie_writer.value,
                "star": movie_star.value,
                "releaseDate": movie_releaseDate.value
            })
        }).then(res => res.json())
        .then(() => { router.push('/').then(()=>location.reload()) })
    }catch(error) {
        console.log("error");
    }
  }else {
      try{
      const reader = new FileReader()
          reader.onload = (event) => {
            fetch(("http://localhost:3000/movies/"+id.value), {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                "image" : event.target.result,
                "name": movie_name.value,
                "category": movie_category.value,
                "storyLine": movie_storyLine.value,
                "director": movie_director.value,
                "writer": movie_writer.value,
                "star": movie_star.value,
                "releaseDate": movie_releaseDate.value
              })
            }).then(res => res.json())
              .then(() => { router.push('/').then(()=>location.reload()) })
              
          }
          reader.readAsDataURL(file.value)
    }catch(error) {
      console.log(`ERROR: ${error}`);
    }

  }
}

function goToHomePage() {
   router.push('/')
}
</script>
 
<template>

    <div class="bg-[#659DBD] h-full min-h-screen justify-center p-3 text-white ">
      <div class="flex font-bold text-4xl mt-1 mb-4">
        <img @click="goToHomePage" src="./icons/back.png" class="cursor-pointer pr-5 w-16">
        <h1>Updating...</h1>
      </div>
      
      <div class="w-2/4 justify-center m-auto">
        <div class="my-3 font-bold">
            <label>Name</label>
            <input type="text" class="form-control" v-model="movie_name"/>
        </div>
        <div class="my-3 font-bold">
            <label>Category</label>
            <input type="text" class="form-control" v-model="movie_category"/>
        </div>
        <div class="my-3 font-bold">
            <label>StoryLine</label>
            <textarea rows="4" type="text" class="form-control" v-model="movie_storyLine"/>
        </div>
        <div class="my-3 font-bold">
            <label>Director</label>
            <input type="text" class="form-control" v-model="movie_director"/>
        </div>
        <div class="my-3 font-bold">
            <label>Writer</label>
            <input type="text" class="form-control" v-model="movie_writer"/>
        </div>
        <div class="my-3 font-bold">
            <label>Star</label>
            <input type="text" class="form-control" v-model="movie_star"/>
        </div>
        <div class="my-3 font-bold">
            <label>ReleaseDate</label>
            <input type="text" class="form-control" v-model="movie_releaseDate"/>
        </div>
        <div class="my-3">
            <input type="file" accept="image/*" @change="chooseBinaryFile"/>
        </div>
      

      <div class="py-3 flex justify-center items-center">
        <img :src="imgBeforeUpdate" class="BeforeUpdateImg" v-if="previewImgBeforeUpdate===true"/>
        <BinaryPreview :selectedBinaryObject="selectedBinaryFile" v-if="hiddenWhenUpdate===true"/>
      </div>
      <button @click="updateMovie" class="bg-green-500 text-white rounded-lg p-3 border-white border-2 w-24">Update</button>
      
    </div>
  </div> 
</template>
 
<style scoped>
.alert {
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 3px;
  background-color: rgb(34 197 94);
  color: white;
}
.BeforeUpdateImg {
  max-width: 401px;
  max-height: 507px;
}
</style>
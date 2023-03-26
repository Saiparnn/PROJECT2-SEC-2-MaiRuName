<script setup>
import { ref, onMounted, onUpdated, onBeforeMount, onBeforeUpdate } from "vue";
import { getMovies } from "../composable/getMovies";
import BinaryPreview from './BinaryPreview.vue';
import router from '../router/index.js'

const movies = ref([])
onMounted(async () => {
  movies.value = await getMovies()
})

const props = defineProps(['filteredMovies'])
let movie_name = ref('')
let movie_category = ref('')
let movie_storyLine = ref('')
let movie_director = ref('')
let movie_writer = ref('')
let movie_star = ref('')
let movie_releaseDate = ref('')

let myModel = ref(false)
let actionButton = ref('Insert')
let dynamicTitle = ref('')
let alertBox = ref(false)
let file = ref(null)
let method = ref('')

let openModal = () => {
  method.value = 'insert'
  movies.movie_name = ''
  movies.movie_category = ''
  movies.movie_storyLine = ''
  movies.movie_director = ''
  movies.movie_writer = ''
  movies.movie_star = ''
  movies.movie_releaseDate = ''
  actionButton.value = 'Insert'
  dynamicTitle.value = 'Insert Data'
  myModel.value = true
}

const selectedBinaryFile = ref('')
const chooseBinaryFile = (event) => {
  // for preview image
  selectedBinaryFile.value = event.target.files[0]
  
  // for insert image
  file.value = event.target.files[0]
}

const submitData = async () => {
  if(movie_name.value != "" && 
     movie_category.value != "" && 
     movie_storyLine.value != "" &&
     movie_director.value != "" &&
     movie_writer.value != "" &&
     movie_star.value != "" &&
     movie_releaseDate.value != ""
     ){
    try{
        const reader = new FileReader()
        reader.onload = (event) => {
          fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "image" : event.target.result,
              "name": movie_name.value,
              "category": movie_category.value,
              "storyLine": movie_storyLine.value,
              "director": movie_director.value,
              "writer": movie_writer.value,
              "star": movie_star.value,
              "releaseDate": movie_releaseDate.value,
            })
          })
          .then(()=>window.location.reload())
        }
        reader.readAsDataURL(file.value)
                
    }catch(error) {
      console.log(`ERROR: ${error}`);
    }
  }else{
    alertBox.value = true
    console.log("fail");
    throw new Error("Cannot Add Movie !!! Form isn't complete")
  }
}

const deleteMovie = async (movieID) => {
  try{
    const response = await fetch(`http://localhost:3000/movies/${movieID}`, { method: 'DELETE'})
    if(response.ok) {
      console.log('Delete sucessfully !!!');
      movies.value=movies.value.filter((movie) => movie.id !== movieID)
      location.reload()
    }else {
      throw new Error('cannot delete data !!!')
    }
  }
  catch(error) {
    console.log(`ERROR: ${error}`);
  }
}

const onEditStatus = (id) => {
  router.push('/update/'+id)
}

const clickMovie = (id) => {
  router.push({ name: 'movie', params: { id: id } })
}
</script>

<template>
  <div class="mx-5 pb-4">
    <div class="flex w-full justify-end pr-10 pt-3"> 
      <button @click="openModal" value="add" class="bg-[#4ABC96] text-white font-bold rounded-lg p-2 border-white border-2 w-32">Add Movie</button>
    </div>
    <div class="h-full min-h-screen  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8 mt-3 ml-10 mr-10">
      <div v-for="(movie, index) in props.filteredMovies" :key="index">
        <img :src="movie.image" class="hover:opacity-80 transition easy-in-out duration-150 rounded-lg mb-2" @click="clickMovie(movie.id)"/>
        <h2 class="text-white font-bold">{{ movie.name }}</h2>
        <div class="text-white">
          {{ movie.director }} | {{ movie.releaseDate }} <br />
        </div>
        <span class="text-sm text-white">{{ movie.category }}</span>
        
        <div class="flex w-full pt-1">
          <img class="w-5 mr-2" src="./icons/deleteIcon.png" @click="deleteMovie(movie.id)"/>
          <img class="w-5"      src="./icons/updateIcon.png" @click="onEditStatus(movie.id)">
        </div>
      </div>
    </div>
  </div>

  <!-- POP UP !!! -->
  <div v-if="myModel">
    <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header bg-gray-200">
                <h4 class="modal-title text-2xl font-bold">{{ dynamicTitle }}</h4>
                <img @click="myModel = false" src="./icons/icons8-close-30.png" >
              </div>

              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6 ">
                    <div class="font-bold">
                      <label>Name</label>
                      <input type="text" class="form-control" v-model="movie_name"/>
                    </div>
                    <div class="font-bold">
                      <label>Category</label>
                      <input type="text" class="form-control" v-model="movie_category"/>
                    </div>
                    <div class="font-bold">
                      <label>StoryLine</label>
                      <textarea type="text" class="form-control" v-model="movie_storyLine"/>
                    </div>
                    <div class="font-bold">
                      <label>Director</label>
                      <input type="text" class="form-control" v-model="movie_director"/>
                    </div>
                    <div class="font-bold">
                      <label>Writer</label>
                      <input type="text" class="form-control" v-model="movie_writer"/>
                    </div>
                    <div class="font-bold">
                      <label>Star</label>
                      <input type="text" class="form-control" v-model="movie_star"/>
                    </div>
                    <div class="font-bold">
                      <label>ReleaseDate</label>
                      <input type="text" class="form-control" v-model="movie_releaseDate"/>
                    </div>
                    <div class="mt-3">
                      <input type="file" accept="image/*" @change="chooseBinaryFile"/>
                    </div>
                  </div>
                  
                  <div class="col-md-6 m-auto">
                    <BinaryPreview :selectedBinaryObject="selectedBinaryFile"/>
                  </div>
                </div>

                <div v-if="method === 'insert'" class="text-center">
                  <input type="submit" class="btn btn-outline-success mb-2 w-32 font-bold" v-model="actionButton" @click="submitData"/>
                  <div v-show="alertBox" class="alert">
                    <strong>Error !</strong> Please complete the form.
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div> 
  </div>

</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper{
  display: table-cell;
  vertical-align: middle;
}
.alert {
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 3px;
  background-color: #f44336;
  color: white;
}
.smallImage {
  max-width: 100px;
  max-height: 200px;
}</style>
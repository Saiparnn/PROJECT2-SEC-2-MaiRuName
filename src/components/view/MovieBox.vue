<script setup>
import { ref, onMounted, computed } from "vue";
import { getMovies } from "../../composable/getMovies";
import BinaryPreview from '../BinaryPreview.vue';
import router from '../../router/index.js'
import Navbar from '../header/Navbar.vue'

const movies = ref([])
onMounted(async () => {
  movies.value = await getMovies()
})

const movie_name = ref('')
const movie_category = ref('')
const movie_storyLine = ref('')
const movie_director = ref('')
const movie_writer = ref('')
const movie_star = ref('')
const movie_releaseDate = ref('')

const myModel = ref(false)
const actionButton = ref('Insert')
const dynamicTitle = ref('')
const alertBox = ref(false)
const file = ref(null)
const method = ref('')
const searchPayload = ref('')
const nameGenre = ref('Genre')
const isOpenGenre = ref(false)
const genre =ref([
  "Romance",
  "Comedy",
  "Horror",
  "Drama",
  "Action",
  "Sci-Fi",
  "Thriller",
  "Mystery",
  "Animation",
  "Adventure",
  "Fantasy",
  "Crime",
  "War",
])

let openModal = () => {
  method.value = 'insert'
  movie_name.value = ''
  movie_category.value = ''
  movie_storyLine.value = ''
  movie_director.value = ''
  movie_writer.value = ''
  movie_star.value = ''
  movie_releaseDate.value = ''
  selectedBinaryFile.value = ''
  actionButton.value = 'Insert'
  dynamicTitle.value = 'Insert Data'
  myModel.value = true
  alertBox.value = false
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
        reader.onload = async (event) => {
          const res = await fetch('http://localhost:3000/movies', {
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
          const addMovieToFontend = await res.json()
          movies.value.push(addMovieToFontend)
          myModel.value = false
        }
        reader.readAsDataURL(file.value)
                
    }catch(error) {
      console.log(`ERROR: ${error}`);
    }
  }else{
    alertBox.value = true
    // console.log("fail");
    throw new Error("Cannot Add Movie !!! Form isn't complete")
  }
}

const onEditStatus = (id) => {
  router.push({ name: 'update', params: { id: id } })
}

const clickMovie = (id) => {
  router.push({ name: 'movie', params: { id: id } })
}

const selectedGenre = ref("All");
const selectGenre = (genre) => {
  selectedGenre.value = genre;
  isOpenGenre.value = false
  nameGenre.value = genre
};

const filterGenre = computed(() => { 
if (selectedGenre.value === "All") {
    return movies.value;
  }
  if (selectedGenre.value === "Others") {
  const isOthers = movies.value.filter(e => genre.value.every(a => !e.category.includes(a)));
    return isOthers
  }
  else {
    const movieFill =  movies.value.filter(e => e.category.toLowerCase().includes(selectedGenre.value.toLowerCase()));
    return movieFill
  }
})

let filteredMovies = computed(() => {
  if(searchPayload.value===''){
    return filterGenre.value
  }else {
    return filterGenre.value.filter((movie) => {
      return movie.name.toLowerCase().includes(searchPayload.value.toLowerCase())
    })
  }
})
</script>

<template>
  <Navbar @filterCategory="selectGenre"/>
  <div class="p-4 bg-[#659DBD]">
    <div class="flex w-full items-center"> 
      <form class="absolute right-16 w-max mr-2 text-white justify-center content-center">
        <input
            type="search"
            v-model.trim = "searchPayload"
            placeholder="Search for movies"
            class=" peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none border-white focus:w-full focus:cursor-text focus:border-[#BC986A] focus:pl-16 focus:pr-4 placeholder-white" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-white px-3.5 peer-focus:border-white peer-focus:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path class="border-[#BC986A] " stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </form>
      <button @click="openModal" value="add" class="bg-[#4ABC96] text-white font-bold rounded-lg p-3 border-white border-2 w-32 ml-10">Add Movie</button>
    </div>
    <div class="h-full min-h-screen  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8 mt-3 ml-10 mr-10">
      <div v-for="(movie, index) in filteredMovies" :key="index">
        <img :src="movie.image" class="hover:opacity-80 transition easy-in-out duration-150 rounded-lg mb-2" @click="clickMovie(movie.id)"/>
        <h2 class="text-white font-bold flex">{{ movie.name }}<span class="pl-2"><img class="w-5" src="../icons/updateIcon.png" @click="onEditStatus(movie.id)"></span></h2>
        <div class="text-white">
          {{ movie.director }} | {{ movie.releaseDate }} <br />
        </div>
        <span class="text-sm text-white">{{ movie.category }}</span>
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
                <img @click="myModel = false" src="../icons/icons8-close-30.png" >
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
                      <input type="text" class="form-control" v-model="movie_category" placeholder="Ex. Actions, Comedy,..."/>
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
                      <input type="text" class="form-control" v-model="movie_releaseDate" placeholder="DD-MM-YYYY"/>
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
<script setup>
import { defineProps, ref } from 'vue'
// import { selectgenreWar,selectgenreAction,selectgenreAdventure,selectgenreAnimation,selectgenreComedy,selectgenreCrime,selectgenreDrama,selectgenreFantasy,selectgenreHorror,selectgenreMystery,selectgenreOthers,selectgenreSciFi,selectgenreThriller} from "@/composable/selectgenre";
// const props = defineProps(['genre'])
const props = defineProps({
  title: String,
  items: {
    type: Array
  }
})
const selectgenreComedy = () => {
  props.value.filter(props.value.includes('Comedy'))
  }
  const selectgenreHorror = () => {
    props.value = props.value.filter(props.value.includes('Horror'))
  }
  const selectgenreThriller = () => {
    props.value = props.value.filter(props.value.includes('Thriller'))
  }
  const selectgenreMystery = () => {
    props.value = props.value.filter(props.value.includes('Mystery'))
  }
  const selectgenreDrama = () => {
    props.value = props.value.filter(props.value.includes('Drama'))
  }
  const selectgenreAction = () => {
    props.value = props.value.filter(props.value.includes('Action'))
  }
  const selectgenreSciFi = () => {
    props.value = props.value.filter(props.value.includes('Sci-Fi'))
  }
  const selectgenreAnimation = () => {
    props.value = props.value.filter(props.value.includes('Animation'))
  }
  const selectgenreAdventure = () => {
    props.value = genre.value.filter(genre.value.includes('Adventure'))
  }
  const selectgenreFantasy = () => {
    genre.value = genre.value.filter(genre.value.includes('Fantasy'))
  }
  const selectgenreCrime = () => {
    genre.value = genre.value.filter(genre.value.includes('Crime'))
  }
  const selectgenreWar = () => {
    genre.value = genre.value.filter(genre.value.includes('War'))
  }
  const selectgenreOthers = () => {
    genre.value = genre.value.filter(genre.value.includes('Others'))
  }

const isOpen = ref(false)
</script>

<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">
      {{ title }}
    </a>
    <svg viewBox="0 0 1030 638" width="10" class="w-2.5 ml-2.5">
      <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#BC986A"></path>
    </svg>
    <div class="sub-menu" v-if="isOpen">
      <div @click="selectgenreComedy('Comedy')">Comedy</div>
      <div @click="selectgenreHorror('Horror')">Horror</div>
      <div @click="selectgenreThriller('Thriller')">Thriller</div>
      <div @click="selectgenreMystery('Mystery')">Mystery</div>
      <div @click="selectgenreDrama('Drama')">Drama</div>
      <div @click="selectgenreAction('Action')">Action</div>
      <div @click="selectgenreSciFi('Sci-Fi')">Sci-Fi</div>
      <div @click="selectgenreAnimation('Animation')">Animation</div>
      <div @click="selectgenreAdventure('Adventure')">Adventure</div>
      <div @click="selectgenreFantasy('Fantasy')">Fantasy</div>
      <div @click="selectgenreCrime('Crime')">Crime</div>
      <div @click="selectgenreWar('War')">War</div>
      <div @click="selectgenreOthers('Others')">Others</div>
    </div>
  </div>
</template>

<style>
nav .menu-item .sub-menu {
  position: absolute;
  background-color: #FBEEC1;
  top: calc(100% + 18px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
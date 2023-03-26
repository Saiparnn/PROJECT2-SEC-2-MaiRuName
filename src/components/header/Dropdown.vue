<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  items: {
    type: Array,
    default: () => []
  }
})
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
    <div @click="genre" className="sub-menu" v-if="isOpen">

    </div>
<!--    <transition name="fade" appear>-->
<!--      <div class="sub-menu" v-if="isOpen">-->
<!--        <div v-for="(item, i) in items" :key="i" class="menu-item">-->
<!--          <a :href="item.link">{{ item.title }}</a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </transition>-->
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
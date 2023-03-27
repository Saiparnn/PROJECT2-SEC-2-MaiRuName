<script setup>
import { ref, computed } from '@vue/reactivity';

const props = defineProps(['selectedBinaryObject'])

const previewSrc = ref('')
const previewImage = () => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      previewSrc.value = reader.result;
    },
    false
  );

  if (props.selectedBinaryObject != '') {
    // convert image file to base64 string
    reader.readAsDataURL(props.selectedBinaryObject);
  }
}
const canPreview = computed(() => {
    if(typeof props.selectedBinaryObject === 'object') {
        previewImage()
        return true
    }
    return false
})
</script>
 
<template>
    <div class="py-3 flex justify-center items-center">
      <img :src="previewSrc" :previewSrc="previewSrc" v-if="canPreview===true" class="previewImage"/>
      <div v-if="canPreview===false">
        <h1 class="text-2xl text-red-600 font-bold">Please upload a image...</h1>
      </div>
    </div>
</template>
 
<style scoped>
.previewImage {
  max-width: 401px;
  max-height: 507px;
}
</style>

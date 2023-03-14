<script setup>

</script>
 
<template>
    <div class="flex h-screen bg-[#659DBD] font-serif relative">
        <div class="flex bg-[#FBEEC1] h-16 p-2 items-center justify-center absolute inset-x-0 top-0 ">
            <h1 class="text-3xl text-[#8D8741] absolute left-3">MaiRuDuRai</h1>
            <div class="items-center text-xl text-[#8D8741]">
                <button class="hover:font-bold">Home</button>&nbsp;&nbsp; | &nbsp;&nbsp;
                <button class="hover:font-bold">Genre</button>&nbsp;&nbsp; | &nbsp;&nbsp;
                <button class="hover:font-bold">Favorite</button>
            </div>
            <div class="flex absolute right-0">
                <img src="./components/icons/icons8-search-50.png">
                <img src="./components/icons/icons8-user-50.png" class="px-2"> 
            </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </div>
    </div>
</template>
 
<style scoped>

</style>
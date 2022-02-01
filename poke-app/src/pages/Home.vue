<script>

</script>
<template>
<!--  <h1 class="text-center">HOME PAGE</h1>-->
  <div class="flex flex-col mt-5  md:flex-row ">
    <div class="col flex justify-start lg:justify-end">
      <div class="w-full text-center p-5  lg:w-9/12	md:text-left">
      <span class="font-bold p-0 text-4xl md:text-6xl ">HI!</span>
      <p class="text-uppercase font-bold text-4xl text-center lg:text-6xl md:text-center ">Welcome to my Advanced Topics of JavaScript project</p>
      </div>
    </div>

    <div class="d-flex col overflow-hidden mb-3">
     <img class="bedoimg w-9/12  rounded-full justify-content-center	mx-auto d-block " src="../assets/bedo.jpeg">
    </div>

  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

.bedoimg{
  /*width: 500px;*/
  transition: 0.5s all ease-in-out;
}
.bedoimg:hover {
  transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  cursor: pointer;
}
</style>

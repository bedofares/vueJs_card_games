<script>
  // import "bootstrap/dist/css/bootstrap.min.css"
  // import "bootstrap"
</script>
<template>
<!--  <h1 class="text-center">HOME PAGE</h1>-->
  <div class="d-flex flex-row mt-5">

    <div class="col d-flex justify-content-end">
      <div class="w-75 p-5">
      <span class="fw-bold display-1 p-0">HI!</span>
      <p class="text-uppercase fw-bold display-4 ">Welcome to my Advanced Topics of JavaScript project</p>
      </div>
    </div>

    <div class="d-flex col overflow-hidden">
     <img class=" bedoimg rounded-full justify-content-center	mx-auto d-block " src="../assets/bedo.jpeg">
    </div>

  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

.bedoimg{
  width: 500px;
  transition: 0.5s all ease-in-out;
}
.bedoimg:hover {
  transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  cursor: pointer;
}
</style>

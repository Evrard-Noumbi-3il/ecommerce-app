<template>

  <div class= "container" @click.self="$emit('close-Contact')">
    <div class="cardContainer">
      <h2>Contact</h2>

    </div>
  </div>


</template>
<script>




</script>

<style scoped>

  .container{
    padding-bottom: 50px;
    position: relative;
    top: -800px;
    left: 0;
    width: 100vw;
    height: 100vh;
    justify-self: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Arial;
    z-index: 9999;
    background-color: #f6f1f100;
  }
  .cardContainer{
    border-radius: 15px;
    padding: 20px 50px 50px 50px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    width: 25%;
  }
</style>
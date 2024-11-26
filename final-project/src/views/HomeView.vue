<template>
    <div class="home">
      <div class="title flex flex-col justify-center items-center p-10">
        <h1 class="font-bold text-5xl text-center">The Social Experiment</h1>
      </div>
      <div class="buttons flex flex-row justify-around pt-20 pb-20">
        <a href="inscription.html"><button class="bg-red-600 text-3xl text-white p-5 rounded-lg hover:text-black hover:bg-white transition ease-in-out duration-300">Inscription</button></a>
        <a href="connexion.html"><button class="bg-red-400 text-3xl text-white p-5 rounded-lg hover:text-black hover:bg-white transition ease-in-out duration-300">Connexion</button></a>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import "../../frontend/js/main";

export default {
  name: 'HomeView'
}
</script>

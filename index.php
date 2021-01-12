<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <link href="css/w3.css"  rel="stylesheet" type="text/css" />
    <title>Reuninap</title>

  </head>
  <body>
    <div style="display:none" id="app">
 
 
    <div v-if="titre" class="w3-container w3-red w3-monospace">
  <h1 v-if="titre" >{{titre}}</h1> 
  <p v-if="slogan">{{slogan}}</p> 
</div>

<div class="w3-block w3-auto">

  <cartes v-for="car in carte" :nom="car" v-on:essai_carte=tryCard></cartes>
</div>

    
<p>Le nombre de carte est : {{ niveau }}</p>
    <button v-on:click="createCarte(niveau)">creer carte</button>
    <p v-if="carte.length>=1">{{ carte }}</p>
    <input v-model="niveau" placeholder="niveau">


    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" ></script>
    <script  src="js/app.js" ></script>
  </body>
</html>
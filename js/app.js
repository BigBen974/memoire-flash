

Vue.component('cartes', {
  props: ['nom'],

  template: '<img v-on:click="tryCarte(nom, $event)" class="size-carte" :src="imageUrl()" :id="nom" />',
 
  methods:{
    
    imageUrl: function (nom) {
      if(nom) return "img/fleches/"+nom.substring(1, 2)+".png"
      else return "img/card.png"
     
    },
    tryCarte: function (numCarte, event) {

      if (event) {
        
        event.target.src=this.imageUrl(numCarte)
 
       this.$emit('essai_carte', numCarte)
       
      } 
      
    }
  },


})

var app = new Vue({
    el: '#app',
    data: {
      niveau: 6,
      onGame: false,
      carte: [], 
      titre:"Reuninap",
      slogan:"",
      essai1: "",
    },
    methods:{


      tryCard: function (numCarte) {
        var cart1 = document.getElementById(numCarte);
        var e1=this.essai1;

        if(!e1){
        this.essai1=numCarte;
        this.noneCarte(numCarte);
        }
        else if (e1.substring(1, 2)!=numCarte.substring(1, 2))
        {
          
        
          this.noneCarte();
         
           var cl= setTimeout(this.clearCarte, 500, numCarte, e1);
          
        }else{

          this.noneCarte();
          
         
          let e = this.essai1;
          var re= setTimeout(this.removeCarte, 500, numCarte, e);
          
        }
        
      },

      removeCarte: function(numCarte, e){
        let cart1= document.getElementById(numCarte);
        let e1 = document.getElementById(e);
        cart1.src="img/card.png";
        e1.src="img/card.png";
         
        for( var i = 0; i < this.carte.length; i++){ 
    

          if ( this.carte[i] === numCarte) { 
      
            this.carte.splice(i, 1); 
          }
      
      }
      for( var i = 0; i < this.carte.length; i++){ 
    
        if ( this.carte[i] === e ) { 
    
          this.carte.splice(i, 1); 
        }

    
    }


    this.essai1="";
    

    setTimeout(this.autoCarte, 500);

    if(this.carte.length<=0){this.onGame=false};
      },
      
      autoCarte: function(id){
        if(!id){
        for(i=0;i<this.carte.length;i++){
          let im=this.carte[i];
          let img=document.getElementById(im);
           
            img.style="pointer-events:auto";
         
        } }
        else {
          let img=document.getElementById(id);
           
          img.style="pointer-events:auto";}
      },
      noneCarte: function(id){
        if(!id){
        for(i=0;i<this.carte.length;i++){
          let im=this.carte[i];
          let img=document.getElementById(im);
           
            img.style="pointer-events:none";
         
        } }
        else {
          let img=document.getElementById(id);
           
          img.style="pointer-events:none";}
      },
      clearCarte: function(numCarte, essai1){
        var cart = document.getElementById(numCarte);
        var essai= document.getElementById(essai1);

       

        cart.src="img/card.png";
        essai.src="img/card.png";
        

        this.essai1="";
        cart.style="pointer-events:auto";
        essai.style="pointer-events:auto";
        for(i=0;i<this.carte.length;i++){
          let im=this.carte[i];
          let img=document.getElementById(im);
           
            img.style="pointer-events:auto";
         
        }
        
        
      },
      createCarte: function (numCarte) {
        this.carte=[];
        for (var i=0; i<numCarte;i++){
          this.carte.push(0+""+i);
          this.carte.push(1+""+i);
      }
      this.carte=this.shuffle(this.carte);
      this.onGame=true;
      },
      shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      },
      
      say: function (message) {
        alert(message)
      }
    }
  })

 var app = document.getElementById('app');

 app.style.display="";
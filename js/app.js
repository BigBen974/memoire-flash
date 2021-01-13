

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
      niveau: 1,
      nbrCarte: 6,
      win: 0,
      bad: 0,
      vie:100,
      onGame: false,
      carte: [], 
      titre:"Réuninap",
      slogan:"",
      essai1: "",
      inOff:"-off",
      vieInOff:"-off",
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
         
           var cl= setTimeout(this.clearCarte, 400, numCarte, e1);
          this.bad++; 
          if(this.niveau>=3){ this.vie-=10;}
          if(this.vie<=0&&this.niveau>=3){
            this.onGame=false;this.win=0;this.bad=0;this.vie=100;
            this.carte=[];this.essai1="";this.inOff="-off";this.vieInOff="-off";
          }
          
        }else{

          this.noneCarte();
          
         
          let e = this.essai1;

          if(this.niveau==1||this.niveau==3){
          var re= setTimeout(this.laisserCarte, 400, numCarte, e);
        }else {
          var re= setTimeout(this.removeCarte, 400, numCarte, e);
        }
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
    
    this.win++;
    setTimeout(this.autoCarte, 500);

    if(this.carte.length<=0){
      this.onGame=false;this.win=0;this.niveau++;
      this.bad=0;this.vie=100;this.essai1="";
      this.inOff="-off";this.vieInOff="-off";
    }
      },

      laisserCarte: function(numCarte, e){
        let cart1= document.getElementById(numCarte);
        let e1 = document.getElementById(e);
        
        cart1="pointer-events:none";
        e1="pointer-events:none";
         
     


    this.essai1="";
    

   this.autoCarte();
   
    this.win++;
    if(this.win==this.nbrCarte){
      this.onGame=false;this.win=0;
      this.carte=[];this.niveau++;this.bad=0;
      this.vie=100;this.essai1="";
      this.inOff="-off";this.vieInOff="-off";
    }
    
      },
      
      autoCarte: function(id){
        if(!id){
        for(i=0;i<this.carte.length;i++){
          let im=this.carte[i];
          let img=document.getElementById(im);

          let srcCarte=img.src.substring(img.src.length-12);
          console.log(srcCarte);
           if(srcCarte=="img/card.png"){ img.style="pointer-events:auto"; }
        } }
        else {
          let img=document.getElementById(id);
          let srcCarte=img.src.substring(img.src.length-12);
          console.log(srcCarte);
          if(srcCarte=="img/card.png"){ img.style="pointer-events:auto"; }
        }
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
        this.autoCarte();
        
        
      },
      createCarte: function (numCarte) {
        this.carte=[];
        for (var i=0; i<numCarte;i++){
          this.carte.push(0+""+i);
          this.carte.push(1+""+i);
      }
      this.carte=this.shuffle(this.carte);
      this.onGame=true;
      if(this.niveau>=3){this.vieInOff=""; }
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
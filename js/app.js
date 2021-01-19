

Vue.component('cartes', {
  props: ['nom', 'size_carte','carte'],

  template: '<img v-on:click="tryCarte(nom, $event)" :class="sizeCartes(size_carte)" :src="imageUrl(null, carte )" :id="nom" />',
 
  methods:{
    
    imageUrl: function (nom, carte ) {
      if(nom) return "img/fleches/"+nom.substring(1, 2)+".png"
      else return "img/card-"+carte+".png"
    },
    sizeCartes: function (size_carte) {
      return "size-carte-"+size_carte

    },
    tryCarte: function (numCarte, event) {

      if (event) {
        
        event.target.src=this.imageUrl(numCarte, null)
 
       this.$emit('essai_carte', numCarte)
       
      } 
      
    }
  },


})



Vue.component('dos_cartes', {
  props: ['nom', 'niveau', 'carte'],

  template: '<img v-on:click="setActiveCarte(nom, $event)" :id="nom" class="size-carte-dos" :style="styleA(nom,carte,niveau)" :src="imageUrl(nom,niveau)"   />',
 
  methods:{
    
    imageUrl: function (nom, niveau) {
      if(nom==0){ 
     
        return "img/card.png";}
        else if(nom==1&&niveau>=5){ 
  
          return "img/card-1.png";}
      else {return "img/card-off.png";}

    },
    styleA: function (nom,carteActive,niveau) {
    
      if(nom==carteActive){ 
        
        return "pointer-events:auto;width:8.5%;border:2px solid #f5c74e;background-color:#f5c74e;border-radius:5px";
        
        }
        if(niveau<5&&nom>0){ 
        
          return "pointer-events:none";
          
          }
          if(niveau<10&&nom>1){ 
        
            return "pointer-events:none";
            
            }
            if(niveau<100&&nom>1){ 
        
              return "pointer-events:none";
              
              }

      
       
         
       

    },
    setActiveCarte: function (numCarte, event) {
      

      if (event) {
        
       
       this.$emit('set_carte', numCarte)
       
      } 
      
    },


  },




})

var app = new Vue({
    el: '#app',
    data: {

      niveau: 10,
      nbrCarte: 4,
      win: 0,
      bad: 0,
      vie:100,
      temps:100,
      time:0,
      onGame: false,
      carte: [],
      dosCarte: [],
      titre:"Memory Flash",
      essai1: "",
      timeInOff:"-off",
      vieInOff:"-off",
      stopTimer:0,
      carteActive:0,
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
          this.bad++;
          
          if(!this.vieInOff){ 
            this.vie-=10;
          
          if(this.vie<=0){
            this.resetGame(false);
          }else{
            var cl= setTimeout(this.clearCarte, 400, numCarte, e1); 
          }
          }else{
          var cl= setTimeout(this.clearCarte, 400, numCarte, e1);
          
          }
          
        }else{
           this.noneCarte();
          let e = this.essai1;

          if(this.niveau==1||this.niveau==3||this.niveau==5||this.niveau==7||
            this.niveau==11||this.niveau==13||this.niveau==15||this.niveau==17||
            this.niveau==21||this.niveau==23||this.niveau==25||this.niveau==27
            ){
          var re= setTimeout(this.laisserCarte, 400, numCarte, e);
        }else {
          var re= setTimeout(this.removeCarte, 400, numCarte, e);
        }
        }
        
      },

      removeCarte: function(numCarte, e){
        let cart1= document.getElementById(numCarte);
        let e1 = document.getElementById(e);
        cart1.src="img/card-"+this.carteActive+".png";
        e1.src="img/card-"+this.carteActive+".png";
         
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
      this.resetGame(true);
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

    if(this.win==this.nbrCarte)this.resetGame(true);
      },

      resetGame: function(n){

        if(n){
          this.onGame=false;this.win=0;
          this.carte=[];this.niveau++;this.bad=0;
          this.vie=100;this.essai1="";
          this.timeInOff="-off";this.vieInOff="-off";
          this.stopTimer=0;this.time=0;this.temps=100;
          if(this.niveau==11||this.niveau==21)this.nbrCarte++;
        }else{       
               this.onGame=false;this.win=0;this.bad=0;this.vie=100;
          this.carte=[];this.essai1="";this.timeInOff="-off";
          this.vieInOff="-off";this.stopTimer=0;this.time=0;this.temps=100;
        
        }
      },
      
      autoCarte: function(id){
        if(!id){
        for(i=0;i<this.carte.length;i++){
          let im=this.carte[i];
          let img=document.getElementById(im);

          let srcCarte=img.src.substring(img.src.length-14);
          srcCarte=srcCarte.substring(8,0);
           if(srcCarte=="img/card"){ img.style="pointer-events:auto"; }
        } }
        else {
          let img=document.getElementById(id);
          let srcCarte=img.src.substring(img.src.length-14);
          srcCarte=srcCarte.substring(8,0);
          if(srcCarte=="img/card"){ img.style="pointer-events:auto"; }
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

       

        cart.src="img/card-"+this.carteActive+".png";
        essai.src="img/card-"+this.carteActive+".png";
        

        this.essai1="";
        this.autoCarte();
        
        
      },
      createCarte: function (numCarte) {
        this.carte=[];
        var r=Math.floor(Math.random() * ((11-numCarte) - 0 + 1) + 0);
       
        for (var i=0; i<numCarte;i++){
          this.carte.push(0+""+(i+r));
          this.carte.push(1+""+(i+r));
      }
      this.carte=this.shuffle(this.carte);
      this.onGame=true;
      if(this.niveau==3||this.niveau==4||this.niveau==7||this.niveau==8||this.niveau==9||this.niveau==10||
        this.niveau==13||this.niveau==14||this.niveau==17||this.niveau==18||this.niveau==19||this.niveau==20||
        this.niveau==23||this.niveau==24||this.niveau==27||this.niveau>=28){this.vieInOff=""; }
      if(this.niveau==5||this.niveau==6||this.niveau==7||this.niveau==8||this.niveau==9||this.niveau==10||
        this.niveau==15||this.niveau==16||this.niveau==17||this.niveau==18||this.niveau==19||this.niveau==20||
        this.niveau==25||this.niveau==26||this.niveau==27||this.niveau>=28){
        this.timeInOff="";
        let timestamp =Date.now();
        timestamp=Math.floor(timestamp/1000);
        this.time=timestamp;
      this.minuteur();
      }

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
      
      getTimer: function(){

        var seconde=null;
        var limit=30;
        var timestamp =Date.now();
        timestamp=Math.floor(timestamp/1000);
        var time = this.time;
        if(time!=0){
        var diff=timestamp-time;
        var decompte=limit-diff;
      
        
        seconde=decompte;
        
        
        affichage=seconde;

        this.temps=seconde/(limit/100);


        if(diff>=limit){
          

          this.stopTimer=1;
          this.minuteur(true);
          this.resetGame(false);
  
        }
          
      }
      
      
        }	
      
      
      ,
      minuteur: function(e){
       if(!e){
        this.t= setInterval(
          this.getTimer 
         
      , 1000);
       }
      
            if(this.stopTimer==1){
              clearInterval(this.t); this.stopTimer==0;
            
            }
    }
    ,
    createDosCarte: function (numCarte) {
      this.dosCarte=[];
      
      for (var i=0; i<numCarte;i++){
        this.dosCarte.push(i);
   
    }
   
  },
    setDosCarte: function (id) {
    
        this.carteActive=id;
   
         console.log(this.carteActive)  
       
        
          
          
        },
  }
 
  }
  
  
  )
;
app.createDosCarte(6);

  function preloadImage(){
   
        
        for (i=0;i<=15;i++){
          var img = new Image(); 
          var url="../app/img/fleches/"+i+".png";
          img.src=url;
        }
        
       
  }
  preloadImage();
 var appp = document.getElementById('app');

 appp.style.display="";

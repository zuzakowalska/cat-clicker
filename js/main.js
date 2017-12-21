var model = {
    currentCat: null,
    cats: [
      {
        click: 0,
        name: 'Puszek',
        picture: 'img/puszek.jpg'
      },
      {
        click: 0,
        name: 'Okruszek',
        picture: 'img/okruszek.jpg'
      },
      {
        click: 0,
        name: 'Łatka',
        picture: 'img/latka.jpg'
      },
      {
        click: 0,
        name: 'Kitku',
        picture: 'img/kitku.jpeg'
      },
      {
        click: 0,
        name: 'Bułka',
        picture: 'img/bulka.jpeg'
      }
    ]
  };
  
  
  // ocpotus
  
  var octopus = {
    init: function() {
      model.currentCat = model.cats[0];
  
      catListView.init();
      catView.init();
    },
    
    getCurrentCat: function() {
      return model.currentCat;
    },
    
    getCats: function() {
      return model.cats;
    },
    
    setCurrentCat: function(cat) {
      model.currentCat = cat;
    },
    
    incrementClicks: function() {
      model.currentCat.click++;
      catView.render();
    },
    
  };
  // view 
  
  var catView = {
    init: function() {
      this.catElem = document.getElementById('cat');
      this.catNameElem = document.getElementById('cat-name');
      this.catImgElem = document.getElementById('cat-picture');
      this.clickElem = document.getElementById('click-number');
      
      this.catImgElem.addEventListener('click', function() {
        octopus.incrementClicks();
      });
      
      this.render();
      
    },
    
    render: function() {
      var currentCat = octopus.getCurrentCat();
      this.clickElem.textContent = currentCat.click;
      this.catNameElem.textContent = currentCat.name;
      this.catImgElem.src = currentCat.picture;
      
      
    },
  };
  
  var catListView = {
    init: function() {
      this.catListElem = document.getElementById('cat-list');
      
      this.render();
    },
    
    render: function() {
      var cat, elem, i;
      var cats = octopus.getCats();
      
      this.catListElem.innerHTML = '';
      for (i = 0; i < cats.length; i++) {
        cat = cats[i];
        elem = document.createElement('li');
        elem.textContent = cat.name;
        
        elem.addEventListener('click', (function(catCopy) {
          return function() {
            octopus.setCurrentCat(catCopy);
            catView.render();
          };
        })(cat));
        this.catListElem.appendChild(elem);
      }
    },
    
  };
  
  octopus.init();
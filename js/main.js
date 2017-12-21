var model = {

    currentCat: null,
    cats: [
      {
        click: 0,
        name: "Puszek",
        picture: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454"
      },
      {
        click: 0,
        name: "Okruszek",
        picture: "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426"
      },
      {
        click: 0,
        name: "Łatka",
        picture: "http://bit.ly/2AlHOdT"
      },
      {
        click: 0,
        name: "Kitku",
        picture: "http://bit.ly/2hm09yf"
      },
      {
        click: 0,
        name: "Bułka",
        picture: "https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg"
      }
    ]
  };
  
  
  // ocpotus
  
  var octopus = {

    init: function() {
      model.currentCat = model.cats[0];
  
      catListView.init();
      catView.init();
      adminView.init();
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
      adminView.render();
    },
    
    showAdmin: function() {
      adminView.render();
    },
  };
  // view 
  
  var catView = {

    init: function() {
      this.catElem = document.getElementById("cat");
      this.catNameElem = document.getElementById("cat-name");
      this.catImgElem = document.getElementById("cat-picture");
      this.clickElem = document.getElementById("click-number");
      
      this.catImgElem.addEventListener("click", function() {
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
      this.catListElem = document.getElementById("cat-list");
      
      this.render();
    },
    
    render: function() {
      var cat, elem, i;
      var cats = octopus.getCats();
      
      this.catListElem.innerHTML = "";
      for (i = 0; i < cats.length; i++) {
        cat = cats[i];
        elem = document.createElement("li");
        elem.textContent = cat.name;
        
        elem.addEventListener("click", (function(catCopy) {
          return function() {
            octopus.setCurrentCat(catCopy);
            catView.render();
            adminView.render();
          };
        })(cat));
        this.catListElem.appendChild(elem);
      }
    },
    
  };
  
  var adminView = {

    init: function() {
      this.adminBtn = document.getElementById("admin-btn");
      var adminPanel = document.getElementById("admin-show");

      this.adminBtn.addEventListener("click", function() {
        adminPanel.classList.toggle("hide");
      });

      this.cancelBtn = document.getElementById("admin-cancel");
      this.cancelBtn.addEventListener("click", function(e) {
        e.preventDefault();
        adminPanel.className += "hide";
        adminView.render();
      });

      adminView.render();
    },
  
    render: function() {
     var currentCat = octopus.getCurrentCat();
     var adminClicks = document.getElementById("admin-clicks");
     var adminName = document.getElementById("admin-name");
     var adminPic = document.getElementById("admin-picture");
     adminClicks.value = currentCat.click;
     adminName.value = currentCat.name;
     adminPic.value = currentCat.picture;

     this.saveBtn = document.getElementById("admin-save")
      this.saveBtn.addEventListener("click", function(e) {
        e.preventDefault();
        currentCat.click = adminClicks.value;
        currentCat.name = adminName.value;
        currentCat.picture = adminPic.value;
        catView.render();
        catListView.render();
      });
    },
  }
  
  
  octopus.init();
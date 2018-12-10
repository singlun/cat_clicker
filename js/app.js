$(function() {

    var dataCat = (function DataCat() {
        this.id= 0,
        this.counter= 0,
        this.cats= '',
        this.cats_name= ''
    });

    var dataCatObjArray = [];
    var currentPosition = 0;

    var octopus = {
        addCat: function(cat_name) {
            var obj = new dataCat();            
            var thisID = dataCatObjArray.length;
            obj.id = thisID;
            obj.counter = 0;
            obj.cats = 'img/cat' + thisID + '.jpg';
            obj.cats_name = cat_name;         
            dataCatObjArray.push(obj);
            catListView.render();           
        },

        getCatLists: function() {
            return dataCatObjArray;           
        }, 
        
        getCat: function(currentPosition) {
            return dataCatObjArray[currentPosition];           
        }, 
        
        getCurrentLoc: function() {
            return currentPosition;           
        },        
        
        changeImage: function(cat_id) {
            currentPosition = cat_id; 
            catView.render();
        }, 
        
        increaseCounter: function(cat) {
            cat.counter = cat.counter + 1;
        }, 

        init: function() {
            var obj = new dataCat();            
            obj.id = 0;
            obj.counter = 0;
            obj.cats = 'img/cat0.jpg';
            obj.cats_name = 'felix';
            dataCatObjArray.push(obj);
            currentPosition = 0;
            catListView.init();
            catView.init();
        }
    };


    var catListView = {
        init: function() {           
            var addCatBtn = $('.add-cat');
            var addCatContent = $('#add-cat-content');
            addCatBtn.click(function() {
                octopus.addCat(addCatContent.val());
                return false;
            });

            // grab elements and html for using in the render function
            this.$catLists = $('#cat_lists');

            this.render();

            
        },

        render: function(){
            var htmlStr = '';
            octopus.getCatLists().forEach(function(cat){
                htmlStr += '<li><a id="link-' + cat.id + '" href="#">'+
                    cat.cats_name +
                    '</a></li>';
            });
            this.$catLists.html( htmlStr );

            this.$catLists.on('click',function(e) {                
                var cat_id = parseInt(event.target.id.slice(5));
                octopus.changeImage(cat_id);
            });             
        }
    };

    var catView = {
        init: function() {
            // grab elements and html for using in the render function
            var currentPos = octopus.getCurrentLoc();
            var cat = octopus.getCat(currentPos);
            this.$cat_view = $('#section_left');
            this.catTemplate = $('script[data-template="cat"]').html();          
            this.render();            
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $cat_view = this.$cat_view,
                catTemplate = this.catTemplate,
                currentPos = octopus.getCurrentLoc();

            // Clear and render
            $cat_view.html('');
            var cat = octopus.getCat(currentPos);
            // Replace template markers with data
            var thisTemplate = catTemplate.replace(/{{cat_name}}/g, cat.cats_name);
            thisTemplate = thisTemplate.replace(/{{counter}}/g, cat.counter);
            thisTemplate = thisTemplate.replace(/{{cat_img}}/g, cat.cats);
            thisTemplate = thisTemplate.replace(/{{id}}/g, cat.id);
            $cat_view.append(thisTemplate);
            this.$catImg = $('#img-' + cat.id); 
            this.$catSpan = $('#span-' + cat.id);                        
            // Delegated event to listen for removal clicks
            this.$catImg.on('click',function(e) {
                var cat_id = $(this).parents('.cat').data();
                octopus.increaseCounter(cat);
                document.querySelector('#span-' + cat.id).textContent = `The cat click ${cat.counter} times`;               
            });              
        }
    };    

    octopus.init();
}());

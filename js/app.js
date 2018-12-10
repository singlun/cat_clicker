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
            console.log("right here");
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
        
        getCat: function() {
            return dataCatObjArray[currentPosition];           
        },         
        
        changeImage: function(cat_id) {
            alert('here');
            currentPosition = cat_id; 
            catView.render();
            return dataCatObjArray;
        }, 
        
        increaseCounter: function(cat) {
            cat.counter = counter + 1;
            return cat.counter;
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

                htmlStr += '<li><a onclick="changeImage(' + cat.id + ');" href="#">'+
                    cat.cats_name +
                    '</a></li>';
                // htmlStr += '<li><a onclick="octopus.changeImage(${cat.id});" href="#">${cat.cats_name}</a></li>';
            });
            this.$catLists.html( htmlStr );
        }
    };

    var catView = {
        init: function() {
            // grab elements and html for using in the render function
            // this.$cat = $('#img-' + dataCatObjArray[currentPosition].id);
            this.$cat_view = $('#section_left');
            this.catTemplate = $('script[data-template="cat"]').html();          
            this.render();
            this.$cat = $('#img-0');
            // Delegated event to listen for removal clicks
            this.$cat.on('click',function(e) {
                var cat = $(this).parents('.cat').data();
                console.log(cat);
                // octopus.increaseCounter(cat);
                // return false;
            });              
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $cat_view = this.$cat_view,
                catTemplate = this.catTemplate;

            // Clear and render
            $cat_view.html('');
            var cat = octopus.getCat();
            // Replace template markers with data
            var thisTemplate = catTemplate.replace(/{{cat_name}}/g, cat.cats_name);
            thisTemplate = thisTemplate.replace(/{{counter}}/g, cat.counter);
            thisTemplate = thisTemplate.replace(/{{cat_img}}/g, cat.cats);
            thisTemplate = thisTemplate.replace(/{{id}}/g, cat.id);
            $cat_view.append(thisTemplate);
        }
    };    

    octopus.init();
}());

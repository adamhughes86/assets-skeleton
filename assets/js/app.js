var $j = jQuery.noConflict();
var mediaLarge = '1024px';
var mediaMedium = '800px';

// Define App Namespace
var app = {
    // Initializer
    init: function() {
        app.enquire();
        app.mainNav();
    },

    enquire : function() {

        enquire.register("screen and (max-width: " + mediaLarge + ")", {
            match : function() {
                console.log('Match');
            },
            setup : function() {
                console.log('Setup');
            },
            unmatch : function() {
                console.log('Unmatch');
            }
        });
    },

    mainNav : function() {
        $j('.js-nav-more').on('click', function(e){
            $j('.js-sub-nav').slideToggle();
        });
    }

};
/* Initialize App */
jQuery(function($){app.init();});
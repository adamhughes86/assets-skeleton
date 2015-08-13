var $j = jQuery.noConflict();
var mediaLarge = '1024px';
var mediaMedium = '800px';

// Define App Namespace
var app = {
    // Initializer
    init: function() {
        app.enquire();
    },

    enquire : function() {
        var themes = $j('.homepage-themes-blocks');
        var themesWrapper = $j('.homepage-themes');

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
    }

};
/* Initialize App */
jQuery(function($){app.init();});
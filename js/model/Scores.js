define(['backbone', '$', 'underscore'],

function(Backbone, $, _) {

    var Score = Backbone.Model.extend({
        defaults:{
            name:"Nikki",
            lives:"2",
            time:"5:00"
        }
    });

    return new Score();
});
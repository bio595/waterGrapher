requirejs.config({
    baseUrl: 'javascripts',
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
        
    }
        
});

requirejs(['jquery', 'flot/jquery.flot'],
function ($) {
    var data = [
        [[8,0], [22,5]], 
        [] //Target Line
    ];

    var options = {
        series: {
            lines: {
                fill: true,
                show: true
            },
            points: {
                show: true
            }
        },
        yaxis: {
            max: 5
        },
        xaxis: {
            min: 8
        }
    };

    var currentTime = 7;
    var currentTotal = 0;

    var plot = $.plot($("#chartContainer"), data, options);

    $("#addButton").click(function (e) {
        e.preventDefault();
        console.log("Curent time: " + currentTime + "\nCurrent total: " + currentTotal);
        //Get inputs
        var inputTotal = parseInt($("#total").val(), 10); //val() returns a string
        var inputTime = parseInt($("#timeSelect").val(), 10);
        
        if(inputTime <= currentTime){
            $("#badTime").show();
            return;

        }else if(inputTotal < currentTotal){
            $("#badTotal").show();
            return;
        }

        currentTotal = inputTotal;
        currentTime = inputTime;

        var newCoordinate = [inputTime, inputTotal];
        data[1].push(newCoordinate);

        plot.setData(data);
        plot.draw();
    });

    $(".alert .close").click(function (e) {
        $(e.target).parent().hide();
    });

});
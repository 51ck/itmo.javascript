( function(app) {
    'use strict';






    document.addEventListener('DOMContentLoaded', function() {

        var alpha = document.querySelector('.alpha');
        var beta = document.querySelector('.beta');

        var toggleGreen = function( element ) {
            element.classList.toggle('green');
        };

        alpha.addEventListener( 'click', function () {
            toggleGreen( this );
        } );

        beta.addEventListener( 'click', function () {
            toggleGreen( this );
        } );


        var task2Button = document.querySelector('.task2 button');
        task2Button.addEventListener( 'click', function() {
            let c = parseInt( this.innerHTML );
            this.innerHTML = ( c || c === 0 ) ? ++c : 0;
        } );




        var task3Button = document.querySelector('.task3 button');

        var TrafficLight = task3();
        var tLight = new TrafficLight('traffic-light');
        var trigger = true;
        task3Button.addEventListener( 'click', function() {
            task3Button.disabled = true;
            setTimeout( function(){
                task3Button.disabled = false;
            }, tLight.timeout );

            tLight.trigger( trigger );

            trigger = !trigger;
        } );




    });
} )(App);
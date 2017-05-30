( function(app) {
    'use strict';

    var task1 = ( hh, mm, ss ) => {
        var date = new Date();
        var time = {
            // h: date.getHours(),
            // m: date.getMinutes(),
            // s: date.getSeconds()
        };

        var hours = document.querySelector( hh );
        var minutes = document.querySelector( mm );
        var seconds = document.querySelector( ss );


        return function( ) {
            date.setTime( Date.now() );
            let now = {
                h: date.getHours(),
                m: date.getMinutes(),
                s: date.getSeconds()
            };

            if ( now.h !== time.h ) {
                time.h = now.h;
                hours.innerText = app.tools.bump( time.h, '0', 2 );
                hours.style.color = `#${ app.tools.randomRange( 30, 255 ).toString(16) }${ app.tools.randomRange( 30, 255 ).toString(16) }${ app.tools.randomRange( 30, 255 ).toString(16) }`
            };

            if ( now.m !== time.m ) {
                time.m = now.m;
                minutes.innerText = app.tools.bump( time.m, '0', 2 );
                minutes.style.color = `#${ app.tools.randomRange( 30, 255 ).toString(16) }${ app.tools.randomRange( 30, 255 ).toString(16) }${ app.tools.randomRange( 30, 255 ).toString(16) }`
            };

            if ( now.s !== time.s ) {
                time.s = now.s;
                seconds.innerText = app.tools.bump( time.s, '0', 2 );
                seconds.style.color = `#${ app.tools.randomRange( 30, 255 ).toString(16) }${ app.tools.randomRange( 30, 255 ).toString(16) }${ app.tools.randomRange( 30, 255 ).toString(16) }`
            };

        };

    };

    var task2 = () => {
        var item = {
            'title': 'яблоко',
            'description': 'Хорошее, свежее яблоко. никто ещё не жаловался. На запах, как арбуз. Приготовлено из цельного молока.',
            'number': '000001',
            'imageSrc': 'static/img/apples.png',
            'price': '$12.76',
            'unit': 'авоська',
            'render': function() {
                var self = this;

                let itemBlock = document.createElement( 'div' );
                itemBlock.classList.add( 'display-window--item-block' );

                let image = itemBlock.appendChild( document.createElement( 'img' ) );
                image.classList.add( 'display-window--item-image' );
                image.setAttribute( 'src', self.imageSrc );

                let descriptionBlock = itemBlock.appendChild(document.createElement('div'));
                descriptionBlock.classList.add( 'display-window--item-description-block' );

                let title = descriptionBlock.appendChild(document.createElement('h3'));
                title.classList.add( 'display-window--item-title' );
                title.innerText =  self.title;

                let number = descriptionBlock.appendChild(document.createElement('span'));
                number.classList.add( 'display-window--item-number' );
                number.innerText = self.number;

                let description = descriptionBlock.appendChild(document.createElement('p'));
                description.classList.add( 'display-window--item-description' );
                description.innerText = self.description;

                let price = descriptionBlock.appendChild(document.createElement('span'));
                price.classList.add( 'display-window--item-price' );
                price.innerText = self.price;

                let unit = descriptionBlock.appendChild(document.createElement('span'));
                unit.classList.add( 'display-window--item-unit' );
                unit.innerText = self.unit;

                return itemBlock;
            }
        };
            return item;
    };

    var task3 = () => {

        var TrafficLight = function ( id ) {
            var self = this;
            self.tLight = document.querySelector( `#${ id }` );
            self._currentState_ = 'stop';
            self._previousState_ = 'ready';
            self.timeout = 500;
            self.work = false;
            self.mainLoop = null;

            self._loop_ = function ( state ) {
                self.tLight.classList = self.states[ state ].style;
                self._previousState_ = self._currentState_;
                self._currentState_ = state;
                self.mainLoop = self.work ? setTimeout( function () {
                    self._loop_( self.states[ state ].order[ self._previousState_ ] );
                }, self.timeout) : null;
            };


            return self;
        };

        TrafficLight.prototype.states = {
            'forward': {
                'style': 'traffic-light--forward',
                'order': {
                    'left': 'right'
                },
            },

            'left': {
                'style': 'traffic-light--left',
                'order': {
                    'ready': 'forward'
                },
            },

            'right': {
                'style': 'traffic-light--right',
                'order': {
                    'forward': 'ready'
                },
            },

            // 'any': {
            //     'style': 'traffic-light--any',
            //     'order': {
            //         'ready': 'ready'
            //     },
            // },

            'ready': {
                'style': 'traffic-light--ready',
                'order': {
                    'right': 'stop',
                    'stop': 'left'
                },
            },

            'stop': {
                'style': 'traffic-light--stop',
                'order': {
                    'ready': 'ready'
                },
            },
        };

        TrafficLight.prototype.trigger = function( start ) {
            var self = this;
            self.work = start;
            if ( start && self.mainLoop === null ) {
                self._loop_( self.states[ self._currentState_ ].order[ self._previousState_ ] );
            };
        };

        return TrafficLight;

    };




    document.addEventListener('DOMContentLoaded', function() {

        var task1Button = document.querySelector('.task1 button');
        var timerState = false
        var timerId;
        var timer = task1( '.clock--hours', '.clock--minutes', '.clock--seconds' );

        task1Button.addEventListener( 'click', function() {
            timerState = !timerState;

            if ( timerState ) {
                timerId = setInterval( timer, 1000 );
            } else {
                clearInterval( timerId );
            };

        } );



        var task2Button = document.querySelector('.task2 button');
        var item = task2();
        task2Button.addEventListener( 'click', function() {
            document.querySelector(' #display-window' ).appendChild( item.render() );
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
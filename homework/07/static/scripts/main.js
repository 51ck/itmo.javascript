( function(app) {
    'use strict';

    var task1 = ( n = 4, s = 5 ) => {
        // Подключить стороннюю библиотеку для построения графиков.
        // Построить график функции y = f(x):
        // y = 5/x, при x>=1;
        // y = x*x – 4*x, при x<1.
        // Шаг варьирования x равен 0.01 и интервал варьирования -5 < x < 5.
        // Расчёт функции y = f(x) реализовать в виде отдельной функции.
        return ( x ) => {
            if ( x < 1) {
                return ( x - n ) * x;
            } else if ( x >= 1 ) {
                return s / x ;
            };
        };
    };


    var task4 = () => {
        // Написать кодер для шифра Цезаря (https://ru.wikipedia.org/wiki/Шифр_Цезаря).
        // На вход принимается строка и сдвиг. На выход - зашифрованное/расшифрованное сообщение.
        // Выдержка из Вики:
        // Шифр Цезаря — это вид шифра подстановки, в котором каждый символ в открытом
        // тексте заменяется символом, находящимся на некотором постоянном числе позиций левее
        // или правее него в алфавите. Например, в шифре со сдвигом вправо на 3, А была бы
        // заменена на Г, Б станет Д, и так далее.


        ////// Вопрос ....


        // var dictionary = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789';

        // let cryptChar( char, step = 0 ) {
        //     let index = dictionary.indexOf( cahr );
        //     if ( index === -1 ) {}
        // };

        // return function( string, step = 0 ) {
        //     let result = '';
        //     for ( let i = 0, n = string.length; i < n; i++ ) {
        //         let char = string[i];

        //     };
        // };
    };




    document.addEventListener('DOMContentLoaded', function() {

        var task1Button = document.querySelector('.task1 button');

        task1Button.addEventListener( 'click', function() {
            var data = [];
            for ( var k = 0; k <= 2; k += 0.5 ) {
                let y = task1( 4 * k, 5 * k );
                let line = {
                    x: [],
                    y: [],
                    type: 'scatter',
                    line: { shape: 'spline' }
                };
                for ( let x = -5; x < 5; x += 0.01 ) {
                    line.x.push( x );
                    line.y.push( y( x ) );
                };
                data.push( line );
            };

            // let y = task1();
            // let line = {
            //     x: [],
            //     y: [],
            //     type: 'scatter',
            //     line: { shape: 'spline' }
            // };
            // for ( let x = -5; x < 5; x += 0.01 ) {
            //     line.x.push( x );
            //     line.y.push( y( x ) );
            // };
            // data.push( line );


            Plotly.newPlot('placeholder', data);
        } );


        var task3Array = document.querySelector('.task3 input.arr');
        var task3Min = document.querySelector('.task3 button.min');
        var task3Max = document.querySelector('.task3 button.max');
        var task3Average = document.querySelector('.task3 button.average');
        var task3Clone = document.querySelector('.task3 button.clone');
        var task3Output = document.querySelector('.task3 span');
        var array = [];
        var last = function() {
            var lastFunction;

            var output = function( func ) {
                if ( typeof func === 'function' ) {
                    lastFunction = func;
                };
                if ( typeof lastFunction === 'function' ) {
                    return lastFunction( array );
                } else {
                    return [];
                };
            };

            return output;
        }();

        task3Array.addEventListener('keyup', function() {
            array = app.tools.stringToIntArray( this.value );
            task3Output.innerHTML = `[ ${ last() } ]`;
        });

        task3Min.addEventListener('click', function() {
            task3Output.innerHTML = `[ ${ last( app.tools.arrayMin ) } ]`;
        });

        task3Max.addEventListener('click', function() {
            task3Output.innerHTML = `[ ${ last( app.tools.arrayMax) } ]`;
        });

        task3Average.addEventListener('click', function() {
            task3Output.innerHTML = `[ ${ last( app.tools.arrayAverage ) } ]`;
        });

        task3Clone.addEventListener('click', function() {
            task3Output.innerHTML = `[ ${ last( app.tools.arrayClone ) } ]`;
        });
        // task3Button.addEventListener('click', function() {
        // });

        var task4Crypt = document.querySelector('.task3 button.crypt');
        var task4Decrypt = document.querySelector('.task3 button.decrypt');
        var task4Text = document.querySelector('.task3 input.text');
        var task4Cypher = document.querySelector('.task3 input.cypher');



    });
} )(App);
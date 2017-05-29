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

        let alphabet = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789';
        let lastStep;
        let dictionary = {}; // словарь для текущего шага.

        let cryptChar = ( char, step = 0 ) => {
            // Сдвиг символа на заданный шаг

            let index = alphabet.indexOf( char );
            if ( lastStep !== step ) {
                // Обнуляем словарь, если шаг изменился и сохраняем текущий шаг.
                dictionary = {};
                lastStep = step;
            };

            if ( dictionary[char] ){
                // Достаём символ из словаря, если он нам уже встречался
                return dictionary[char];
            } else {
                if ( index !== -1 ) {
                    // Если символ из алфавита...
                    if ( index + step < 0 ) {
                        // ... клмпенсируем сдвиг ...
                        var newIndex = index + step + alphabet.length;
                    } else if ( index + step + 1 > alphabet.length ){
                        // ... за пределы алфавита.
                        var newIndex = index + step - alphabet.length;
                    } else {
                        var newIndex = index + step;
                    };
                    dictionary[char] = alphabet[newIndex];
                    // Кладём новую пару символов в словарь.
                } else {
                    dictionary[char] = char;
                };
            };
            return dictionary[char];
        };

        return function( string, step = 0 ) {
            let result = '';
            step = step % alphabet.length;
            for ( let i = 0, n = string.length; i < n; i++ ) {
                result += cryptChar( string[i], step );
            };
            return result;
        };
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

        var task4Crypt = document.querySelector('.task4 button.crypt');
        var task4Decrypt = document.querySelector('.task4 button.decrypt');
        var task4Text = document.querySelector('.task4 input.text');
        var task4Cypher = document.querySelector('.task4 input.cypher');
        var task4Output = document.querySelector('.task4 span');
        var direction = true;
        var crypt = task4();

        task4Crypt.addEventListener('click', function() {
            direction = true;
            let step = parseInt(task4Cypher.value) || 0;
            step *= direction ? 1 : -1;
            task4Output.innerText = step ? crypt( task4Text.value, step ) : task4Text.value;
        });

        task4Decrypt.addEventListener('click', function() {
            direction = false;
            let step = parseInt(task4Cypher.value) || 0;
            step *= direction ? 1 : -1;
            task4Output.innerText = step ? crypt( task4Text.value, step ) : task4Text.value;
        });

        task4Text.addEventListener( 'keyup', function() {
            let step = parseInt(task4Cypher.value) || 0;
            step *= direction ? 1 : -1;
            task4Output.innerText = step ? crypt( task4Text.value, step ) : task4Text.value;
        } );

        task4Cypher.addEventListener( 'keyup', function() {
            let step = parseInt(task4Cypher.value) || 0;
            step *= direction ? 1 : -1;
            task4Output.innerText = step ? crypt( task4Text.value, step ) : task4Text.value;
        } );

    });
} )(App);
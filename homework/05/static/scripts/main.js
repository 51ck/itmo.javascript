( function(app) {
    'use strict';

    var task1 = function() {

    };

    var task2 = (a, b) => {
        // Заданы два массива A и B необходимо их объединить
        // в один массив C так, чтобы в массиве остались уникальные
        // (неповторяющиеся) элементы.
        // Например: A = [1,2], B = [2,3] получим С = [1, 2, 3].

        if ( a && !b ) { return a };
        if ( b && !a ) { return b };

        if ( a instanceof Array && b instanceof Array ) {
            return Array.from(new Set([...a, ...b])); // спёр в интернете
        };

        return [];
    };

    var task3 = (n) => {
        // Написать отдельную функцию, которая выводит пользователю
        // заданное число чисел Фибоначчи.
        // (например, первых 8 чисел Фибоначчи:  0, 1, 1, 2, 3, 5, 8, 13, 21).
        // Заданное число передается функции в качестве аргумента.
        // Про числа Фибоначчи: https://ru.wikipedia.org/wiki/Числа_Фибоначчи
        var a = 0,
            b = 1;

        while ( n-- > 0 ) {
            [a, b] = [b, a + b];
        };
        return a;
    };

    var task4 = (n) => {
        // Напишите функцию (), которая в зависимости от переданных
        // в нее целочисленных аргументов "количество дней", будет выводить
        // слово "день" в нужно форме ("если передали - 1, то 1 день",
        // "если передали - 3, то 3 дня" и т.д).
        var n = n.toString();
        var l = n.length;
        if ( l > 1 && n[l - 2] === '1' ) {
            return `${ n } дней`;
        } else {
            switch ( n[l - 1] ) {
                case '0':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    return `${ n } дней`;
                    break; // Знаю, что
                case '1':
                    return `${ n } день`;
                    break; // не нужно брякать
                case '2':
                case '3':
                case '4':
                    return `${ n } дня`;
                    break; // ничего не могу с собой поделать.
            };
        };
    };


    document.addEventListener('DOMContentLoaded', function(){
        var spans = document.querySelectorAll('[class^="task"] > span')
            ;

        var task2Arr = document.querySelector('.task2 input.arr')
            , task2Brr = document.querySelector('.task2 input.brr')
            , task2Handler = function(e){
                    var newArr = task2(app.tools.stringToIntArray(task2Arr.value), app.tools.stringToIntArray(task2Brr.value));
                    if ( newArr ) {
                        spans[1].innerHTML = `[ ${newArr.join(', ')} ]`;
                    };
                }
            ;

        task2Arr.addEventListener('keyup', task2Handler);
        task2Brr.addEventListener('keyup', task2Handler);

    //     var game = new X0 ({
    //         fieldSelector: '.task2 .table-wrapper table',
    //         scoreSelector: '.task2 span',
    //         resetButtonSelector: '.task2 button'
    //     });


        var task3Input = document.querySelector('.task3 input[type="text"]');

        task3Input.addEventListener('keyup', function(){
            var n = app.tools.stringToIntArray(this.value)[0];
            spans[2].innerHTML = n ? task3(n) : '0';
        });

        var task4Input = document.querySelector('.task4 input[type="text"]')
        task4Input.addEventListener('keyup', function(){
            var n = app.tools.stringToIntArray(this.value)[0];
            if ( n ) { spans[3].innerHTML = task4(n); } else { spans[3].innerHTML = ''; }
        });
    });
} )(App);
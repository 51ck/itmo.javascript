(function(){
    var task1 = function() {
        // Из трех данных чисел выбрать наименьшее.
        var arr;
        try {
            arr = prompt('Введите 3 числа, разделённых запятой:').split(',').map(function(num){
                return parseInt(num.replace(' ', ''))
            });
        } catch(e) {
            console.log(e);
        };

        if ( arr.length >= 3 ) {
            var min = 0;
            for (var i = 1; i < arr.length; i++) {
                if ( arr[i] < arr[min] ) { min = i };
            };
            return arr[min];
        } else {
            alert('Необходимо ввести три числа, разделенные запятой.');
            return '/ошиблись при вводе/';
        };
    };

    var task2 = function() {
        // Дано целое число, лежащее в диапазоне от -999 до 999.
        // Вывести строку - словесное описание данного числа вида
        // "отрицательное двузначное число",
        // "нулевое число",
        // "положительное однозначное число" и т.д.

        var num;
        try {
            num = parseInt(prompt('Введите число в диапозоне (-999..999):'));
        } catch(e) {
            console.log(e);
        };

        if (num > -1000 && num < 1000) {
            var result = '';
            result += num && num > 0 ? 'положительное' : 'отрицательное';
            num = Math.abs(num);

            switch ( true ) {
                case (num === 0):
                    result += 'нулевое';
                    break;
                case ( num < 10 ):
                    result += ' однозначное';
                    break;
                case ( num < 100 ):
                    result += ' двузначное';
                    break;
                case ( num < 1000 ):
                    result += ' трехзначное';
                    break;
                default:
                    alert('Что-то с ним не так: ' + num);
            };

            result += ' число'

            return result;

        } else {
            alert('Ошибка диапозона.')
            return '/ошиблись при вводе/';
        };
    };

    var task3 = function() {
        // Перераспределить значения переменных X и Y так,
        // чтобы в X оказалось меньшее из этих значений, а в Y — большее.
        var arr;
        try {
            arr = prompt('Введите X и Y через запятую:').split(',').map(function(num){
                return parseInt(num.replace(' ', ''))
            });
        } catch(e) {
            console.log(e);
        };

        if ( arr.length === 2 ) {
            var x = arr[0], y = arr[1];
            if ( x > y ) {
                var temp = x;
                x = y;
                y = temp;
            };

            return 'X: ' + x + '; Y: ' + y;

        } else {
            alert('Вы ошиблись при вводе. Попробуйте ещё раз.');
            return '/ошиблись при вводе/';
        };

    };

    var task4 = function() {
        // Дана строка. Вывести коды ее первого и последнего символа.

        var str = prompt('Введите строку: ');

        if ( str.length ) {
            return '\"' + str[0] + '\" [' + str.charCodeAt(0) + ']; \"' + str[str.length - 1] + '\" [' + str.charCodeAt(str.length - 1) + ']';
        } else {
            alert('Проверьте ввод.');
            return '/ошиблись при вводе/';
        };



    };

    var task5 = function() {
        // Проверить истинность высказывания:
        // "Среди трех данных целых чисел есть хоть
        // бы одна пара совпадающих".
        // Требуется вывести логическое значение True,
        // если приведенное высказывание для предложенных исходных
        // данных является истинным, и значение False в противном случае.

        var arr;

        try {
            var arr = prompt('Введите 3 числа, разделённых запятой:').split(',').map(function(num){
                return parseInt(num.replace(' ', ''))
            });
        } catch(e) {
            console.log(e);
        };

        if ( arr.length === 3 ) {
            if ( arr[0] === arr[1] || arr[1] === arr[2] || arr[2] === arr[0] ) {
                return true;
            } else {
                return false;
            };
        };
    };

    document.addEventListener('DOMContentLoaded', function(){
        var buttons = document.querySelectorAll('[class^="task"] > button')
            , spans = document.querySelectorAll('[class^="task"] > span')
            ;

            buttons[0].addEventListener('click', function(){
                spans[0].innerHTML = 'Наименьшее число: ' + task1() + '.';
            });

            buttons[1].addEventListener('click', function(){
                spans[1].innerHTML = 'Вы ввели ' + task2() + '.';
            });

            buttons[2].addEventListener('click', function(){
                spans[2].innerHTML = task3() + '.';
            });

            buttons[3].addEventListener('click', function(){
                spans[3].innerHTML = task4() + '.';
            });

            buttons[4].addEventListener('click', function(){
                spans[4].innerHTML = '\"Среди введенных чисел есть пара одинаковых\" - ' + task5() + '.';
            });



    });

})();
(function(){

    var task1 = function() {
        // Есть три вершины. Координаты X, Y, Z заданы как целые числа.
        // Нужно определить - является ли треугольник с заданными
        // координатами прямоугольным.
        var getPoint = function(promptString){
            return prompt(promptString)
                .split(',')
                .map(function(numStr) {
                    var c = parseInt(numStr.replace(/\s+/igm, ''));
                    return c ? c : 0;
                })
                .slice(0, 3);
        };

        var getLength = function(O = [0, 0, 0], Z = [0, 0, 0]){
            l = Math.sqrt(Math.pow(O[0] - Z[0], 2) + Math.pow(O[1] - Z[1], 2) + Math.pow(O[2] - Z[2], 2));
            // здесь, конечно, можно было обойтись без вычисления корня - дальше всё равно сравниваются квадраты длин.
            return l;
        };

        var A = getPoint('Введите координаты (x, y, z)\n\
            для первой вершины треугольника:\n\
            (три числа, разделенных запятой)')
            , B = getPoint('Теперь для второй вершины:')
            , C = getPoint('И для третьей:')
            ;

        var a = getLength(A, B)
            , b = getLength(B, C)
            , c = getLength(C, A)
            ;

        if ( a*a === b*b + c*c || b*b === c*c + a*a || c*c === a*a + b*b ) {
            return true;
        } else {
            return false;
        };
    };


    var task2 = function(key) {
        // Дано целое число в диапазоне
        // 0 - 9.
        // Вывести строку - название соответствующей цифры
        // на русском языке
        // (0 - "ноль", 1 - "один", 2 - "два", ...).

        var number = parseInt(key);

        switch ( number ) {
            case 0:
                return 'нуль';
                break;

            case 1:
                return 'единица';
                break;

            case 2:
                return 'двойка';
                break;

            case 3:
                return 'тройка';
                break;

            case 4:
                return 'четвёрка';
                break;

            case 5:
                return 'пятёрка';
                break;

            case 6:
                return 'шестёрка';
                break;

            case 7:
                return 'семёрка';
                break;

            case 8:
                return 'восьмёрка';
                break;

            case 9:
                return 'девятка';
                break;

            default:
                    return key;
        };

    };


    var task3 = function(key) {
        // Дано целое число в диапазоне 1 - 5.
        // Вывести
        // строку - словесное описание соответствующей
        // оценки
        // (1 - "плохо",
        // 2 - "неудовлетворительно",
        // 3 - "удовлетворительно",
        // 4 - "хорошо",
        // 5 - "отлично").

        var number = parseInt(key);

        switch ( number ) {
            case 0:
                return 'н/а';
                break;

            case 1:
                return 'плохо';
                break;

            case 2:
                return 'неудовлетворительно';
                break;

            case 3:
                return 'удовлетворительно';
                break;

            case 4:
                return 'хорошо';
                break;

            case 5:
                return 'отлично';
                break;

            default:
                    return 'борода';
        };

    };

    var task4 = function() {
        // Вывести используя (document.write) таблицу умножения чисел до 10.

        var table ='';
        // table += '<table><thead>' '</thead><tbody>' '</tbody></table>';

        var i = 0
            ;

        while ( i < 10 ) {
            var td = ['<td style="width: 2em; padding: .25em;">', '</td>'],
                th = ['<th style="width: 2em; border-right: 1px solid gray; padding: .25em;">', '</th>'];

            if ( i === 0 ) {
                table += '<table style="border-spacing: collapse"><thead>';
                td = ['<th style="width: 2em; border-bottom: 1px solid gray; padding: .25em;">', '</th>'];
            };

            table += '<tr>';
            var j = 0;
            while ( j < 10 ) {
                if ( i === 0 && j === 0 ) {
                    table += '<th style="width: 2em; border-right: 1px solid gray; border-bottom: 1px solid gray; padding: .25em;">\</th>'
                } else if ( j === 0) {
                    table += th[0] + (j ? j : 1) * (i ? i : 1) + th[1];
                } else {
                    table += td[0] + (j ? j : 1) * (i ? i : 1) + td[1];
                };

                j++;
            };

            table += '</tr>';

            if ( i === 0 ) {
                table += '</thead><tbody>';
            };

            i++;

            if ( i === 10 ) {
                table += '</tbody></table>';
            };

        };
        return table;
    };


    document.addEventListener('DOMContentLoaded', function(){
        var spans = document.querySelectorAll('[class^="task"] > span')
            ;

            document.querySelector('.task1 button').addEventListener('click', function(){
                if (task1()) {
                    spans[0].innerHTML = 'Треугольник прямоугольный.';
                } else {
                    spans[0].innerHTML = 'Треугольник непрямоугольный.';
                };
            });

            document.querySelector('.task2 input[type="text"]').addEventListener('keypress', function(e){
                e.preventDefault();
                this.value = e.key;
                spans[1].innerHTML = task2(e.key);
            });

            document.querySelector('.task3 input[type="text"]').addEventListener('keypress', function(e){
                e.preventDefault();
                this.value = e.key;
                spans[2].innerHTML = task3(e.key);
            });

            document.querySelector('.task4 button').addEventListener('click', function(){
                spans[3].innerHTML = task4();
                // да, не через document.write()

            });


    });

})();
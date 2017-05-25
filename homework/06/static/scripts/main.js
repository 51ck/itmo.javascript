( function(app) {
    'use strict';

    var task1 = () => {
        // Построить объект студент:
        // - свойства: Имя, Фамилия, Возраст, Интересы (в виде массива), Место обучения.
        // - метод выводящий в консоль биографическую справку в виде, например:
        // «Иван Петров. 21 год. Интересы: программирование, музыка, аниме. Учится в ИТМО.

        // Мне становится всё сложнее выдерживать стиль своих домашек.

        var firstNames = [
            'Иван',
            'Василий',
            'Николай',
            'Савелий',
            'Карл',
            'Семён',
            'Анастасия',
            'Серёжа',
            'Марк'
        ];
        var secondNames = [
            'Локтев',
            'Митрофанов',
            'Варежкин',
            'Сатановский',
            'Каруселькин',
            'Небов',
            'Лантарин',
            'Рисовалов',
            'Жоподуй'
        ];
        var interests = [
            'музыка',
            'живопись',
            'порнография',
            'видеоигры',
            'бег',
            'посидеть в падике',
            'наркотики',
            'животные',
            'оккультизм',
            'выход из тела',
            'спорт',
            'споры в интернете',
            'ТНТ',
            'РЕН-ТВ',
            'конспирология',
            'видеоблогинг',
            'социальные сети',
            'прогулки на свежем воздухе',
            'велосипед'
        ];
        var universities = [
            'ИТМО',
            'ДГТУ',
            'МГУ',
            'ПТУ',
            'МОУ СОШ №231',
            'ИКТ',
            'ВГУЛВ',
            'РГУПС',
            'ФЫВАПОН',
            'ИЙИРН'
        ];

        var getInterests = function(n) {
            var result = [];
            var ints = interests.slice(0);
            while ( result.length <= n && ints.length) {
                result = result.concat(ints.splice(app.tools.randomRange(0, ints.length - 1), 1));
            };
            return result;
        };

        var years = (n) => {
            var n = n.toString();
            var l = n.length;
            if ( l > 1 && n[l - 2] === '1' ) {
                return `${ n } лет`;
            } else {
                switch ( n[l - 1] ) {
                    case '0':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        return `${ n } лет`;
                        break;
                    case '1':
                        return `${ n } год`;
                        break;
                    case '2':
                    case '3':
                    case '4':
                        return `${ n } года`;
                        break;
                };
            };
        };

        var getStudent = function() {
            var student = {
                name: app.tools.oneOf(firstNames),
                secondName: app.tools.oneOf(secondNames),
                age: app.tools.randomRange(16, 27),
                interests: getInterests(app.tools.randomRange(1, 4)),
                university: app.tools.oneOf(universities),
                description: function() {
                    return `${ this.name } ${ this.secondName }. ${ years( this.age ) }. Интересы: ${ this.interests.join(', ')}. Учится в ${ this.university }`
                }
            };
            return student;
        };

        return getStudent;
    };

    var task2 = ( a ) => {
        // Написать функцию вычисляющую факториал числа с использованием рекурсии.
        // Факториал числа - это число, умноженное на себя минус один, затем на себя
        // минус два и так далее, до единицы. Обозначаетс n!
        // Определение факториала можно записать как: n! = n * (n - 1) * (n - 2) * ...*1

        if ( a === 0 || a === 1 || a === -1) {
            return a;
        } else {
            return ( a < 0 ) ? a * task2( a + 1 ) : a * task2( a - 1 );
        };
    };

    var task3 = ( n = 100 ) => {
        // Сделайте функцию, каждый вызов который будет генерировать случайные числа
        // от 1 до 100, но так, чтобы они не повторялись, пока не будут перебраны все
        // числа из этого промежутка. Решите задачу через замыкания - в замыкании должен
        // хранится массив чисел, которые уже были сгенерированы функцией.
        var numbers = [], called = [], step = 0;
        for ( var i = 0; i < n; i++ ) {
            numbers[i] = i + 1;
        };

        var randomNumber = function() {
            if ( step < n ) {
                var result;
                [result] = numbers.splice( app.tools.randomRange( 0, n - step - 1 ), 1 );
                called.push(result);
                step++;
                return result;
            };
        };
        return randomNumber;
    };



    document.addEventListener('DOMContentLoaded', function() {
        var spans = document.querySelectorAll('[class^="task"] > span')
            ;

        var task1Button = document.querySelector('.task1 button');
        var getStudent = task1();
        task1Button.addEventListener( 'click', function() {
            var student = getStudent();
            spans[0].innerHTML = student.description();
        } );

        var task2Input = document.querySelector('.task2 input[type="text"]');
        task2Input.addEventListener('keyup', function() {
            var n = app.tools.stringToIntArray(this.value)[0];
            spans[1].innerHTML = n ? task2(n) : spans[1].innerHTML = '';
        });


        var task3Button = document.querySelector('.task3 button');
        task3Button.addEventListener('click', function() {
            var n = 100,
                randomNumber = task3(n);

            spans[2].innerHTML = '';
            for ( var i = 0; i < n; i++ ) {
                var num = randomNumber();
                spans[2].innerHTML += `${ app.tools.bump( num, ' ', 4 )}${(( i !== 99 ) ? ',' : '')}${( !( (i + 1) % 10 ) ) ? '<br />' : ''}`;
            };
        });

    });
} )(App);
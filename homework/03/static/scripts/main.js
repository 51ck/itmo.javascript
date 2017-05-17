(function(){

    var task1 = function(string) {
        // Дана строка, изображающая целое число.
        // Вывести сумму цифр этого числа.

        return function(arr) {
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                result += parseInt(arr[i])
            };
            return result || 0;
        } (string.match(/\d/g) || []);
    };


    var task2 = function(string, char) {
        // Дана строка S и символ C.
        // Удвоить каждое вхождение символа C в строку S.

        var regex = new RegExp(char || '', 'g');
        return string.replace(regex, char + char);
    };


    var task3 = function(password) {
        // Проверить что введенный пароль удовлетворяет следующим условиям сложности:
        //  - длинна от 9 символов;
        //  - содержит обязательно английские буквы верхнего и нижнего регистра;
        //  - содержит более двух цифр;
        //  - содержит обязательно один из неалфавитных символов (например, !, $, #, %).

        result = '';

        if ( /.{9,}/.test( password ) ) {
            result += ' {9,} '
        } else {
            result += '<s> {9,} </s>'
        };

        if ( /[a-z]/.test( password ) && /[A-Z]/.test(password) ) {
            result += ' [Aa] '
        } else {
            result += '<s> [Aa] </s>'
        };

        if ( /\d/.test( password ) && password.match(/\d/g).length >= 2 ) {
            result += ' [x2] '
        } else {
            result += '<s> [x2] </s>'
        };

        if ( /[!#$%^&\*()\[\]]/.test( password ) ) {
            result += ' [!#] '
        } else {
            result += '<s> [!#] </s>'
        };

        return result;

    };



    document.addEventListener('DOMContentLoaded', function(){
        var spans = document.querySelectorAll('[class^="task"] > span')
            ;

        document.querySelector('.task1 input[type="text"]').addEventListener('keyup', function(e){
            spans[0].innerHTML = task1(this.value);
        });

        var task2String = document.querySelector('.task2 input.string')
            , task2Char = document.querySelector('.task2 input.char')
            ;

        task2String.addEventListener('keyup', function(e){
            // e.preventDefault();

            spans[1].innerHTML = task2Char.value ? task2(task2String.value, task2Char.value) : task2String.value;
        });

        task2Char.addEventListener('keypress', function(e){
            e.preventDefault();
            this.value = e.key;

            spans[1].innerHTML = task2Char.value ? task2(task2String.value, task2Char.value) : task2String.value;

        });

        document.querySelector('.task3 input[type="text"]').addEventListener('keyup', function(e){
            spans[2].innerHTML = task3(this.value);
        });

    });

})();
( function() {
    'use strict';

    var stringToIntArray = function( string ) {
        if ( typeof string === 'string' ) {
            if ( /\d/.test(string) ) {
                var arr = string.match( /-?\d+/g );
                return arr.map(function(n) { return parseInt(n); });
            } else {
                return [];
            };
        } else {
            return null;
        };
    };

    var task1 = function() {
        // Заданы два массива A = [ 12, 4, 3, 10, 1, 20 ]  B = [-3, -7, -100, -33]
        // необходимо их объединить в один массив C добавив массив B в конец(в начало) A.
        var result = [];
        for ( var i = 0, n = arguments.length; i < n; i++ ) {
            var  array = arguments[i];
            if (array instanceof Array) {
                result = result.concat(array);
            };
        };
        return result.length ? result : null;
    };


    var X0 = function( options ) {
        // Одномерным массивом задана доска 3 на 3
        // var area = [ null, null, null, null, null, null, null, null, null ]
        // Необходимо сформировать игровое поле состоящее из квадратов для крестиков-ноликов  в HTML.
        // При появлении в массиве 0-ля рисовать нолик , 1-цы крестик
        // Пример:  [ 1, null, 0, null, 1, null, null, null, null ] на поле 2-а крестика, и 1-н нолик.

        var objectMerge = function(A, B = {}, recursive = true) {
            if (!A) { return B };
            if (!B) { return A };

            if ( typeof A === 'object' ) {
                for (var key in B) {
                    if ( recursive && typeof A[key] === 'object' && typeof B[key] === 'object' ) {
                       A[key] = objectMerge( A[key], B[key], true );
                    } else {
                        A[key] = B[key];
                    };
                };
                return A;
            };
        };

        var self = this;

        self.options = objectMerge(self.options, options);

        self.state = [ null, null, null, null, null, null, null, null, null ];
        // self.round % 2 = true; // true > X ; false > O
        self.round = 1;
        self.win = false;
        self.winFields = [];


        self.initGameFields();
    };

    X0.prototype.options = {
        fieldSelector: '#game-field',
        scoreSelector: '#game-score',
        resetButtonSelector: '#game-reset'
    };

    X0.prototype._getGameField_ = function() {
        var self = this;
        return document.querySelector(self.options.fieldSelector);
    };

    X0.prototype._getScoreField_ = function() {
        var self = this;
        return document.querySelector(self.options.scoreSelector);
    };

    X0.prototype._getResetButton_ = function() {
        var self = this;
        return document.querySelector(self.options.resetButtonSelector);
    };

    X0.prototype.initGameFields = function() {
        var self = this;
        self.gameField = self._getGameField_();
        self.scoreField = self._getScoreField_();
        self.resetButton = self._getResetButton_();

        self.fieldList = self.gameField.querySelectorAll('td');

        self.gameField.addEventListener('click', function( e ) {
            self.clickHandler( e, self );
        });

        self.resetButton.addEventListener('click', function() {
            self.reset()
        });
        self.resetButton.disabled = false;
    };

    X0.prototype.render = function() {
        var self = this;
        self.check();

        for ( var i = 0; i < 9; i++) {
            switch (self.state[i]) {
                case 1:
                    self.fieldList[i].innerHTML = 'X';
                    break;
                case 0:
                    self.fieldList[i].innerHTML = 'O';
                    break;
                default:
                    self.fieldList[i].innerHTML = '';
            };
        };

        var winFieldsLength = self.winFields.length;
        if ( winFieldsLength ) {
            for ( var i = 0; i < winFieldsLength; i++ ) {
                self.fieldList[self.winFields[i]].classList.add('win');
            };
        };
    };

    X0.prototype.reset = function() {
        var self = this;

        self.state = [ null, null, null, null, null, null, null, null, null ];
        self.round = 1;
        var winFieldsLength = self.winFields.length;
        if ( winFieldsLength ) {
            for ( var i = 0; i < winFieldsLength; i++ ) {
                self.fieldList[self.winFields[i]].classList.remove('win');
            };
            self.winFields = [];
        };
        self.win = false;
        self.render();
    };

    X0.prototype.check = function() {
        var self = this;
        var win = false;

        var vertical = function() {
            var winFields = [];
            for (var i = 0; i < 3; i++) {
                winFields = [];
                for (var j = 0, point = self.state[ i ]; j < 3; j++) {
                    if ( self.state[ j * 3 + i ] != null && self.state[ j * 3 + i ] === point) {
                        winFields = winFields.concat( j * 3 + i );
                    } else {
                        break;
                    };
                };
                if ( winFields.length === 3 ) {
                    break;
                };
            };
            return winFields.length === 3 ? winFields : false;
        };

        var horizontal = function() {
            var winFields = [];
            for (var i = 0; i < 3; i++) {
                winFields = [];
                for (var j = 0, point = self.state[ i * 3 ]; j < 3; j++) {
                    if ( self.state[ i * 3 + j ] != null && self.state[ i * 3 + j ] === point) {
                        winFields = winFields.concat( i * 3 + j );
                    } else {
                        break;
                    };
                };
                if ( winFields.length === 3 ) {
                    break;
                };
            };
            return winFields.length === 3 ? winFields : false;
        };

        var diagonalLT2RD = function() {
            var winFields = [];
            for (var i = 0, point = self.state[ i ]; i < 3; i++) {
                if ( self.state[ i * 3 + i ] != null && self.state[ i * 3 + i ] === point) {
                    winFields = winFields.concat( i * 3 + i );
                } else {
                    winFields = [];
                    break;
                };
            };
            return winFields.length === 3 ? winFields : false;
        };


        var diagonalRT2LD = function() {
            var winFields = [];
            for (var i = 0, point = self.state[ 2 - i ]; i < 3; i++) {
                if ( self.state[ i * 3 + 2 - i ] != null && self.state[ i * 3 + 2 - i ] === point) {
                    winFields = winFields.concat( i * 3 + 2 - i );
                } else {
                    winFields = [];
                    break;
                };
            };
            return winFields.length === 3 ? winFields : false;
        };

        self.winFields = vertical() || horizontal() || diagonalLT2RD() || diagonalRT2LD() || [];
        if ( self.winFields.length ) {
            win = true;
            self.win = true;
        }
        self.score();
        return win;
    };

    X0.prototype.clickHandler = function( event, context = this ) {
        var self = context;
        var field = event.target.closest('td');
        var i = Array.prototype.indexOf.call( self.fieldList, field );
        if ( !self.win && self.round < 10 ) {
            if ( self.state[i] === null ) {
                if ( self.round % 2 ) {
                    self.state[i] = 1;
                } else {
                    self.state[i] = 0;
                };
                self.round++
                self.render();
            };
        };
    };

    X0.prototype.score = function() {
        var self = this;
        var score = `[ ${self.state.join(', ')} ]`;
        if ( self.win || self.round === 10 ) {
            score += '\nИгра окончена: ';

            if ( self.win ) {
                score += 'победили ' + (self.round % 2 ? 'бублики!' : 'кресты!');
            } else {
                score += 'ходов больше нет.';
            }
        } else {
            score += self.round % 2 ? '\nХодят кресты.': '\nХодят бублики.';
        };

        self.scoreField.innerHTML = score;
    };








    var task3 = function(arr) {
        // Задан массив  - [12,4,3,10,1,20].
        // Удалить из него наименьшее и наибольшее значение.

        if ( arr instanceof Array ) {
            var min = 0
                , max = 0
                ;

            if ( arr.length ){
                for ( var i = 1, n = arr.length; i < n; i++ ) {
                    if ( arr[i] < arr[min] ) {
                        min = i;
                    };
                };
                arr.splice( min, 1 );
            };

            if ( arr.length ){
                for ( var i = 1, n = arr.length; i < n; i++ ) {
                    if ( arr[i] > arr[max] ) {
                        max = i;
                    };
                };
                arr.splice( max, 1 );
            };

            return arr;

        } else {

            return null;

        };
    };

    var task4 = function( arr ) {
        // Задан массив - [12,4,3,10,1,20] необходимо,
        // отсортировать его в порядке возрастания,
        // при этом не использовать готовый метод
        // sort и методы разобранные на занятии.

        // Немножко спёр код в интернетах... Мне мозгов не хватило алгоритм в голове обработать.

        var sort = function(array, start = 0, end = array.length - 1) {

            var getPivot = function(array, start = 0, end = array.length - 1) {
                var pivot = Math.floor( ( array[start] + array[end] ) / 2 );
                return pivot;
            };

            var part = function( array, start, end ) {
                var pivot = getPivot(array, start, end)
                    , i = start
                    , j = end
                    ;
                while ( i <= j ) {
                    while ( array[i] < pivot) {
                        i++;
                    };
                    while ( array[j] > pivot) {
                        j--;
                    };
                    if ( i <= j ) {
                        [ array[i], array[j] ] = [ array[j], array[i] ];
                        i++;
                        j--;
                    };
                };
                return i;
            };

            var qsort = function( array, start, end ) {
                var index;
                if ( array.length > 1 ) {
                    index = part( array, start, end );
                    if ( start < index - 1 ) {
                        qsort( array, start, index - 1 );
                    };
                    if ( end > index ) {
                        qsort( array, index, end );
                    };
                };
            return array;
            };
            return qsort( array, start, end );
        };
        return sort( arr );
    };


    document.addEventListener('DOMContentLoaded', function(){
        var spans = document.querySelectorAll('[class^="task"] > span')
            ;

        var task1Arr = document.querySelector('.task1 input.arr')
            , task1Brr = document.querySelector('.task1 input.brr')
            , task1Handler = function(e){
                    var newArr = task1(stringToIntArray(task1Arr.value), stringToIntArray(task1Brr.value));
                    if ( newArr ) {
                        spans[0].innerHTML = `[ ${newArr.join(', ')} ]`;
                    };
                }
            ;

        task1Arr.addEventListener('keyup', task1Handler);
        task1Brr.addEventListener('keyup', task1Handler);

        var game = new X0 ({
            fieldSelector: '.task2 .table-wrapper table',
            scoreSelector: '.task2 span',
            resetButtonSelector: '.task2 button'
        });


        var task3Input = document.querySelector('.task3 input[type="text"]');

        task3Input.addEventListener('keyup', function(e){
            spans[2].innerHTML = task3Input.value ? task3(stringToIntArray(task3Input.value)) : '[ . . . ]';
        });

        var task4Input = document.querySelector('.task4 input[type="text"]')
        task4Input.addEventListener('keyup', function(){
            spans[3].innerHTML = task4(stringToIntArray(this.value));
        });

    });
} )();
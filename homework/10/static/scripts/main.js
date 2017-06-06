( function( app ) {
    'use strict';

    let Good = function ( name, price = 0 ) {
        this.name = name.toString();
        this.price = parseInt( price );
    };

    let Crate = function ( ...a ) {
        this.goods = a instanceof Array ? a.filter( function ( e ) { return e instanceof Good } ) : [];
        this.count = this.goods.length;
        this.total = 0;
        for ( let i = 0; i < this.count; i++ ) {
            this.total += this.goods[i].price || 0;
        };

        this.addGood = function ( good ) {
            if ( good instanceof Good ) {
                this.goods.push( good );
                this.total += good.price || 0;
                this.count++;
            };
            return this;
        };

        this.getTotal = function () {
            return this.total;
        };

        this.getCount = function () {
            return this.count;
        };
    };

    app.Crate = Crate;
    app.Good = Good;

    //-----------------------------------------------------//


    app.studentGenerator = function () {
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
                result.push(ints.splice(app.tools.randomRange(0, ints.length - 1), 1));
            };
            return result;
        };


        var getStudent = function() {
            var student = {
                name: app.tools.oneOf(firstNames),
                secondName: app.tools.oneOf(secondNames),
                age: app.tools.randomRange(16, 27),
                male: !!Math.round( Math.random( ) ),
                interests: getInterests(app.tools.randomRange(1, 4)),
                university: app.tools.oneOf(universities),
            };
            return student;
        };

        return getStudent;
    }();

    var years = function (n) {
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

    //-----------------------------------------------------//
    let Human = function ( human ) {
        this.name = human.name + ' ' + human.secondName;
        this.age = human.age;
        this.male = human.male;
        this.interests = human.interests;

        this.toString = function () {
            return `${ this.name }. ${ this.male ? 'Мужчина' : 'Женщина' }, ${ years( this.age ) }. Интересы: ${ this.interests.join(', ')}.`;
        };
    };

    let Student = function ( human ) {
        Human.call( this, human );
        this.university = human.university;

        this.toString = function () {
            return `${ this.name }. ${ this.male ? 'Мужчина' : 'Женщина' }, ${ years( this.age ) }. Интересы: ${ this.interests.join(', ')}. Учится в ${ this.university }.`;
        };
    };

    app.Human = Human;
    app.Student = Student;

    //-----------------------------------------------------//

    var User = function () {
        this.name;
        this.age;
        this.toString = function () {
            return this.name;
        };
    };

    User.newUser = function ( user ) {
        let u = new User();

        u.name = user.name === 'Анон' ? '"Анон"' : user.name.toString();
        u.age = parseInt( user.age ) || null;

        return u;
    };

    User.anonimous = function () {
        let u = new User();

        u.name = 'Анон';
        u.age = null;

        return u;
    };

    app.User = User;


    //-----------------------------------------------------//


    document.addEventListener('DOMContentLoaded', function() {

    });
} )( App );
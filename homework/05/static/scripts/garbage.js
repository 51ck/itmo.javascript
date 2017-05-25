(function(app){
    let quickSort = function(array, start = 0, end = array.length - 1) {

        var getPivot = function(array, start, end) {
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

    let objectMerge = function( A, B = {}, recursive = true ) {
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

    let stringToIntArray = function( string ) {
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

    let universalCounter = function() {
        var dictionary = {};
        return function( item ) {
            dictionary[ item ] = dictionary[ item ] === undefined ? 1 : dictionary[ item ] + 1;
            return dictionary[ item ];
        };
    };

    let weedOut = function( array, filter = function( item, index, array) { return true; }) {
        if ( array instanceof Array ) {
            var result = [];
            for ( var i = 0, n = array.length; i < n; i++ ) {
                if ( filter( array[i], i, array ) ) {
                    result.push( array[i] );
                };
            };
        } else {
            return array;
        };
    };

    let bump = function( number, char = ' ', length = number.toString().length ) {
        var result = number.toString();
        var filler = '';

        if ( result.length < length ) {
            var fillLength = length - result.length;
            if ( char.length > 1 ) {
                while ( fillLength > 0 ) {
                    var i = 0,
                        n = char.length;
                    while ( i < n && fillLength-- ) {
                        filler += char[i++];
                    };
                };
            } else {
                filler = Array( fillLength + 1 ).join( char );
            };
        };
        return filler + result;
    };

    let printObject = function( object, recursive = true, level = 1 ) {
        var result = '';
        for ( var key in object ) {
            if ( recursive && typeof object[key] === 'object' ) {
                result += `${Array( level ).join( '\t' ) }${ key }:\n` + printObject( object[key], true, level + 1 );
            } else {
                result += `${Array( level ).join( '\t' ) }${ key }: ${ object[key] }\n`;
            };
        };
        return result;
    };

    let randomRange = function( min, max, integer = true ) {
        [min, max] = ( min < max ) ? [min, max] : [max, min];

        return integer ?
            Math.floor( Math.random() * ( max - min + 1 ) + min ) :
            Math.random() * ( max - min ) + min
    };

    // let range = function( start, end, step = 1 ) {
    //     switch ( arguments.length ) {
    //         case 1:
    //             [start, end] = [0, arguments[0]];
    //             step = ( end < start ) ? -1 : 1;
    //             break;
    //         case 2:
    //             [start, end] = [arguments[0], arguments[1]];
    //             step = ( end < start ) ? -1 : 1;
    //             break;
    //         case 3:
    //             [start, end, step] = [arguments[0], arguments[1], arguments[2]];
    //             if ( step >= 0 ) {
    //                 [start, end] = ( end < start ) ? [end, start] : [start, end];
    //                 step = step ? step : 1;
    //             } else {
    //                 [start, end] = ( end > start ) ? [end, start] : [start, end];
    //             };
    //             break;
    //     };
    //     var result = [];
    // };

    app.tools = {
        'bump': bump,
        'objectMerge': objectMerge,
        'printObject': printObject
        'quickSort': quickSort,
        'randomRange': randomRange
        'stringToIntArray': stringToIntArray,
        'universalCounter': universalCounter,
        'weedOut': weedOut,
    };

})(App);
// Подключить стороннюю библиотеку для юнит тестирования.
// Написать несколько тестов для функции, рассчитывающей y = 1/x + sqrt(x).
var f = ( x ) => {
    return ( typeof x === 'number' && x >= 0 ) ? 1 / x + Math.sqrt(x) : NaN;
};



describe("f(x) = 1/x + sqrt(x)", function(){
    var testList = [
        {
            input: 0,
            expectedResult: Infinity
        },
        {
            input: 1,
            expectedResult: 2
        },
        {
            input: 4,
            expectedResult: 2.25
        },
        {
            input: 100,
            expectedResult: 10.01
        },
        {
            input: -1,
            expectedResult: NaN
        },
        {
            input: 0.01,
            expectedResult: 100.1
        },
        {
            input: 9,
            expectedResult: 3.1111111111111111111111
        }
    ];



    it( `f(${ testList[0].input }). ожидается ${ testList[0].expectedResult }.`, function() {
        console.log(testList[0]);
        expect( f( testList[0].input ) ).toBe( testList[0].expectedResult );
    });

    it( `f(${ testList[1].input }). ожидается ${ testList[1].expectedResult }.`, function() {
        console.log(testList[1]);
        expect( f( testList[1].input ) ).toBe( testList[1].expectedResult );
    });

    it( `f(${ testList[2].input }). ожидается ${ testList[2].expectedResult }.`, function() {
        console.log(testList[2]);
        expect( f( testList[2].input ) ).toBe( testList[2].expectedResult );
    });

    it( `f(${ testList[3].input }). ожидается ${ testList[3].expectedResult }.`, function() {
        console.log(testList[3]);
        expect( f( testList[3].input ) ).toBe( testList[3].expectedResult );
    });

    it( `f(${ testList[4].input }). ожидается ${ testList[4].expectedResult }.`, function() {
        console.log(testList[4]);
        expect( f( testList[4].input ) ).toEqual( testList[4].expectedResult );
    });

    it( `f(${ testList[5].input }). ожидается ${ testList[5].expectedResult }.`, function() {
        console.log(testList[5]);
        expect( f( testList[5].input ) ).toBe( testList[5].expectedResult );
    });

    it( `f(${ testList[6].input }). ожидается ${ testList[6].expectedResult }.`, function() {
        console.log(testList[6]);
        expect( f( testList[6].input ) ).toBe( testList[6].expectedResult );
    });



});


var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe('Parsing', function () {
        it('wrong format in fact line should throw exception', function () {
            var failDB = ['varon(juan).', "varon(pepe"];
            expect(() => interpreter.parseDB(failDB))
            .to.throw('Error parsing line 1: Not a rule or fact, please check the formatting!');
        });

        it('wrong format in rule line should throw exception', function () {
            var failDB = ['varon(juan).', "hija(X, Y) :- mujer(X), padre(Y,."];
            expect(() => interpreter.parseDB(failDB))
            .to.throw('Error parsing line 1: Not a rule or fact, please check the formatting!');
        });

        it('wrong format in query should throw exception', function () {
            expect(() => interpreter.checkQuery('varon(juan'))
            .to.throw('Error parsing query: please check the formatting!');
        });
    });

    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

        it('padre(roberto, maria) should be false', function () {
            assert(interpreter.checkQuery('padre(roberto, maria)') === false);
        });

        // TODO: Add more tests

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)'));
        });

        // TODO: Add more tests

    });


});



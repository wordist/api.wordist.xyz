'use strict';

const Lab = require('lab');
const Code = require('code');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const should = require('should');

const server = require('../server');

describe('Example Server', () => {
    it('GET /docs', (done) => {
        server.inject('/docs', (res) => {
            expect(res.statusCode).to.equal(200);
            done();
        })
    });

    it('GET /junk', (done) => {
        server.inject('/junk', (res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.result).to.deep.equal({statusCode: 404, error: 'Not Found'});
            done();
        })
    });

    describe('/users endpoints', () => {
        describe('GET /users', () => {
            it('handle naked request', (done) => {
                server.inject('/users', (res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.result[0]).to.deep.equal({id: 1, name: 'Vishnu'});
                    expect(res.result[1]).to.deep.equal({id: 2, name: 'Vasanth'});
                    done();
                })
            });

            it('handle request with param name', (done) => {
                server.inject('/users?name=Vasanth', (res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.result[0]).to.deep.equal({id: 2, name: 'Vasanth'});
                    expect(res.result).to.have.length(1);
                    done();
                })
            });


        });

        function testFor(id, value, callback) {
            server.inject('/users/' + id, (res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal(value);
                callback();
            })
        }

        it('GET /users/x', (done) => {
            testFor(1, {id: 1, name: 'Vishnu'}, () => {
                testFor(2, {id: 2, name: 'Vasanth'}, done)
            })
        });

        describe('POST /users', () => {
            it('handle correct input', (done) => {
                server.inject({url: '/users', method: 'POST', payload: {name: 'Vinoth'}}, (res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.headers.location).to.equal('/users/4');
                    expect(res.result).to.deep.equal({id: 4, name: 'Vinoth'});
                    testFor(4, {id: 4, name: 'Vinoth'}, done);
                });
            });
            
            it('reject wrong input', (done) => {
                server.inject({url: '/users', method: 'POST', payload: 'THIS IS JUNK'}, (res) => {
                    expect(res.statusCode).to.equal(400);
                    expect(res.result).to.deep.equal({
                        'statusCode': 400,
                        'error': 'Bad Request',
                        'message': 'Invalid request payload JSON format'
                    });
                    done();
                });
            });


        });

    });


});

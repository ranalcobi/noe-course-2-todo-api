const request = require('supertest');
const expect = require('expect');
const { ObjectID } = require('mongodb');

var { app } = require('./../server');
var { Todo } = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo"
    }, {
        _id: new ObjectID(),
        text: "Second test todo"
    }];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
    }).then(() => done())
})

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done('error on posting /todos')
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done()
                }).catch((e) => done(e))
            })
    });

    it('Should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done('error on posting /todos')
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done()
                }).catch((e) => done(e))
            })
    })
});

describe('GET /todos', () => {

    it('Should get all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })

})


describe('GET /todos:id', () => {

    it('Should return todo doc', (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
        .get(`/todos/${id.toHexString()}`)
        .expect(404)
        .end(done)
    })

    it('should return 404 if id is not valid', (done) => {
        request(app)
        .get(`/todos/${'aaa111'}`)
        .expect(404)
        .end(done)
    })
})
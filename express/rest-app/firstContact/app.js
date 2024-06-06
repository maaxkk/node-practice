const express = require('express');
const apicache = require('apicache')

const cache = apicache.middleware;
const app = express();

app.use(cache('5 minutes'))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// existing users
const users = [{email: 'abc@foo.com'}]

// employees data in a database
const employees = [
    {firstName: 'Jane', lastName: 'Smith', age: 20},
    {firstName: 'John', lastName: 'Smith', age: 30},
    {firstName: 'Mary', lastName: 'Green', age: 50},
]

// filter, pagination(is not done here)
app.get('/employees', (req, res) => {
    const {firstName, lastName, age} = req.query;
    let results = [...employees];
    if (firstName) {
        results = results.filter(emp => emp.firstName === firstName)
    }
    if (lastName) {
        results = results.filter(emp => emp.lastName === lastName)
    }
    if (age) {
        results = results.filter(emp => +emp.age === +age)
    }
    res.json(results);
});

// versioning

app.get('/v1/employees', (req, res) => {
    const results = [...employees];
    res.json(results)
})

app.get('/v2/employees', (req, res) => {
    const results = [...employees];
    results.forEach(emp => emp.age += 10)
    res.json({results, msg: 'Employees in 10 years'})
})


// CREATE = POST, READ = GET, UPDATE = PUT, DELETE = DELETE
app.get('/articles', (req, res) => {
    const articles = ['1 article'];
    // code to retrieve article
    res.json(articles);
});

// Nesting objects in route, use only noun because request type is already verb
app.get('/articles/:articleId/comments', (req, res) => {
    const {articleId} = req.params;
    const comments = ['1 comment'];
    // code to get comments by articleId
    res.json(comments);
})

app.post('/articles', (req, res) => {
    // code to add new article
    res.json(req.body);
});

app.post('/users', (req, res) => {
    const {email} = req.body;
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({error: 'User already exists'})
    }
    res.json(req.body);
})

app.put('/articles/:id', (req, res) => {
    const {id} = req.params;
    // code to update an article
    res.json(req.body);
});

app.post('/articles/:id', (req, res) => {
    const {id} = req.params;
    // code to delete an article
    res.json({deleted: id});
});

app.listen(3000, () => console.log('site is here http://localhost:3000 ;)'))
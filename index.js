const Joi = require('joi')
const { JSend } = require('jsend-express')
const express = require('express');
const base = require('./payloads/response')
const app = express();

const jSend = new JSend({ name: 'rule-validation-app', version: '1.0.0', release: 'snapshot' })

app.use(jSend.middleware.bind(jSend));

app.use(express.json());

console.log(base);

const courses = [
    {id:1, name : 'course1'},
    {id:2, name : 'course2'},
    {id:3, name : 'course3'}
]

app.get('/', (req,res, next)=>{
    const data = {data : base.base };
    res.success( {data :base.base}) 
    // res.send(base.base);
})

app.get('/api/courses', (req,res)=>{
    res.send([1,2,3]);
})

app.post('/api/courses',(req,res)=>{
    const schema = {
        name : Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error){

        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id : courses.length +1,
        name : req.body.name
    }

    courses.push(course)
    res.send(course);
});

app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send(`the course with the given ID ${id} was not found`);
    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}...`));
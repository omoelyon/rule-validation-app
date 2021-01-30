const Joi = require('joi')
const { JSend } = require('jsend-express')
const express = require('express');
const base = require('./payloads/response')
const app = express();

const jSend = new JSend({ name: 'rule-validation-app', version: '1.0.0'})

app.use(jSend.middleware.bind(jSend));

app.use(express.json());
const status = 201
    const message = 'example'
    // const data = { example: 'example response success' }
    // res.success({ status, data, message })





app.get('/', (req,res, next)=>{
    const data = base.base ;
    res.success( { status, data, message }); 
    // res.send(base.base);
})


app.post('/validate-rule',(req,res)=>{
  let {rule, data} = req.body;
    const schema = {
      data : Joi.required(),
        rule : Joi.object().keys({
          field : Joi.required(),
          condition : Joi.string().required(),
          condition_value : Joi.required()
      }) 
        
    };

    const requestBodyValidation = Joi.validate(req.body, schema);
    
    if(requestBodyValidation.error){
      res.status("error").send(requestBodyValidation.error.details[0].message);
      return;
  }
   //function to verify if field is an object, array or string
   const verifyFieldType = (field)=>{
    return typeof field === "object" || typeof field === "string";
  }
  if(!verifyFieldType(data)){
    res.status(400).send("data field should be of type string or object or array");
    return;
}
  

  const validateFieldConditions = (condition, fieldValue, condition_value)=>{   

    switch(condition) {
      case "eq":
        return fieldValue == condition_value;
        break;
      case "neq":
        console.log("not equal values");
        return fieldValue != condition_value;
        break;
      case "gt":
        console.log("greater values");
        return fieldValue > condition_value;
          break;
      case "gte":
        console.log("greater and equal values");
        return fieldValue >= condition_value;
            break;
      case "contains":
        console.log("containing values");
            return fieldValue.includes(condition_value);
            break;
      default:
        return false;
    }

  }
  let dataField = data;

    if(typeof data=== 'object' && !Array.isArray(data)){
      if(rule.field.split(".").length <2){
        const nest =  rule.field.split(".")
      dataField = data[nest[0]]  
      } else if(rule.field.split(".").length ===2){
        const nest =  rule.field.split(".")
        dataField = data[nest[0]][nest[1]]  
      }
    }
    else  {
      dataField = data
    } 
      
    
  if(!validateFieldConditions(rule.condition, dataField, rule.condition_value)){
    res.status(400).send("check your validation");
    return;
  }



    
   
       data = {rule, data };

    // courses.push(course)
    res.success( { status:200, data, message });
});



const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}...`));
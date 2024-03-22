import { signinSchema } from "../modules/auth/auth.validation.js";

const validation = (schema) => {
return (req, res, next)=>{
    const validationResult = signinSchema.validate(req.body, {abortEarly:false});
   if(validationResult.error){
       return res.json({message: 'validation error' ,error: validationResult.error});
   }
   next();
}
}
export default validation;
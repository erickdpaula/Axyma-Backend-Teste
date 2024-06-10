import { postSchema } from '../../models/post-schema.js'
import express from 'express'

export const BodyValidation = {

    post(req, res, next){
        const { error } = postSchema.validate(req.body)

        if(error){
            res.send({
                message: error.details[0].message
            })
        }else{
            next()
        }
    }
}
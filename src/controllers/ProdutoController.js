import express from 'express'
import { addProduto, getProdutos } from '../../database.js'

export default class ProdutoController{

    create (req, res) {
        const body = req.body

        try{
            const produto = addProduto(body)
            res.status(200).send(produto)
        }catch(erro){
            res.status(500).send(erro.stack)
        }
    }

    async readAll (req, res) {
        try{
            const produtos = await getProdutos()
            res.status(200).send(produtos)
        }catch(erro){
            res.status(500).send(erro)
        }
    }

}
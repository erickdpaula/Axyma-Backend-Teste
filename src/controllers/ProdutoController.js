import express from 'express'
import { addProduto, getProdutoEspecifico, getProdutos } from '../repositories/database.js'

export default class ProdutoController{

    create (req, res) {
        const body = req.body

        try{
            const produto = addProduto(body)
            res.status(200).send(produto)
        }catch(erro){
            res.status(500).send(erro)
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

    async readId (req, res) {
        const id = req.params.id
        try{
            const produto = await getProdutoEspecifico(id)
            res.status(200).send(produto)
        }catch(erro){
            res.status(500).send(erro)
        }
    }

}
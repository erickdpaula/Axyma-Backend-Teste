import express from 'express'
import { postProduto, getProdutos, getProdutoEspecifico } from '../database.js'
import { Produto } from './models/Produto.js'

const app = express()
app.use(express.json())

app.post('/create', (req, res) => {
    const produto = new Produto(req.body)

    postProduto(produto)
    res.send(produto)

})

app.get('/read', async (req, res) => {
    await getProdutos()
        .then((produtos) => {
            if(!produtos){
                res.send("SEM PRODUTOS CADASTRADOS !")
            }else{
                res.send(produtos)
            }
        })
})

app.get('/read/:id', async (req, res) => {
    await getProdutoEspecifico(req.params.id)
        .then((produto) => {
            if(!produto){
                res.status(404).send("---- Produto nao encontrado ----")
            }else{
                res.status(200).send(produto)
            }
        })
        .catch(erro => {
            console.log(erro)
        })
})

app.listen(3000, () => {
    console.log("Server running at port 3000")
})


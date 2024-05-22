import express from 'express'
import { addProduto, getProdutos, getProdutoEspecifico, updateProduto, deleteProduto } from '../database.js'
import { Produto } from './models/Produto.js'

const app = express()

app.use(express.json())

app.post('/create', (req, res) => {
    const produto = new Produto(req.body)

    addProduto(produto)
    res.send(produto)

})

app.get('/read', async (req, res) => {
    await getProdutos()
        .then((produtos) => {
            if(!produtos){
                res.send("Nao ha produtos cadastrados !")
            }else{
                res.send(produtos)
            }
        })
})

app.get('/read/:id', async (req, res) => {
    await getProdutoEspecifico(req.params.id)
        .then((produto) => {
            res.send(produto)
        })
        .catch(erro => {
            console.log(erro)
        })
})

app.put('/update/:id', async (req, res) => {
    let produtoRef

    await updateProduto(req.params.id, req.body)
        .catch(erro => {
            res.json(erro)
        })

    await getProdutoEspecifico(req.params.id)
        .then((produto) => {
            res.send(produto)
        })
        .catch(erro => {
            console.log(erro)
        })
})


app.listen(3000, () => {
    console.log("Server running at port 3000")
})


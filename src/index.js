import express from 'express'
import { addProduto, getProdutos, getProdutoEspecifico, updateProduto, deleteProduto } from '../database.js'

const app = express()

app.use(express.json())

app.post('/create', (req, res) => {
    const body = req.body

    try{
        const produto = addProduto(body)
        if(produto.status == 200){
            res.status(produto.status).send(produto.produto)
        }else{
            res.status(produto.status).send(produto.mensagem)
        }
    }catch(erro){
        res.status(500).send(erro)
    }

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

app.delete('/delete/:id', async (req, res) => {
    await deleteProduto(req.params.id)
        .then(() => {
            res.status(200).send("Produto excluido !")
        })
        .catch(erro => {
            console.log(erro)
        })
})

app.listen(3000, () => {
    console.log("Server running at port 3000")
})


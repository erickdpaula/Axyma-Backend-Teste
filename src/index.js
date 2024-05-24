import express from 'express'
import { addProduto, getProdutos, getProdutoEspecifico, updateProduto, deleteProduto } from '../database.js'

const app = express()

app.use(express.json())

app.post('/create', (req, res) => {
    const body = req.body

    try{
        const produto = addProduto(body)
        if(produto.status == 201){
            res.status(produto.status).send(produto.produto)
        }else{
            res.status(produto.status).send(produto.mensagem)
        }
    }catch(erro){
        res.status(500).send(erro.stack)
    }

})

app.get('/read', async (req, res) => {
    await getProdutos()
        .then((produtos) => {
            if(produtos == false){
                res.status(200).send("Nao há produtos cadastrados")
            }else{
                res.status(200).send(produtos)
            }
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
})

app.get('/read/:id', async (req, res) => {
    await getProdutoEspecifico(req.params.id)
        .then((produto) => {
            if(typeof(produto) != 'object'){
                res.status(404).send(produto)
            }else{
                res.status(200).send(produto)
            }
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
})

app.put('/update/:id', async (req, res) => {

    // Impede que o usuario modifique o ID do produto
    const hasID = new Object(req.body).hasOwnProperty('id')
    if(hasID){
        res.status(400).send("Nao é possível modificar o ID do produto")
    }else{

        await getProdutoEspecifico(req.params.id)
            .then(snapshot => {
                if(typeof(snapshot) != 'object'){
                    res.status(404).send(snapshot)
                }else if(!hasID){

                    updateProduto(req.params.id, req.body)
                        .then(()=>{
                            res.status(200).send(snapshot)
                        })
                        .catch(erro => {
                            res.status(500).send(erro)
                        })
                }else{
                    res.status(400).send("O ID do Produto nao pode ser modificado")
                }
            })
            .catch(erro => {
                res.status(500).send(erro)
            })
    
    }  


})

app.delete('/delete/:id', async (req, res) => {

    await getProdutoEspecifico(req.params.id)
        .then(produto => {
            if(typeof(produto) != 'object'){
                res.status(404).send(produto)
            }else{
                deleteProduto(req.params.id)
                    .then(() => {
                        res.status(200).json({
                            mensagem: "Produto deletado com sucesso."
                        })
                    })
                    .catch(erro => {
                        res.status(500).send(erro)
                    })
            }
        })
        .catch(erro => {
            res.status(500).send(erro)
        })

})

app.listen(3000, () => {
    console.log("Server running at port 3000")
})


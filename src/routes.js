import { Router } from 'express'
import ProdutoController from './controllers/ProdutoController.js'

const routes = Router()

routes.post('/create', new ProdutoController().create)

routes.get('/read', new ProdutoController().readAll)

routes.get('/read/:id', async (req, res) => {
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

routes.put('/update/:id', async (req, res) => {

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

routes.delete('/delete/:id', async (req, res) => {

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
                        res.status(500).json(erro)
                    })
            }
        })
        .catch(erro => {
            res.status(500).json(erro)
        })

})

export default routes
import Joi from 'joi'

const Schema = Joi.object({
    nome: Joi.string()
            .required(),
    descricao: Joi.string()
            .required(),
    preco: Joi.number()
            .positive()
            .precision(2),
    quantidadeEmEstoque: Joi.number()
                            .integer()
                            .positive()
})

export default Schema
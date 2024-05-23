
export const ValidarProduto = (produto) => {

    if(!produto.id){
        return {
            isValid: false,
            status: 400,
            mensagem: "Produto deve conter um ID"
        }
    }

    if(!produto.descricao){
        return {
            isValid: false,
            status: 400, 
            mensagem: "Produto deve conter uma Descricao"
        }
    }

    if(!produto.nome){
        return {
            isValid: false,
            status: 400, 
            mensagem: "Produto deve conter um Nome"
        }
    }

    if(produto.preco < 0){
        return {
            isValid: false,
            status: 400,
            mensagem: "Preco deve ser maior que zero"
        }
    }
    if(typeof(produto.preco) != 'number'){
        return {
            isValid: false,
            status: 400,
            mensagem: "Preco deve ser um numero"
        }
    }
    if(!Number.isInteger(produto.quantidadeEmEstoque)){
        return {
            isValid: false,
            status: 400,
            mensagem: "Quantidade deve ser um numero Inteiro"
        }
    }
    if(produto.quantidadeEmEstoque < 0){
        return {
            isValid: false,
            status: 400,
            mensagem: "Quantidade nao pode ser negativa"
        }
    }

    return {
        isValid: true
    }
}
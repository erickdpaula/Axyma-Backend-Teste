import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, push, update, remove } from "firebase/database";
import { ValidarProduto } from './src/helpers/validar-produto.js'
import { Produto } from './src/models/Produto.js';

const firebaseConfig = {
  apiKey: "AIzaSyAHoVHEUpK3yvzfLWiGliYLlPK2j_8Buwg",
  authDomain: "axyma-produtos.firebaseapp.com",
  databaseURL: "https://axyma-produtos-default-rtdb.firebaseio.com/",
  projectId: "axyma-produtos",
  storageBucket: "axyma-produtos.appspot.com",
  messagingSenderId: "467444104545",
  appId: "1:467444104545:web:22690af70a58f756f65920"
};

// Inicializa o Firebase 
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const databaseRef = ref(db, 'produtos/')

export const addProduto = (body) => {
  const listaProdutosRef = push(databaseRef)
  let produto
  
  produto = {
    id: listaProdutosRef.key,
    ...body
  }
  const validacao = ValidarProduto(produto)

  if(!validacao.isValid){

    return validacao

  }else{
    
    set(listaProdutosRef, produto)
    .catch(erro => {
      validacao = {
        status: 500,
        mensagem: erro
      }
      return validacao

    })
    return {
      status: 201,
      produto
    }
  }
}

export const getProdutos = async () => {

  let produtos
  
  await get(databaseRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        produtos = snapshot.val()
      }
    }).catch((error) => {
      console.error(error);
    });

    return (produtos) ? produtos : false
}

export const getProdutoEspecifico = async (id) => {
  let produto

  await get((ref(db, `produtos/${id}`)))
    .then(snapshot => {
      if(snapshot.exists()){
        produto = snapshot.val()
      }else{
        produto = "Produto nao encontrado"
      }
    })
    .catch(erro => {
      console.log(erro)
    })

    return produto
}

export const updateProduto = async (id, produto) => {
  try{
    update(ref(db, `produtos/${id}`), produto)
        .catch(erro => {
          console.log(erro)
        })
  }catch(erro){
    return erro
  }
  

  }
  
export const deleteProduto = async (id) => {
    await remove(ref(db, `produtos/${id}`))
      .catch(erro => {
        return erro
      })
}
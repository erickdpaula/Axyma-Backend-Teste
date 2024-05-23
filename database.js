import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, push, update, remove, child } from "firebase/database";
import { ValidarProduto } from './validacao.js'

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
const listaProdRef = push(databaseRef)

export const addProduto = (produto) => {

  produto = {
    id: listaProdRef.key,
    ...produto
  }

  const validacao = ValidarProduto(produto)

  if(!validacao.isValid){

    console.log(validacao)
    return validacao

  }else{
    
    set(listaProdRef, produto)
    .catch(erro => {
      validacao = {
        status: 500,
        mensagem: erro
      }
      return validacao

    })
    return {
      status: 200,
      produto
    }
  }
}


export const getProdutos = async () => {

  let listaProdutos
  
  await get(child(ref(db, '/'), 'produtos/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        listaProdutos = snapshot.val()
      }
    }).catch((error) => {
      console.error(error);
    });

    return (listaProdutos) ? listaProdutos : false
}

export const getProdutoEspecifico = async (id) => {
  let produto

  await get((ref(db, `produtos/${id}`)))
    .then(snapshot => {
      if(snapshot.exists()){
        produto = snapshot.val()
      }else{
        produto = "--- Produto nao existe ---"
      }
    })
    .catch(erro => {
      console.log(erro)
    })

    return produto
}

export const updateProduto = async (id, produto) => {
  update(ref(db, `produtos/${id}`), produto)
    .catch(erro => {
      console.log(erro)
    })
  }
  
export const deleteProduto = async (id) => {
  
  await remove(ref(db, `produtos/${id}`))
    .catch(erro => {
      console.log(erro)
    })
}
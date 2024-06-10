import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, push, update, remove } from "firebase/database";

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
export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const databaseRef = ref(db, 'produtos/')

export const addProduto = (body) => {
  const listaProdutosRef = push(databaseRef)
  let produto

  produto = {
    id: listaProdutosRef.key,
    ...body
  }
  
  set(listaProdutosRef, produto)

  return produto
}

export const getProdutos = async () => {

  let response
  
  await get(databaseRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        response = Object.values(snapshot.val())
      }else{
        response = { mensagem: "Não há produtos cadastrados" }
      }
    }).catch((error) => {
      response = { mensagem: error }
    });
    
    return response
}

export const getProdutoEspecifico = async (id) => {
  let response

  await get((ref(db, `produtos/${id}`)))
    .then(snapshot => {
      if(snapshot.exists()){
        response = Object.values(snapshot.val())
      }else{
        response = { mensagem: "Produto nao encontrado" }
      }
    })
    .catch(erro => {
      response = { mensagem: erro }
    })

    return response
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
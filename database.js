import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, push, onValue, child, update } from "firebase/database";

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

export const postProduto = (produto) => {
  produto.id = listaProdRef.key

  set(listaProdRef, produto)
    .catch(erro => {
      return erro
    })

  return produto
}

export const getProdutos = async () => {

  let listaProdutos
  
  await get(databaseRef)
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
  
  await get(child(db, `produtos/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        return "Produto nao existe!"
      }
    }).catch((error) => {
      console.error(error)
    })
}

export const updateProduto = (produto) => {
  produto.id = novaListaProdutos.key

  update(novaListaProdutos, produto)
    .catch(erro => {
      return erro
    })

  return produto
}
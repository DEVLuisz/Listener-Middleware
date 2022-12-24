import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import  {  adicionarTodasCategorias, addOneCategorie, carregarUmaCategoria, carregarCategorias } from "store/reducers/categorias"
import createTasks from "store/Middlewares/Utils/createTasks";

export const categoriaListener = createListenerMiddleware();

categoriaListener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe}) => {
    const resposta = await createTasks({
      fork,
      dispatch,
      action: adicionarTodasCategorias,
      busca: categoriasService.buscar,
      loadingText: 'Carregando categorias',
      sucessText: 'Categorias carregadas com sucesso',
      errorText: 'Erro na busca de categorias'
    });
    if( resposta.status === 'ok') {
      unsubscribe();
    }
  }
});

categoriaListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch,unsubscribe, getState }) => {
    const { categorias } = getState();
    const nomeCategoria = action.payload;
    const categoriaCarregada = categorias.some(categoria => categoria.id === nomeCategoria);

    if(categoriaCarregada) return;
    if(categorias.length === 5) return unsubscribe();

    await createTasks({
      fork,
      dispatch,
      action: addOneCategorie,
      busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
      loadingText: `Carregando categoria: ${nomeCategoria}`,
      sucessText: `Categoria ${nomeCategoria} carregada com sucesso`,
      errorText: `Erro na busca da categoria: ${nomeCategoria}`
    });
  }
})
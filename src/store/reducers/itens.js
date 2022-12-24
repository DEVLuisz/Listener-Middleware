import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itensService from 'services/itens';
import { v4 as uuid } from 'uuid';

const initialState = [];

export const buscarItens = createAsyncThunk(
  'itens/buscar',
  itensService.buscar
)

const itensSlice = createSlice({
  name: 'itens',
  initialState : [],
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state = state.map(item => {
        if(item.id === payload) item.favorito = !item.favorito;
        return item;
      })
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    changeItem: ( state, { payload}) => {
      const index = state.findIndex(item => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deleteItem: (state, { payload} ) => {
      const index = state.findIndex(item => item.id === payload);
      state.splice(index, 1);
    },
    adicionarItens: (state, {payload} ) => {
      state.push(...payload);
    }
  }, 
  extraReducers: builder => {
    builder
    .addCase(buscarItens.fulfilled,
      (state, { payload }) => {
        return payload;
      }
      )
      .addCase(
        buscarItens.pending,
        (state, { payload }) =>{
          console.log(' itens pendente')
        }
      )
      .addCase(
        buscarItens.rejected,
        (state, { payload }) =>{
          console.log('itens rejeitado')
        }
      )
  }
});

export const { mudarFavorito, cadastrarItem, changeItem, deleteItem, adicionarItens } = itensSlice.actions;

export default itensSlice.reducer;
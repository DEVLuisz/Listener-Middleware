import Header from "components/Header";
import styles from './Anuncie.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "components/Button/Button";
import { cadastrarItem } from "store/reducers/itens";
import { useParams } from "react-router-dom";
import Input from "components/Input/Input";
import { useEffect } from "react";
import { carregarUmaCategoria, carregarCategorias } from "store/reducers/categorias";

export default function Anuncie() {
    const { nomeCategoria = ''} = useParams();
    const dispatch = useDispatch();
    const categorias = useSelector(state => state.categorias.map(({ nome, id}) => ({ nome, id })));
    const { register, handleSubmit } = useForm( {
        defaultValues: {
            categoria: nomeCategoria
        }
});

    function cadastrar(data) {
        dispatch(cadastrarItem(data))
    }

    useEffect(() => {
        dispatch(nomeCategoria ? carregarUmaCategoria(nomeCategoria) : carregarCategorias)
    },[dispatch, nomeCategoria] )

    return (
        <div className={styles.container}>
            <Header 
            titulo='Anuncie Aqui!'
            descricao='Anuncie seu produto no melhor site do Brasil!'
            />
            <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
                <Input {...register('titulo', {required: true})}
                placeholder="Nome do produto" alt="nome do produto" />
                <Input
                {...register('descricao', {required: true})}
                placeholder="Descrição do produto"
                alt="Descrição do produto" />
                <Input
                {...register('foto', {required: true})}
                placeholder="URL da imagem do produto"
                alt="URL da imagem do produto" />
                <select 
                {...register('categoria', {required: true})}
                disabled={nomeCategoria}
                >
                    <option value='' disabled>
                        Selecione a categoria
                    </option>
                    {categorias.map(categoria =>
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>)}
                </select>
                <Input
                {...register('preco', {required: true, valueAsNumber: true})}
                type="number"
                placeholder="Preço do Produto" />
                <Button type='submit'>
                    Cadastrar Produto
                </Button>
                
            </form>

        </div>
    )
};

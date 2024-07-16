import PropTypes from 'prop-types';
import style from './style.module.scss';

const CardRecipe = ({ recipe, onEdit, onDelete }) => {
    return (
        <div className={style.card}>
            <div className={style.header}>
                <h3 className={style.title}>{recipe.name}</h3>
                <div className={style.actions}>
                    <button className={style.editBtn} onClick={() => onEdit(recipe)}>Editar</button>
                    <button className={style.deleteBtn} onClick={() => onDelete(recipe.id)}>Deletar</button>
                </div>
            </div>
            <p className={style.description}>{recipe.description}</p>
            <div className={style.details}>
                <span className={style.category}>Categoria: {recipe.category? recipe.category.name : "Sem categoria"}</span>
                <span className={style.price}>Preço: R${recipe.price.toFixed(2)}</span>
            </div>
        </div>
    );
};

CardRecipe.propTypes = {
    recipe: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string
        }).isRequired 
    }).isRequired
};

export default CardRecipe;

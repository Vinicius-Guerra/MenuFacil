import PropTypes from 'prop-types';
import style from './style.module.scss';

export const CardRecipePublic = ({ recipe }) => {
    return (
        <div className={style.card}>
            <h3 className={style.title}>{recipe.name}</h3>
            <p className={style.description}>{recipe.description}</p>
            <div className={style.details}>
                <span className={style.category}>Categoria: {recipe.category ? recipe.category.name : "Sem categoria"}</span>
                <span className={style.price}>Valor: R${recipe.price.toFixed(2)}</span>
            </div>
        </div>
    )
}

CardRecipePublic.propTypes = {
    recipe: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired
};
import style from './style.module.scss';

export const SupportModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay}>
            <div className={style.modal}>
                <h2>Suporte - Menu Fácil</h2>
                <h3>Precisa de ajuda?</h3>
                <p>Entre em contato agora mesmo com o time do MenuFácil através do</p>
                <p>WhatsApp - <strong>(81) 98182-9801</strong> ou clique no botão abaixo:</p>
                <div className={style.buttons}>
                    <a href="https://wa.me/5581981829801" target="_blank"  rel="noopener noreferrer" className={style.supportLink}>
                        Falar com suporte!
                    </a>
                    <a className={style.close} onClick={onClose}>Fechar</a>
                </div>
            </div>
        </div>
    );
}
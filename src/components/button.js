import "../App.css"

const Button = (props) => {
    return (
        <button
            className={`modal-ok-btn ${props.btnColor}`}
            onClick={props.onHide}
        >
            {props.btnContent}
        </button>
    )
}

export default Button;
import styles from "./Card.module.css"
const Card=({cardTitle,money,color,buttonTitle,handleClick})=>{
    return(
        <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                {`${cardTitle}: `}
                <span className={color==="green" ? styles.success : styles.failure}>
                    {`₹${money}`}
                </span>
            </h3>
           
            <button className={color === "green" ? styles.buttonSuccess : styles.buttonFailure}
              style={{ backgroundColor: color === "green" ? "green" : "red" }}
              onClick={handleClick}
            >+ {buttonTitle}</button>
        </div>
    )
}

export default Card
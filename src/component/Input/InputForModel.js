import styles from "./InputForModel.module.css"
const InputForModel=({type,placeholder})=>{
    return (
        <div>
            <input type={type} placeholder={placeholder} className={styles.input}></input>
            
        </div>
    )
}

export default InputForModel
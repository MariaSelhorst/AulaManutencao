import style from "./Card.module.css"
/* eslint-disable react/prop-types */
export const Card = (props) => {

  return(

      <div className={style["wrap-card-product"]}>
          <h1>{props.name}</h1>
          <h2>{props.desc}</h2>
          <p>{props.value}</p>
          <p>{props.status}</p>
          <p>{props.category}</p>
          {props.status? <p>🟢</p>: <p>🔴</p>}
          <img src={props.image} alt={props.name} width={150} height={"auto"}/>
      </div>
  )
}
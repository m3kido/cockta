import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id}=useParams()
  const [loading,setLoading]=React.useState(false)
  const [cock,setCock]=React.useState(null)

  

  React.useEffect(()=>{
    if(id==="55"){
      
      setCock({name:"7amoud",image
      :"https://images.deliveryhero.io/image/talabat/menuitems/blob_637627946293026208"
      ,info:"7amoud 7amoud 7amoud habibi ",category:"swag",instructions:"buy it only 120 da"
       ,glass:"كاس البيرة",ingredients:["swag","sawg"]})
       return
       
    }
    
   setLoading(true)
   async function getCock (){
     try{
       const response = await fetch(`${url}${id}`)
       const data = await response.json()
       if(data.drinks){
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0]
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]
        const newCocktail = {
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients,
        }
        setCock(newCocktail)
       }else{
         setCock(null)
       }
       setLoading(false)
     }catch(err){
       console.log(err)
       setLoading(false)
     }
   }
   getCock()
   
  },[id])
  
  if(loading){
    return <Loading />
  }
  if(!cock){
    return <h2 className='section-title'>broken website i know</h2>
  }
  const {name,image,category,info,glass,instructions,ingredients}=cock
  return (
    <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name}></img>
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name :</span> {name}
            </p>
            <p>
              <span className='drink-data'>category :</span> {category}
            </p>
            <p>
              <span className='drink-data'>info :</span> {info}
            </p>
            <p>
              <span className='drink-data'>glass :</span> {glass}
            </p>
            <p>
              <span className='drink-data'>instructons :</span> {instructions}
            </p>
            <p>
              <span className='drink-data'>ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index} className='cc'> {item}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
  )
}

export default SingleCocktail

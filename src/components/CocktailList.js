import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {cock,loading}=useGlobalContext()

  if(loading){
    return <Loading />
  }
  if(cock.length<1){
    return <h2 className='section-title'> no cocks for u</h2>
  }
  return (
    <section className='section'>
      <h2 className='section-title'>
        cocktails
      </h2>
      <div className='cocktails-center'>
        {cock.map((item)=>{
          return <Cocktail key={item.id} {...item}/>
        })}
      </div>
    </section>
  )
}

export default CocktailList

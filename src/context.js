import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'



const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoading]=useState(true)
  const [searchTerm,setSearchTerm]=useState("a")
  const [cock,setCock]=useState([])

  const makea = (id,name,image,info,glass)=>{
    return{id,name,image,info,glass}

  }

  
  const fetchDrinks=useCallback( async()=>{
    setLoading(true)
    try{
     const response=await fetch(`${url}${searchTerm}`)
     const data = await response.json()
     const {drinks} = data
     if(drinks){
       const newCock = drinks.map((item)=>{
         const {idDrink,strDrink,strDrinkThumb,strAlcoholic,strGlass}=item
         return{id:idDrink,name:strDrink,image:strDrinkThumb,info:strAlcoholic
        ,glass:strGlass}

       })
       setCock([{id:55,name:"7amoud",image
       :"https://images.deliveryhero.io/image/talabat/menuitems/blob_637627946293026208"
       ,info:"7amoud 7amoud 7amoud habibi "
        ,glass:"كاس البيرة"},makea(22,"piss","https://i.imgur.com/bkrcuHB.jpeg","حلال","cup"),...newCock])

     }else{
       setCock([])
     }
     setLoading(false)


    }catch(err){
      console.log(err)
      setLoading(false)
    }
  },[searchTerm])
  useEffect(()=>{
    fetchDrinks()
  },[searchTerm])
  return <AppContext.Provider value={{
    loading,cock,setSearchTerm
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

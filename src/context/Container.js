import { useEffect, useState } from 'react'
import { MyContext } from './MyContext'

const Container = (props) => {
    const [records, setRecords] = useState([])
    const [cart, setCart] = useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/records")
        .then(res => res.json())
        .then(result =>{
            console.log(result)
            setRecords(result)
        })
       
    },[])
  return (
    <MyContext.Provider value={{records, setRecords, cart, setCart}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default Container
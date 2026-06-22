import axios from 'axios'
import React, { useEffect, useReducer } from 'react'

function Reducer() {


    const STAGES = { FETCH_START: "fetch_start", FETCH_SUCCESSFULL: "fetch_successfull", FETCH_FAILED: "fetch_failed" }

    const initialState = {
        isLoading: false,
        users: [],
        err: null
    }


    function reducer(state, action) {


        switch (action.type) {

            case STAGES.FETCH_START: return { ...state, isLoading: true }

            case STAGES.FETCH_SUCCESSFULL: return { ...state, isLoading: false, users: action.payload }

            case STAGES.FETCH_FAILED: return { ...state, isLoading: false, err: action.payload }

            default: return state
        }



    }

    const [state, dispatch] = useReducer(reducer, initialState)

    async function getUsers() {


        dispatch({ type: STAGES.FETCH_START })


        try {


            const users = await axios.get(`https://dmyjson.com/users`)
            const userData = users.data.users
            console.log(userData, 'user data')

            dispatch({ type: STAGES.FETCH_SUCCESSFULL, payload: userData })




        } catch (err) {
            console.log(err, 'err')

            dispatch({ type: STAGES.FETCH_FAILED, payload: "Failed to load users" })
        }
    }


    useEffect(() => {
        getUsers()
    }, [])


    console.log(state, 'state value')








    const allProducts = [{id:1, name: "phone", price: 90000 }, {id:2, name: "watch", price: 20000 }]


    const initialCartItems = {
        products: [],
        totalPrice: 0
    }

    function cartItemReducer(state , action){

        switch(action.type){
            case "AddItem" : return {...state, products : [...state.products, action.payload],totalPrice : state.totalPrice + action.payload.price  }

            default : return state
        }
    }

    const [cartItemState,cartItemDispatch] = useReducer(cartItemReducer,initialCartItems)

    return (
        <div className='flex gap-5'>

            {allProducts.map((product) => {
                return <div>

                    <div className='border h-19 w-19'>
                        {product.name} : {product.price}
                    </div>

                    <button onClick={()=>{cartItemDispatch({type : "AddItem", payload : product})}} className='border bg-blue-500 text-white cursor-pointer'>Add to cart</button>


                </div>
            })}


            <p>Total cart item price : {cartItemState.totalPrice} </p>
        </div>
    )
}

export default Reducer


/*


const initialState = {...}

// Will get called when dispatch is called
function reducer(state,action){


    // Whatever reducer returns that will be updated value for state
}




const [state,dispatch] = useReducer(reducer,initialState)


// use dispatch({}) and pass action object as arguement

*/


/* 

1. Create a reducer for cart items
2. Initial state is  {
 totalItems : [{name : "watch", price : 5000}],
 totalPrice : 5000
 }
*/
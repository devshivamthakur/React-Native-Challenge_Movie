const initialstate = {
    movie_data: [],
    movieinfo: {},
    logedinuser: {},
}

const Reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'FETCH_MOVIE_DATA':
            return { ...state, movie_data: action.payload }
        case 'FETCH_MOVIE_INFO':
            return { ...state, movieinfo: action.payload }
        case 'LOGIN':
            return { ...state, logedinuser: action.payload }
        case 'LOGOUT':
            return { 
                ...state,
                logedinuser: {},
                
             }    
        default:
            return state
    }
}
export default Reducer;
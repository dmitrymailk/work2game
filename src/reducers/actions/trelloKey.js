
// экспортирую модель юзера
let initialKey = {
  key: '107e9af5f22a3e8404258ceaa9950710'
}; 
export default function trelloKey( state = initialKey, action){
  if(action.type === 'ADD_KEY'){
    return{
      section: action.payload
    }
    }
  return state;
  }
  

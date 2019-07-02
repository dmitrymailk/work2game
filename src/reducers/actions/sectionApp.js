
// экспортирую модель юзера
let initialSection = {
  section: 0
}; 
export default function sectionApp( state = initialSection, action){
  if(action.type === 'ADD_SECTION'){
    return{
      section: action.payload
    }
    }
  return state;
  }
  

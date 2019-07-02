
// экспортирую модель юзера
let initialSection = {
 event_1: true,
 event_2: true
}; 
export default function achieveEvent( state = initialSection, action){
  if(action.type === 'EVE_SECTION'){
    initialSection[action.payload] = false;
    return initialSection
    }
  return state;
  }
  

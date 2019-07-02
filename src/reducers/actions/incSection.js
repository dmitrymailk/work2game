
// экспортирую модель юзера
let initialSection = {
  profile: 0,
  chats: 0,
  tasks: 0,
  relax: 0,
  shop: 0,
  game: 0
}; 
export default function sectionApp( state = initialSection, action){
  if(action.type === 'INC_SECTION'){
    initialSection[action.payload]++;
    return initialSection
    }
  return state;
  }
  

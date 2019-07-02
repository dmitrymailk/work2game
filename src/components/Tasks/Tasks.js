import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
import './Tasks__css/Tasks__style.css';
import TasksBoards from "./Tasks__boards";
import TasksListCards from './Tasks__ListCards';


const icon = "http://web-citizen.ru/game-is-work/api__v_2/icons/trello.svg",
      icon2 = "http://web-citizen.ru/game-is-work/api__v_2/icons/jira.svg",
      icon3 = "http://web-citizen.ru/game-is-work/api__v_2/icons/img-board.png",
      icon4 = "http://web-citizen.ru/game-is-work/api__v_2/icons/group.svg",
      icon5 = "http://web-citizen.ru/game-is-work/api__v_2/icons/trello-member.png",
      // icon6 = "http://web-citizen.ru/game-is-work/api__v_2/icons/clockwise-rotation.svg",
      // icon7 = "http://web-citizen.ru/game-is-work/api__v_2/icons/view.svg",
      // icon8 = "http://web-citizen.ru/game-is-work/api__v_2/icons/clock.svg",
      // icon9 = "http://web-citizen.ru/game-is-work/api__v_2/icons/profile.svg",
      // icon10 = "http://web-citizen.ru/game-is-work/api__v_2/icons/package.svg",
      // icon11 = "http://web-citizen.ru/game-is-work/api__v_2/icons/stock-photo2.png",
      icon12 = "http://web-citizen.ru/game-is-work/api__v_2/icons/left-arrow__black.svg";

class Tasks extends Component {
  constructor(){
    super()
    this.connectTrello = this.connectTrello.bind(this)
    this.getTrelloBoards = this.getTrelloBoards.bind(this)
    this.showRecentCards = this.showRecentCards.bind(this)
    this.showIdOrganisations = this.showIdOrganisations.bind(this)
    this.setState = this.setState.bind(this)
    this.showCardsList = this.showCardsList.bind(this)
    this.getTrelloCardLists = this.getTrelloCardLists.bind(this)
    this.cardListsCards = this.cardListsCards.bind(this)
    this.returnToBoards = this.returnToBoards.bind(this)
    this.state = {
      cards : [],
      sortCards: [],
      organisations: [],
      organInfo: [],
      showBoardList: false,
      cardLists: [],
      cardListsCards: [],
      update: () => {console.log('UPDATE');},
    }
  }


  componentDidMount(){
    this.connectTrello()
  }

  componentWillMount(){
    this.props.incSection('tasks')
  }
  // componentDidMount(){
  //   this.showUniqueSection()
  // }

  connectTrello(){

    let apiKey = '107e9af5f22a3e8404258ceaa9950710';
    let url = `https://trello.com/1/authorize?expiration=30days&name=MyPersonalToken&scope=read&response_type=token&key=${apiKey}`;

    const opts = {
      type: 'popup',
      name: 'Trello Sandbox',
      interactive: true,
      scope: { read: true, write: true, account: false },
      expiration: '30days',
      persist: true,
      // success: () => console.log(123),
      // error: authFailure,
    };

    let authorizeTrello = async () => {
      let response =  await fetch(url);
      let data = await response;
      await console.log('response',data);

      await window.Trello.authorize(opts);
      await console.log('window.Trello', window.Trello);
      await this.getTrelloBoards()
      await this.showRecentCards()
      await this.showIdOrganisations()
    }

    authorizeTrello()
  
  }

  async getTrelloBoards(){
    let setCards = (items) =>{
      console.log(items, 'доски пришли');
      this.setState({
        cards: items
      })
    }
    async function cards(){
      await getAllCards()
    };
    
    async function getAllCards(){
      await window.Trello.get('/member/me/boards?fields=all', setCards)
      
    }

    await cards()  
    
  }


  async showRecentCards(){
    console.log('showRecentCards');
  let cards = this.state.cards
  let cardDate = (a, b) => {
    if( a.dateLastView < b.dateLastView) {
      return -1
    }
    else if( a.dateLastView > b.dateLastView) {
      return 1
    }
    else{
      return 0 
    }
  }
  let cardsDate = cards.sort(cardDate).reverse()
  console.log('sort card', cardsDate);
  this.setState({
    sortCards: cardsDate
  })


}

async showIdOrganisations(){
  let cards =  await this.state.cards;
  let arr =  []
  let newArr = []
  let n = 0;

  async function prepareCards(){
    // arr = await cards.filter( (item, i) => item.idOrganization != null).map(item => [item.idOrganization, [item.id]]);
    arr = await cards.map(item => [item.idOrganization, [item.id]]);
    (() => console.log(arr, 'filter'))()
    arr = await arr.sort()
    await console.log('подготовил', arr)
  }


  async function sortOrg(){
      for(let i = 0; i < arr.length - 1; i++){
        if(arr[n][0] === arr[i+1][0] ) {
          arr[n][1].push(arr[i+1][1][0])
        }
        else {
          newArr.push(arr[n])
          n = i+1
        } 
     }
    newArr.push(arr[n])
    console.log('arr', arr,'newArr', newArr,'отсртировал')
  }
 

  async function getOrg(){
    await prepareCards();
    await sortOrg();
    await getOrgInfo();
    await endSet()
  }

  let organInfo = []
  let organ = item => {
    console.log(item);
    organInfo.push(item)
  }
  
  
  async function getOrgInfo(){
    console.log('запрашиваю')
    for(let i = 0; i < newArr.length; i++){
      await window.Trello.get(`/organizations/${newArr[i][0]}`, organ )
    }
  }  

  getOrg()

  let endSet = async () =>{
    this.setState({
      organisations: newArr,
      organInfo: organInfo
    })
  }

  
}

 async showCardsList(e){
  let idBoard = e.target.dataset.idboard
  if (!this.state.showBoardList){
    await this.setState({
      showBoardList: true,
      cardListsCards: []
    })
    await this.getTrelloCardLists(idBoard)
    await this.cardListsCards()
    await console.log(this.state.cardListsCards, 'ПОСЛЕДНИЙ')
    await this.setState({
      update: () => {console.log('UPDATE');}
    })
  }
  else{

  }

  

}

async getTrelloCardLists(idBoard){
  let setLists = (items) =>{
    this.setState({
      cardLists: items
    })
  }
  async function cardLists(){
    await getCardLists()
  };
  
  async function getCardLists(){
    await window.Trello.get(`/boards/${idBoard}/lists`, setLists)
    
  }

  await cardLists()  
  
}

async cardListsCards(){
  let setCards = (items) =>{
    // console.log('cards',items);
    let cards = this.state.cardListsCards;
    cards.push(items)
    this.setState({
      cardListsCards: cards
    })
    
  }
  async function cardCards(){
    await getCardListsCards()
    
  };
  
  const getCardListsCards = async () => {
    
    for (let i = 0; i < this.state.cardLists.length; i++){
      let id = this.state.cardLists[i].id;
      await window.Trello.get(`/lists/${id}/cards`, setCards)
       
    }
  }

  await cardCards() 
}

returnToBoards(){
  this.setState({
    showBoardList: false,
  })
}


  render() {

    if(!this.state.showBoardList){
      return(
        <div className="wrapper_3">
        
          <div className="main-content__taskboardProj">
            <div className="taskboardProj-kind">
              <div className="taskboardProj-kind__item active"><img alt="" className="taskboardProj-kind__item-img" src={icon} />
                <div className="taskboardProj-kind__item-select"><span className="chats-kind__item-select-line" /><span className="chats-kind__item-select-line2" /></div>
              </div>
              <div className="taskboardProj-kind__item"><img alt="" className="taskboardProj-kind__item-img" src={icon2} /></div>
              <div className="chats-kind__add-new"><span className="add-new__line" /><span className="add-new__line2" /></div>
              <div className="taskboardProj-kind__info">
                <div className="taskboardProj-kind__info-name"><span className="taskboardProj-kind__info-name-text">Frontend</span><span className="taskboardProj-kind__info-name-divide" /></div>
                <div className="taskboardProj-kind__info-company"><span className="info-company__text">Just Work</span><img alt="" className="info-company__img" src={icon3} /><span className="taskboardProj-kind__info-company-divide" /></div>
                <div className="taskboardProj-kind__info-access"><img alt="" className="info-access__img" src={icon4} /><span className="info-access__text">Team Visibility</span><span className="taskboardProj-kind__info-access-divide" /></div>
                <div className="taskboardProj-kind__info-members"><img alt="" className="info-members__img" src={icon5} /><img alt="" className="info-members__img" src={icon5} />
                  <div className="info-members__new"><span className="info-members__new-line" /><span className="info-members__new-line2" /></div>
                </div>
              </div>
              <div className="taskboardProj-kind__menu">Menu
                <div className="taskboardProj-kind__menu-circle"><span className="taskboardProj-kind__menu-circle-1" /><span className="taskboardProj-kind__menu-circle-2" /><span className="taskboardProj-kind__menu-circle-3" /></div>
              </div>
            </div>
            
            <div className="taskboardProj-area">
              <TasksBoards 
                sortCards = {this.state.sortCards}
                cards = {this.state.cards}
                organInfo= {this.state.organInfo}
                showCardsList = {this.showCardsList} />
            </div>
          </div>
        </div>
      )
    }
    else {
      return(
        <div className="wrapper_3">
        <img className="cardListsCards__back" src={icon12} 
          onClick={this.returnToBoards}
        />
        <div className="main-content__taskboardProj">
          <div className="taskboardProj-kind">
            <div className="taskboardProj-kind__item active"><img alt="" className="taskboardProj-kind__item-img" src={icon} />
              <div className="taskboardProj-kind__item-select"><span className="chats-kind__item-select-line" /><span className="chats-kind__item-select-line2" /></div>
            </div>
            <div className="taskboardProj-kind__item"><img alt="" className="taskboardProj-kind__item-img" src={icon2} /></div>
            <div className="chats-kind__add-new"><span className="add-new__line" /><span className="add-new__line2" /></div>
            <div className="taskboardProj-kind__info">
              <div className="taskboardProj-kind__info-name"><span className="taskboardProj-kind__info-name-text">Frontend</span><span className="taskboardProj-kind__info-name-divide" /></div>
              <div className="taskboardProj-kind__info-company"><span className="info-company__text">Just Work</span><img alt="" className="info-company__img" src={icon3} /><span className="taskboardProj-kind__info-company-divide" /></div>
              <div className="taskboardProj-kind__info-access"><img alt="" className="info-access__img" src={icon4} /><span className="info-access__text">Team Visibility</span><span className="taskboardProj-kind__info-access-divide" /></div>
              <div className="taskboardProj-kind__info-members"><img alt="" className="info-members__img" src={icon5} /><img alt="" className="info-members__img" src={icon5} />
                <div className="info-members__new"><span className="info-members__new-line" /><span className="info-members__new-line2" /></div>
              </div>
            </div>
            <div className="taskboardProj-kind__menu">Menu
              <div className="taskboardProj-kind__menu-circle"><span className="taskboardProj-kind__menu-circle-1" /><span className="taskboardProj-kind__menu-circle-2" /><span className="taskboardProj-kind__menu-circle-3" /></div>
            </div>
          </div>
          
          <div className="taskboardProj-area">
            <TasksListCards 
              cardLists = { this.state.cardLists }
              cardListsCards = { this.state.cardListsCards }
              componentUpdate = {this.state.update}
               />
          </div>
        </div>
      </div>
     )
    }
         
   

    }

  }

export default connect(
  state=> ({state}),
  dispatch =>({
    incSection: (section) => // функция чтобы ее вызвать из компонента, чтобы передать в нее значение
      dispatch({type: 'INC_SECTION', payload: section})
  }))(Tasks);

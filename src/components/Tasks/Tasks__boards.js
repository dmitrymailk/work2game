import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
import './Tasks__css/Tasks__style.css';


const icon = "http://web-citizen.ru/game-is-work/api__v_2/icons/trello.svg",
      icon2 = "http://web-citizen.ru/game-is-work/api__v_2/icons/jira.svg",
      icon3 = "http://web-citizen.ru/game-is-work/api__v_2/icons/img-board.png",
      icon4 = "http://web-citizen.ru/game-is-work/api__v_2/icons/group.svg",
      icon5 = "http://web-citizen.ru/game-is-work/api__v_2/icons/trello-member.png",
      icon6 = "http://web-citizen.ru/game-is-work/api__v_2/icons/clockwise-rotation.svg",
      icon7 = "http://web-citizen.ru/game-is-work/api__v_2/icons/view.svg",
      icon8 = "http://web-citizen.ru/game-is-work/api__v_2/icons/clock.svg",
      icon9 = "http://web-citizen.ru/game-is-work/api__v_2/icons/profile.svg",
      icon10 = "http://web-citizen.ru/game-is-work/api__v_2/icons/package.svg",
      icon11 = "http://web-citizen.ru/game-is-work/api__v_2/icons/stock-photo2.png";

class TasksBoards extends Component {
  constructor(){
    super()
  }


 


  render() {
      return(
          <React.Fragment>
            <div className="taskboardProj-area__recent" >
                <div className="taskboardProj-area__recent-top"><img alt="" className="taskboardProj-area__recent-top-img" src={icon6} /><span className="taskboardProj-area__recent-top-title">Recently Viewed</span></div>
                <div className="taskboardProj-area__recent-bottom">
              
                  {
                    this.props.sortCards.filter( (item, i) => i < 3 ).map( item => {
                      return (
                        <div className="taskboardProj-area__recent-bottom-item" key={item.dateLastView + Math.floor(Math.random() * (10000 - 0 + 1)) + 0 + Math.floor(Math.random() * (1000 - 0 + 1)) + 0}
                        onClick={this.props.showCardsList}>
                          <div className="recent-bottom-item__name" data-idboard={item.id} >{item.name}</div>
                          <img alt="" className="recent-bottom-item__img" 
                          src={item.prefs.backgroundImage}
                          data-idboard={item.id} />
                        </div>
                      )
                    }
                      )
                  }
                </div>
              </div>
            <div className="taskboardProj-area__personal" >
            <div className="taskboardProj-area__personal-top"><img alt="" className="taskboardProj-area__personal-top-img" src={icon9} /><span className="taskboardProj-area__personal-top-title">Personal Boards</span></div>
            <div className="taskboardProj-area__personal-bottom">
                {
                this.props.cards.filter( (item, i) => item.idOrganization == null).map( item => {
                    return (
                    <div className="taskboardProj-area__personal-bottom-item" key={item.dateLastView + Math.floor(Math.random() * (10000 - 0 + 1)) + 0 + Math.floor(Math.random() * (1000 - 0 + 1)) + 0} 
                    onClick={this.props.showCardsList}>
                        <div className="personal-bottom-item__name" data-idboard={item.id}>
                        {item.name}
                        </div>
                        <img alt="" className="personal-bottom-item__img" 
                            src={item.prefs.backgroundImage}
                            data-idboard={item.id} />
                    </div>
                    )
                }
                    )
                }
                <div className="taskboardProj-area__personal-bottom-new">
                <span className="personal-bottom-new__line" />
                <span className="personal-bottom-new__line2" />
                </div>
            </div>
            </div>
            {
            this.props.organInfo.map( item =>{
                return(
                <div className="taskboardProj-area__unique" key={`${Date.now()}` + Math.floor(Math.random() * (10000 - 0 + 1)) + 0 + Math.floor(Math.random() * (1000 - 0 + 1)) + 0}>
                    <div className="taskboardProj-area__unique-top">
                    <img alt="" className="taskboardProj-area__unique-top-img" src={icon10} />
                    <span className="taskboardProj-area__unique-top-title" >
                        {item.displayName}
                    </span>
                    </div>
                    <div className="taskboardProj-area__unique-bottom" onClick={this.props.showCardsList}>
                    {this.props.cards
                    .filter( item2 => item2.idOrganization == item.id)
                    .map( (card, i) => {
                        return(
                        <div className="taskboardProj-area__unique-bottom-item" key={`${Date.now()}` + Math.floor(Math.random() * (10000 - 0 + 1)) + 0 + Math.floor(Math.random() * (1000 - 0 + 1)) + 0}
                            onClick={this.props.showCardsList}>
                            <div className="unique-bottom-item__name" data-idboard={card.id}>{card.name}</div>
                            <img alt="" className="unique-bottom-item__img" src={card.prefs.backgroundImage} data-idboard={card.id}/>
                        </div>
                        )
                    })
                    
                    }
                    <div className="taskboardProj-area__unique-bottom-new">
                        <span className="unique-bottom-new__line" /><span className="unique-bottom-new__line2" /></div>
                    </div>
                </div>
                )
            })
            }
          </React.Fragment>
      )
    }

  }

export default connect(
  state=> ({state}),
  dispatch =>({
    incSection: (section) => // функция чтобы ее вызвать из компонента, чтобы передать в нее значение
      dispatch({type: 'INC_SECTION', payload: section})
  }))(TasksBoards);

import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
import './Tasks__css/Tasks__style.css';
import { CLIENT_RENEG_LIMIT } from 'tls';


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

      let arr = [
          {
              name: 'name1'
          },
          {
            name: 'name1'
          },
          {
            name: 'name1'
          },
      ]

class TasksListCards extends Component {
  
 constructor(){
    super()
    this.state = {
        cardListsCards: []
    }
    this.getMonth = this.getMonth.bind(this)
 }

 componentWillReceiveProps(nextProps){
    //  if (nextProps.length !== this.props.cardListsCards.length || true){
         this.setState({
            cardListsCards: this.props.cardListsCards
         })
    //      console.log('Hello from lists', this.props.cardListsCards);
    //  }
 }

 getMonth(month) {
     switch(month){
         case 0: 
             return 'Jan'
         case 1: 
            return 'Feb'
         case 2: 
            return 'Mar'
         case 3: 
            return 'Apr'
         case 4: 
            return 'May'
         case 5: 
            return 'Jun'
         case 6: 
            return 'Jul'
         case 7: 
            return 'Aug'
         case 8: 
            return 'Sep'
         case 9: 
            return 'Oct'
         case 10: 
            return 'Nov'
         case 11: 
            return 'Dec'

         
     }

 }


  render() {
      return(
        <React.Fragment>
             <div className="taskboardProj-area__card-lists">  
               
          {
            this.props.cardLists.map( (item, i) => {
             
                  
                return(
                <div className="taskboardProj-area__card-lists-list" key={Math.floor(Math.random() * (10000 - 0 + 1)) + 0 + Math.floor(Math.random() * (1000 - 0 + 1)) + 0}>
                    <div className="card-lists-list__title">{item.name}</div>
                    <div className="card-lists-list__menu">
                    <span className="card-lists-list__menu-1" />
                    <span className="card-lists-list__menu-2" />
                    <span className="card-lists-list__menu-3" /></div>
                    {
                        this.state.cardListsCards.map( (item2, i2) => {
                            
                            if( i == i2) { 
                                {/* let a = item2;
                                console.log('item2 ', a) */}
                                return(
                                item2.map(item3 => {
                                    return(
                                    <div className="card-lists-list__card" key={i2 + Date.now() + Math.floor(Math.random() * (10000 - 0 + 1)) + 0 + Math.floor(Math.random() * (1000 - 0 + 1)) + 0}>
                                        <div className="card-lists-list__card-name">{item3.name}</div>
                                        <div className="card-lists-list__card-icons">
                                            <img alt="" className="card-lists-list__card-icons-visible" src={icon7} />
                                            <div className="card-lists-list__card-icons-deadline">
                                            <img alt="" className="card-icons-deadline__img" src={icon8} />
                                            <span className="card-icons-deadline__date">
                                                {`${this.getMonth(new Date (parseInt(Date.parse(item3.due)) ).getUTCMonth()) || '' } ` || ''} 
                                                
                                                {new Date (parseInt(Date.parse(item3.due)) ).getUTCDate() || ''}
                                            </span>
                                        </div>

                                        <div className="card-lists-list__card-icons-desc">
                                            <span className="card-lists-list__card-icons-desc-1" />
                                            <span className="card-lists-list__card-icons-desc-1" />
                                            <span className="card-lists-list__card-icons-desc-1" />
                                            <span className="card-lists-list__card-icons-desc-2" />
                                        </div>

                                        </div>
                                    </div>
                                )
                                })
                                )
                                
                            }
                            
                        }) 
                    }  
                
                </div>
                )
              
              
            })
          }

          
          
          
          
          <div className="taskboardProj-area__card-lists-new">
            <div className="card-lists-new__add"><span className="card-lists-new__add-1" /><span className="card-lists-new__add-2" /></div>
            <div className="card-lists-new__text">Add another list</div>
          </div>
          
        </div>
     
        </React.Fragment>
      )
    }

  }

export default connect(
 
  )(TasksListCards);

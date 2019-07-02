import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
// import './Relax__css/Relax__style.sass'

const icon = "http://web-citizen.ru/game-is-work/api__v_2/icons/menu-relax.svg",
      icon3 = "http://web-citizen.ru/game-is-work/api__v_2/icons/gamepad-controller.svg",
      icon2 = 'http://web-citizen.ru/game-is-work/api__v_2/icons/fullscreen.svg';


let sections = [
  {
    name: 'Relax',
    img: 'https://pp.userapi.com/c851228/v851228237/d844f/M3e4KeNaQL4.jpg',
    id: 'relax',
  },
  {
    name: 'Game 1',
    img: 'http://web-citizen.ru/game-is-work/api__v_2/icons/back_game.png',
    id: 'game',
  },
]
class Relax__componentsKinds extends Component {
  constructor(){
    super()
    this.state = {
      fullscreen: 0
    }

    // this.changeBackground = this.changeBackground.bind(this)
    // this.makeFullscreen = this.makeFullscreen.bind(this)
  }


  render() {
         
    return(
     
        <div className="main-content__relax-kinds">
          <div className="relax-kinds__title">
            <img alt="" className="relax-kinds__title-img" src={icon3} />
            <span className="relax-kinds__title-text">Something Games</span>
          </div>
          <div className="relax-kinds-bottom">

          {
            sections.map( item => {
              return (
                <div className="relax-kinds-bottom__item" 
                key={item.name}
                onClick={this.props.chooseCurrentSection}
                data-id={item.id}
                >
                  <div className="relax-kinds-bottom__item-name" data-id={item.id} >{item.name}</div>
                  <img alt="" className="relax-kinds-bottom__item-img" 
                    src={item.img} 
                    data-id={item.id}  
                    />
                </div>
              )
            })
          }
            


          </div>
        </div>
      
     
    )

    }

  }

export default connect(
  state=> ({state}),
  dispatch =>({}))(Relax__componentsKinds);

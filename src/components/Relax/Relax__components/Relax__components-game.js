import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
// import './Relax__css/Relax__style.sass'

const icon = "http://web-citizen.ru/game-is-work/api__v_2/icons/menu-relax.svg",
      icon2 = 'http://web-citizen.ru/game-is-work/api__v_2/icons/fullscreen.svg',
      icon3 = 'http://web-citizen.ru/game-is-work/api__v_2/icons/left-arrow__white.svg';

class Relax__componentsGame extends Component {
  constructor(){
    super()
    this.state = {
      fullscreen: 0
    }

    // this.changeBackground = this.changeBackground.bind(this)
    // this.makeFullscreen = this.makeFullscreen.bind(this)
  }

  componentWillMount(){
    this.props.incSection('game')
  }


  render() {
         
    return(
    
        <div className="main-content__game-canvas">
          <iframe className="game-canvas__iframe" src="https://playcanv.as/p/yBU3C4Oo/" frameborder="0" X-Frame-Options="*"></iframe>
          <img className="game-canvas__fullscreen"src={icon2} alt="" srcset="" onClick={this.props.makeFullscreen}/>
          <img className="game-canvas__back"src={icon3} data-id="kinds" onClick={this.props.chooseCurrentSection}/>
        </div>
      

    )

    }

  }

export default connect(
  state=> ({state}),
  dispatch =>({
    incSection: (section) => // функция чтобы ее вызвать из компонента, чтобы передать в нее значение
      dispatch({type: 'INC_SECTION', payload: section})
  }))(Relax__componentsGame);

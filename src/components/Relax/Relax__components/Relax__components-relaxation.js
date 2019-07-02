import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
// import './Relax__css/Relax__style.sass'

const icon = "http://web-citizen.ru/game-is-work/api__v_2/icons/menu-relax.svg",
      icon2 = 'http://web-citizen.ru/game-is-work/api__v_2/icons/fullscreen.svg',
      icon3 = 'http://web-citizen.ru/game-is-work/api__v_2/icons/left-arrow__white.svg',
      icon4 = 'http://web-citizen.ru/game-is-work/api__v_2/icons/speaker.svg'


const quotations = [
  {
    id: 1,
    text: `When you do not know how to handle yourself, where is the need to produce another life`
  },
  {
    id: 2,
    text: `Our greatest glory is not in never falling, but in rising every time we fall. — Confucius`
  },
  {
    id: 3,
    text: `All our dreams can come true, if we have the courage to pursue them. – Walt Disney`
  },
  {
    id: 4,
    text: `It does not matter how slowly you go as long as you do not stop. – Confucius`
  },
  {
    id: 5,
    text: `Everything you’ve ever wanted is on the other side of fear. — George Addair`
  },
  {
    id: 6,
    text: `Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill`
  },
  {
    id: 7,
    text: `Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis`
  },
  {
    id: 8,
    text: `Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine. ― Roy T. Bennett`
  },

]
class Relax__componentsRelaxation extends Component {
  constructor(){
    super()
    this.state = {
      fullscreen: 0,
      currentQuotation: quotations[Math.floor(Math.random() * (7 - 0 + 1)) + 0]
    }

    this.changeBackground = this.changeBackground.bind(this)
    this.changeSound = this.changeSound.bind(this)
    this.changeQuotes = this.changeQuotes.bind(this)
  }

  changeBackground(){
    let num = Math.floor(Math.random() * (2 - 0 + 1)) + 0
    let backBlock = document.querySelector('video');
    let imgBack = 'http://web-citizen.ru/game-is-work/api__v_2/video/video1.mp4'
    if(num == 0){
      imgBack = 'http://web-citizen.ru/game-is-work/api__v_2/video/video3.mp4'
    }
    else if( num == 1){
      imgBack = 'http://web-citizen.ru/game-is-work/api__v_2/video/video2.mp4'
    }
    backBlock.src = imgBack
  }

  changeSound(){
    let video = document.querySelector('.video-relax');
    let lineSound = document.querySelector('.relaxation__sound-line')
    if(lineSound.style.display == 'flex'){
      lineSound.style.display = 'none'
      video.volume = 1
    }
    else{
      lineSound.style.display = 'flex'
      video.volume = 0
    }
    
  }

  changeQuotes(){
    let number = getRandomInRange(0, 7)
    function getRandomInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.setState({
      currentQuotation: quotations[number]
    })
  }

  render() {
         
    return(
        <div className="main-content__relaxation" >
          <div className="video-relax-wrapper" >
           <video className="video-relax" volume="0" src="http://web-citizen.ru/game-is-work/api__v_2/video/video1.mp4" autoPlay={true} loop={true}></video>
          </div>
          <div className="relaxation__overlay" />
              <div className="relaxation__title">Meditation and Relax</div>
              <div className="relaxation__quotation" onClick={this.changeQuotes}>
                <span>
                  {
                    this.state.currentQuotation.text
                  }
                </span>
              </div>
              <img className="relaxation__menu" src={icon}  onClick={this.changeBackground} alt=""/>
              <img className="relaxation__fullscreen"src={icon2}  onClick={this.props.makeFullscreen} alt=""/>
              <img className="relaxation__back" src={icon3} data-id="kinds" onClick={this.props.chooseCurrentSection} alt=""/>
              <div className="relaxation__sound-wrapper" onClick={this.changeSound}>
                <img className="relaxation__sound" src={icon4} alt=""/>
                <span className="relaxation__sound-line" />
              </div>
              
          </div>
    )

    }

  }

export default connect(
  state=> ({state}),
  dispatch =>({}))(Relax__componentsRelaxation);

import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
import './Relax__css/Relax__style.css'
import Relaxation from './Relax__components/Relax__components-relaxation'
import Game from './Relax__components/Relax__components-game'
import Kinds from './Relax__components/Relax__components-kinds'



class Relax extends Component {
  constructor(){
    super()
    this.state = {
      fullscreen: 0,
      currentSection: 'kinds'
    }

    // this.changeBackground = this.changeBackground.bind(this)
    this.makeFullscreen = this.makeFullscreen.bind(this)
    this.showCurrentSection = this.showCurrentSection.bind(this)
    this.chooseCurrentSection = this.chooseCurrentSection.bind(this)
  }

  componentWillMount(){
    this.props.incSection('relax')
  }

  makeFullscreen(e){

    let targetClass = e.target.className
    let item = null;

    if(targetClass.includes('relax')){
      item = document.querySelector('.main-content__relaxation').style;
    }
    else if(targetClass.includes('game')){
      item = document.querySelector('.main-content__game-canvas').style;
    }
    else{
      return ''
    }
     

      let style = {
        height: '100%',
        width: '100%',
        top: '0',
        left: '0'
      }

      let style2 = {
        height: 'calc(100% - 64px)',
        width: 'calc(100% - 64px)',
        top: '64px',
        left: '64px'
      }

    if(!this.state.fullscreen){
      document.querySelector('.app').requestFullscreen()
      Object.assign(item, style)
      this.setState({
        fullscreen: 1
      })
    }
    else{
      document.webkitCancelFullScreen()
      Object.assign(item, style2)
      this.setState({
        fullscreen: 0
      })
    }
  }

  chooseCurrentSection(e){
    console.log('click')
    document.webkitCancelFullScreen()
    let  item = e.target.dataset.id;
    this.setState({
      currentSection: item
    })
  }


  showCurrentSection(){
    let sections = {
      'relax': <Relaxation chooseCurrentSection={this.chooseCurrentSection}
                           makeFullscreen={this.makeFullscreen} />,
      'game': <Game makeFullscreen={this.makeFullscreen}
                    chooseCurrentSection={this.chooseCurrentSection} />,
      'kinds': <Kinds chooseCurrentSection={this.chooseCurrentSection}/>
    }
    if(this.state.currentSection){
      return sections[this.state.currentSection]
    }
    else{
      return ''
    }
    
  }

  render() {
         
    return(
      <div className="wrapper_4">
      
      
        {this.showCurrentSection()}
      
      </div>
    )

    }

  }

export default connect(
  state=> ({state}),
  dispatch =>({
    incSection: (section) => // функция чтобы ее вызвать из компонента, чтобы передать в нее значение
      dispatch({type: 'INC_SECTION', payload: section})
  }))(Relax);

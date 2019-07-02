import React, { Component } from 'react';
import './ReceiveAchieve__css/ReceiveAchieve_css-style.css';
import { connect } from 'react-redux';
import { store } from '../../store/index';



class ReceiveAchieve extends Component {
  constructor(){
    super()
    this.state = {
      achieve_1: store.getState().incSection,
    }
    this.showReceivedAchieve = this.showReceivedAchieve.bind(this)
    this.returnBlockAchieve = this.returnBlockAchieve.bind(this)
    this.getAchieve_1 = this.getAchieve_1.bind(this)
    this.hideBlock = this.hideBlock.bind(this)
  }

  hideBlock(){
    this.setState({
      id: 0
    })
  }

  showReceivedAchieve(){
    
      if (this.getAchieve_1().first && store.getState().achieveEvent.event_1) {
          let item = this.getAchieve_1()
          let achieve = this.returnBlockAchieve(item.name, item.text, item.img)
          this.props.achieveEvent('event_1')
          return achieve
      }
      else if (this.getAchieve_2().first && store.getState().achieveEvent.event_2){
        let item = this.getAchieve_2()
        let achieve = this.returnBlockAchieve(item.name, item.text, item.img)
        this.props.achieveEvent('event_2')
        return achieve
      }
      else{
        return ''
      }

  }

  getAchieve_1(){
    let count = this.state.achieve_1
    let condition = count.chats > 0 && count.profile > 0 && count.relax > 0 && count.shop > 0 && count.tasks > 0 || false
    if(condition){
      
      return (
        {
          name: 'Исследователь',
          text: 'Открой все разделы приложения',
          img: 'http://web-citizen.ru/game-is-work/api__v_2/achievements/open_all_sections.svg',
          first: true
        }
      )
    }
    else{
      return {first: false}
    }
  }

  getAchieve_2(){
    let count = this.state.achieve_1
    let condition = count.game > 0 || false
    if(condition){
      console.log('ИГРА');
      return (
        {
          name: 'Игроман',
          text: 'Запусти первый раз игру в нашем приложении ',
          first: true,
          img: 'http://web-citizen.ru/game-is-work/api__v_2/achievements/open_game_first.svg'
        }
      )
    }
    else{
      return {first: false}
    }
  }

  returnBlockAchieve(name, text, img){
    return(
      <div className="app__receive-achieve" onClick={this.hideBlock}>
        <div className="app__receive-achieve-img">
            <img src={img} />
        </div>
        <div className="app__receive-achieve-info">
        <span className="receive-achieve-info__title">{name}</span>
        <span className="receive-achieve-info__desc">{text}</span>
        </div>
      </div>
    )
  }

  render() {
         
    return (
      this.showReceivedAchieve()
    )

    }

  }

export default connect(
  state=> ({state}),
  dispatch =>({
    achieveEvent: (section) => // функция чтобы ее вызвать из компонента, чтобы передать в нее значение
      dispatch({type: 'EVE_SECTION', payload: section})
  }))(ReceiveAchieve);

import React from 'react'
const plane = 'http://web-citizen.ru/game-is-work/api/items/send-plane__blue.svg';

class SendMessageForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        if(e.keyCode === 13 || e.target.className === "input chats-right__bottom-send-plane"){
            this.props.sendMessage(this.state.message)
            this.setState({
                message: ''
        })
        }
    }
    
    render() {
        return (

            <div className="chats-right__bottom-send">
                <img className="chats-right__bottom-send-file" src={this.props.img} alt=""/>
                <input className="chats-right__bottom-send-input" 
                    onSubmit={this.handleSubmit}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    onKeyDown={this.handleSubmit}
                /><img className="input chats-right__bottom-send-plane" 
                       src={this.props.img2}
                       onClick={this.handleSubmit}
                        alt=""/>
              </div>
        )
    }
}





export default SendMessageForm
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
        if(e.keyCode === 13 || e.target.className === "send"){
            this.props.sendMessage(this.state.message)
            this.setState({
                message: ''
        })
        }
    }
    
    render() {
        return (
            <div class="private-chat__input-message">

                <input class="input-message__input" type="text"
                onSubmit={this.handleSubmit}
                disabled={this.props.disabled}
                onChange={this.handleChange}
                value={this.state.message}
                onKeyDown={this.handleSubmit}
                />

                <div className="input-message__img send" onClick={this.handleSubmit}>
                    <img  className="send" src={plane} alt="" />
                </div>

            </div>
        )
    }
}





export default SendMessageForm
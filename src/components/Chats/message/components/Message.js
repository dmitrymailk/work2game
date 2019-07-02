import React from 'react'
const styleUsername = {
    position: 'absolute',
    left: 0,
    top: 0,
}
class Message extends React.Component {  
    render(){
        return (
            <div class="message-area__receive-section">
    
                <div class="message-area__receive-mess-section">
                <div className="receive-mess__username-section" style={styleUsername}>
                <b>{this.props.username}</b>
                </div>
                <span class="receive-mess__text-section">
                {this.props.text}
                </span>
    
                <div className="receive-mess__img-section">
                    <img src="img/icons/receive-arrow.svg" alt="" />
                </div>
                </div>
    
            </div>
        )
    }
    
}



export default Message
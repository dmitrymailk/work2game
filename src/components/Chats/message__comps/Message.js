import React from 'react'
const styleUsername = {
    position: 'absolute',
    left: 0,
    top: 0,
}
class Message extends React.Component {  
    render(){
        return (
            <div className="chats-right__bottom-item">
                  <img className="chats-right__bottom-item-img" src={this.props.img} alt=""/>
                  <div className="chats-right__bottom-item-text">
                    <div className="bottom-item-text__triangle" />
                    <div className="bottom-item-text__name">
                        {this.props.username}
                    </div>
                    <div className="bottom-item-text__message">
                        {this.props.text}
                    </div>
                  </div>
                </div>


        )
    }
    
}



export default Message
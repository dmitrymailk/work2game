import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'


const styleStartScreen = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: '600',
    textAlign: 'center'
}
class MessageList extends React.Component {
    
    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list-section" style={styleStartScreen}>
                    <div className="join-room-section">
                    &#8592; Join a room! 
                    </div>
                </div>
            )
        }
        return (
            <div className="messages-body__private-chat-section">
                <div class="private-chat__person-section">
                        <div class="private-chat__person-img">
                            <img 
                            src="http://web-citizen.ru/game-is-work/api/items/Sloy_1.png" alt="" srcset=""/>
                        </div>
                        <div class="private-chat__person-info-section">
                            <span class="name-person-section">
                                # {this.props.currentRoomName} 
                            </span>
                        </div>
                    </div>
              
               <div className="private-chat__message-area-section" >
                    {this.props.messages.map((message, index) => {
                        return (
                            // senderId - name of user
                            // message.text - text message
                            <Message key={message.id} username={message.senderId} text={message.text} />
                        )
                    })}
                </div>
                {this.props.sendMessageForm}
            </div>
        )
    }
}



export default MessageList
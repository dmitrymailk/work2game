import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import '../../../style/ChatStyle.css'


import { tokenUrl, instanceLocator } from './config';
import { store } from '../../../store';

class App extends React.Component {
    
    constructor() {
        super()
        this.state = {
            roomId: null, // комната в которой находится юзер
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            currentUser: {},
            currentRoomName: ''
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
    } 
    
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({ // создание модели юзера и подключение его к апи
            instanceLocator,
            userId: store.getState().userModel.email || 'test',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        
        chatManager.connect() // получение обьекта currentUser в котором содержатся все методы и свойства подлюченного юзера
        .then(currentUser => {
            this.setState({
                currentUser: currentUser
            });
            this.getRooms()
        })
        .catch(err => console.log('error on connecting: ', err))
    }
    
    getRooms() {
        this.state.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({ 
                joinableRooms,
                joinedRooms: this.state.currentUser.rooms // все комнаты которые доступны юзеру изначально
            })
            
        })
        .catch(err => console.log('error on joinableRooms: ', err))
    }
    
    subscribeToRoom = (roomId, roomName) => { // выбор комнаты и изменение текущего id комнаты
        this.setState({ messages: [] })
        this.state.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => { // получение каждого сообщения поотдельности 
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
                
            }
        })
        .then(room => { // изменяем id комнаты при нажатии на нее в компоненте roomList 
            this.setState({
                roomId: room.id
            })
            this.getRooms()
            
        })
        .catch(err => console.log('error on subscribing to room: ', err))
        this.changeCurrentRoomName(roomName)
    }
    
    sendMessage(text) { // отправка сообщения устанавливаем текст послания и саму комнату куда происходит отправка
        this.state.currentUser.sendMessage({
            text: text,
            roomId: this.state.roomId,
        })
    }
    
    createRoom(name) {
        this.state.currentUser.createRoom({
            name
        })
        .then(room => {
            this.subscribeToRoom(room.id)
        })
        .catch(err => console.log('error with createRoom: ', err))
    }

    changeCurrentRoomName = (roomName) => {
        this.setState({
            currentRoomName: roomName
        })
    }
    
    render() {
        return (
            <div className="area-content__messages-section" >

                <div className="area-content__messages-title-section">
                    Messages
                </div>
                <div className="area-content__messages-body-section" >
                    
                    <RoomList
                        subscribeToRoom={this.subscribeToRoom}
                        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                        roomId={this.state.roomId} 
                        
                        />

                    <MessageList 
                        roomId={this.state.roomId}
                        messages={this.state.messages} 
                        currentRoomName={this.state.currentRoomName}
                        sendMessageForm={
                            <SendMessageForm
                            disabled={!this.state.roomId}
                            sendMessage={this.sendMessage} />
                        }
                        />
                </div>
            </div>
        
        );
    }
}

export default App
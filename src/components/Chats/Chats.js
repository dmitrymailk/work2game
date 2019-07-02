import React, { Component } from "react";
// import './style/normalize.css';
import { connect } from "react-redux";
import "./Chats__css/Chats__style.css";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator } from "./config";
import MessageList from "./message__comps/MessageList";
import SendMessageForm from "./message__comps/SendMessageForm";
import RoomList from "./message__comps/RoomList";
import Message from "./message__comps/Message";

const icon = "http://web-citizen.ru/game-is-work/api__v_2/icons/vk.svg",
  icon2 = "http://web-citizen.ru/game-is-work/api__v_2/icons/telegram.svg",
  icon3 = "http://web-citizen.ru/game-is-work/api__v_2/icons/search.svg",
  icon4 =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/user-silhouette.svg",
  icon5 = "http://web-citizen.ru/game-is-work/api__v_2/icons/group-avatar.svg",
  icon6 = "http://web-citizen.ru/game-is-work/api__v_2/icons/clip.svg",
  icon7 =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/send-plane__white.svg",
  icon8 = "http://web-citizen.ru/game-is-work/api__v_2/icons/chatkit.png";

class Chats extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null, // комната в которой находится юзер
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      currentUser: {},
      currentRoomName: 0,
      prevSection: 0
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.showChannelInfo = this.showChannelInfo.bind(this);
    this.showInputField = this.showInputField.bind(this);
    this.selectChat = this.selectChat.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      // создание модели юзера и подключение его к апи
      instanceLocator,
      userId: "test", //store.getState().userModel.email || 'test',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });
    // console.log(chatManager);

    chatManager
      .connect() // получение обьекта currentUser в котором содержатся все методы и свойства подлюченного юзера
      .then(currentUser => {
        console.log(currentUser);
        this.setState({
          currentUser: currentUser
        });
        this.getRooms();
      })
      .catch(err => console.log("error on connecting: ", err));
  }

  componentWillMount() {
    this.props.incSection("chats");
  }

  getRooms() {
    this.state.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.state.currentUser.rooms // все комнаты которые доступны юзеру изначально
        });
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  }

  subscribeToRoom = (roomId, roomName) => {
    // выбор комнаты и изменение текущего id комнаты
    this.setState({ messages: [] });
    this.state.currentUser
      .subscribeToRoomMultipart({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            // получение каждого сообщения поотдельности
            console.log(message);
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        // изменяем id комнаты при нажатии на нее в компоненте roomList
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
    this.changeCurrentRoomName(roomName);
  };

  sendMessage(text) {
    // отправка сообщения устанавливаем текст послания и саму комнату куда происходит отправка
    this.state.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    });
  }

  createRoom(name) {
    this.state.currentUser
      .createRoom({
        name
      })
      .then(room => {
        this.subscribeToRoom(room.id);
      })
      .catch(err => console.log("error with createRoom: ", err));
  }

  changeCurrentRoomName = roomName => {
    this.setState({
      currentRoomName: roomName
    });
  };

  showChannelInfo() {
    if (this.state.currentRoomName) {
      return (
        <div className="chats-right__top">
          <img className="chats-right__top-img" src={icon5} alt="" />
          <div className="chats-right__top-text">
            <span className="chats-right__top-text-name">
              {this.state.currentRoomName}
            </span>
            <span className="chats-right__top-text-count">13 members</span>
          </div>
        </div>
      );
    }
  }

  showInputField() {
    if (this.state.currentRoomName) {
      return (
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}
          img={icon6}
          img2={icon7}
        />
      );
    }
  }

  selectChat(e) {
    let elemTarget = e.target;
    let current = +elemTarget.dataset.place;
    if (current + 1) {
      let prev = this.state.prevSection;
      let chatItems = document.querySelectorAll(".chats-kind__item");

      let elem = document.createElement("div"),
        line = document.createElement("div"),
        line2 = document.createElement("div");
      elem.className = "chats-kind__item-select";
      line.className = "chats-kind__item-select-line";
      line2.className = "chats-kind__item-select-line2";
      elem.appendChild(line);
      elem.appendChild(line2);
      chatItems[prev].removeChild(
        document.querySelector(".chats-kind__item .chats-kind__item-select")
      );
      chatItems[current].appendChild(elem);

      chatItems[prev].className = "chats-kind__item";
      chatItems[current].className = "chats-kind__item active";

      this.setState({
        prevSection: current
      });
    }
  }

  render() {
    return (
      <div className="wrapper_2">
        <div className="main-content__chats">
          <div className="chats-kind" onClick={this.selectChat}>
            <div className="chats-kind__item active">
              <img
                className="chats-kind__item-img"
                src={icon}
                alt=""
                data-place="0"
              />
              <div className="chats-kind__item-count">3</div>
              <div className="chats-kind__item-select">
                <span className="chats-kind__item-select-line" />
                <span className="chats-kind__item-select-line2" />
              </div>
            </div>
            <div className="chats-kind__item">
              <img
                className="chats-kind__item-img"
                src={icon2}
                alt=""
                data-place="1"
              />
              <div className="chats-kind__item-count">1</div>
            </div>
            <div className="chats-kind__item">
              <img
                className="chats-kind__item-img"
                src={icon8}
                alt=""
                data-place="2"
              />
              <div className="chats-kind__item-count">2</div>
            </div>

            <div className="chats-kind__add-new">
              <span className="add-new__line" />
              <span className="add-new__line2" />
            </div>
          </div>
          <div className="chats-left">
            <div className="chats-left">
              <div className="chats-left__search">
                <img className="chats-left__search-img" src={icon3} alt="" />
                <input
                  className="chats-left__search-input"
                  placeholder="Search here"
                />
              </div>
              <div className="chats-left__messages">
                <RoomList
                  subscribeToRoom={this.subscribeToRoom}
                  rooms={[
                    ...this.state.joinableRooms,
                    ...this.state.joinedRooms
                  ]}
                  roomId={this.state.roomId}
                  img={icon5}
                />
              </div>
            </div>
          </div>
          <div className="chats-right">
            {this.showChannelInfo()}
            <div className="chats-right__bottom">
              <div className="chats-right__bottom-area">
                {this.state.messages.map((message, index) => {
                  return (
                    // senderId - name of user
                    // message.text - text message
                    <Message
                      key={message.id}
                      username={message.senderId}
                      text={message.parts[0].payload.content}
                      img={icon4}
                    />
                  );
                })}
              </div>

              {this.showInputField()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({
    incSection: (
      section // функция чтобы ее вызвать из компонента, чтобы передать в нее значение
    ) => dispatch({ type: "INC_SECTION", payload: section })
  })
)(Chats);

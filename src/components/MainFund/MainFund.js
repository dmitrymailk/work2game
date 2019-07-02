import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainFund__css/MainFund__style.css";
import "./MainFund__css/normalize.css";
import ReceiveAchieve from "../RecieveAchieve/ReceiveAchieve";

const icon =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/dashboard__gray.svg",
  icon2 = "http://web-citizen.ru/game-is-work/api__v_2/icons/chats__gray.svg",
  icon3 = "http://web-citizen.ru/game-is-work/api__v_2/icons/tasks__gray.svg",
  icon4 =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/gamepad-controller.svg",
  icon5 = "http://web-citizen.ru/game-is-work/api__v_2/icons/shopping-cart.svg",
  icon6 = "http://web-citizen.ru/game-is-work/api__v_2/icons/logout.svg",
  icon7 = "http://web-citizen.ru/game-is-work/api__v_2/icons/bell__gray.svg",
  icon8 = "http://web-citizen.ru/game-is-work/api__v_2/icons/tools__gray.svg";

class MainFund extends Component {
  constructor() {
    super();
    this.state = {
      currentSection: 0,
      prevSection: 0
    };
    this.indicadeCurrent = this.indicadeCurrent.bind(this);
  }

  indicadeCurrent(e) {
    let elemTarget = e.target;
    let current = +elemTarget.dataset.place;
    let prev = this.state.prevSection;
    let menuItems = document.querySelectorAll(".main-menu__item");

    let elem = document.createElement("div");
    elem.className = "main-menu__current";
    menuItems[prev].removeChild(document.querySelector(".main-menu__item div"));
    menuItems[current].appendChild(elem);

    this.setState({
      prevSection: current
    });
    this.props.selectSection(current);
  }

  insertScript() {
    let key = "107e9af5f22a3e8404258ceaa9950710";
    return "<script src=https://api.trello.com/1/client.js?key=107e9af5f22a3e8404258ceaa9950710></script>";
  }

  render() {
    return (
      <div className="app">
        <div
          className="app__main-menu"
          data-place="0"
          onClick={this.indicadeCurrent}
        >
          <div className="main-menu__switch" data-place="0">
            <div className="switch__line" data-place="0" />
            <div className="switch__line" data-place="0" />
            <div className="switch__line" data-place="0" />
          </div>
          <div className="main-menu__item" data-place="0">
            <img className="main-menu__item-img" src={icon} data-place="0" />
            <div className="main-menu__current" />
          </div>
          <div className="main-menu__item" data-place="1">
            <img className="main-menu__item-img" src={icon2} data-place="1" />
          </div>
          <div className="main-menu__item" data-place="2">
            <img className="main-menu__item-img" src={icon3} data-place="2" />
          </div>
          <div className="main-menu__item" data-place="3">
            <img className="main-menu__item-img" src={icon4} data-place="3" />
          </div>
          <div className="main-menu__item" data-place="4">
            <img className="main-menu__item-img" src={icon5} data-place="4" />
          </div>
          <div className="main-menu__item" data-place="0">
            <img className="main-menu__item-img" src={icon6} data-place="0" />
          </div>
        </div>
        <div className="app__area-content">
          <div className="app__info-bar">
            <div className="info-bar__wrapper">
              <div className="info-bar__item">
                <img src={icon7} />
              </div>
              <div className="info-bar__item">
                <img src={icon8} />
              </div>
            </div>
          </div>
          <div className="app__main-content">{this.props.component}</div>
        </div>
        <ReceiveAchieve />
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({
    selectSection: (
      section // функция чтобы ее вызвать из компонента, чтобы передать в нее значение
    ) => dispatch({ type: "ADD_SECTION", payload: section })
  })
)(MainFund);

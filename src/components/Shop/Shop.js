import React, { Component } from "react";
// import './style/normalize.css';
import { connect } from "react-redux";
import "./Shop__css/Shop__style.css";

const icon =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/shop__emirald.svg",
  icon2 = "http://web-citizen.ru/game-is-work/api__v_2/icons/shop__exp.svg",
  icon3 = "http://web-citizen.ru/game-is-work/api__v_2/icons/shop__money.svg";
// icon4 = "http://web-citizen.ru/game-is-work/api__v_2/merch/front_1__200.png",
// icon5 = "http://web-citizen.ru/game-is-work/api__v_2/merch/back_1__200.png";

const merchItems = [
  {
    typeGoods: "Merch",
    name: "T-shirt Elon",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/front_1__200.png",
    price: "3890",
    imgBack:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/back_1__200.png",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Merch",
    name: "T-shirt Forest",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/front_2__200.png",
    price: "2990",
    imgBack:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/back_2__200.png",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Merch",
    name: "T-shirt Code",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/front_3__200.png",
    price: "1670",
    imgBack:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/back_3__200.png",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Merch",
    name: "T-shirt W2G",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/front_4__200.png",
    price: "3890",
    imgBack:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/back_4__200.png",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Merch",
    name: "T-shirt Elon",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/front_1__200.png",
    price: "1670",
    imgBack:
      "http://web-citizen.ru/game-is-work/api__v_2/merch/back_1__200.png",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  }
];

const characters = [
  {
    typeGoods: "Character",
    name: "Beard Man",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/014-beard-1.svg",
    price: "3890",
    imgBack: "",
    width: 200,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Character",
    name: "Waiter",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/016-waiter.svg",
    price: "2890",
    imgBack: "",
    width: 200,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Character",
    name: "Senior Woman",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/026-old-woman.svg",
    price: "4890",
    imgBack: "",
    width: 200,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Character",
    name: "Party Man",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/041-party.svg",
    price: "1890",
    imgBack: "",
    width: 200,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  }
];

const boxes = [
  {
    typeGoods: "Box",
    name: "Simple Box",
    imgFront: "http://web-citizen.ru/game-is-work/api__v_2/boxes/case1.png",
    price: "99",
    imgBack: "",
    width: 170,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Box",
    name: "Weird Box",
    imgFront: "http://web-citizen.ru/game-is-work/api__v_2/boxes/case2.png",
    price: "199",
    imgBack: "",
    width: 170,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Box",
    name: "Ultimate Box",
    imgFront: "http://web-citizen.ru/game-is-work/api__v_2/boxes/case3.png",
    price: "399",
    imgBack: "",
    width: 170,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Box",
    name: "Legend Case",
    imgFront:
      "http://web-citizen.ru/game-is-work/api__v_2/boxes/legend_case.png",
    price: "599",
    imgBack: "",
    width: 170,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Box",
    name: "Legend Case X5",
    imgFront: "http://web-citizen.ru/game-is-work/api__v_2/boxes/za06.png",
    price: "1500",
    imgBack: "",
    width: 170,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  },
  {
    typeGoods: "Box",
    name: "Rare Case",
    imgFront: "http://web-citizen.ru/game-is-work/api__v_2/boxes/rare_case.png",
    price: "120",
    imgBack: "",
    width: 170,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis pretium nunc, in consectetur dolor viverra non. Donec maximus"
  }
];

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      actualItems: merchItems
    };

    this.chooseGoodsSection = this.chooseGoodsSection.bind(this);
  }

  componentWillMount() {
    this.props.incSection("shop");
  }

  chooseGoodsSection(e) {
    let item = e.target.className;
    let pos = +e.target.dataset.pos;
    let active = document.querySelector(".shop-goods__top-item.active");

    if (!item.includes("active")) {
      e.target.classList.add("active");
      active.classList.remove("active");
      if (pos === 0) {
        this.setState({
          actualItems: merchItems
        });
      } else if (pos === 1) {
        this.setState({
          actualItems: characters
        });
      } else if (pos === 2) {
        this.setState({
          actualItems: boxes
        });
      }
    }
  }

  render() {
    return (
      <div className="wrapper_5">
        <div className="main-content__shop">
          <div className="shop-kind">
            <div className="shop-kind__item">
              <span className="shop-kind__item-count">45</span>
              <img className="shop-kind__item-img" src={icon} alt="" />
            </div>
            <div className="shop-kind__item">
              <span className="shop-kind__item-line" />
              <span className="shop-kind__item-count">113</span>
              <img className="shop-kind__item-img" src={icon2} alt="" />
            </div>
            <div className="shop-kind__item">
              <span className="shop-kind__item-line" />
              <span className="shop-kind__item-count">9786</span>
              <img className="shop-kind__item-img" src={icon3} alt="" />
            </div>
          </div>
          <div className="shop-goods">
            <div className="shop-goods__top" onClick={this.chooseGoodsSection}>
              <div className="shop-goods__top-item active" data-pos="0">
                items
              </div>
              <div className="shop-goods__top-item" data-pos="1">
                CHARACTERS
              </div>
              <div className="shop-goods__top-item" data-pos="2">
                PACKS
              </div>
            </div>
            <div className="shop-goods__bottom">
              {this.state.actualItems.map(item => {
                return (
                  <div className="shop-goods__bottom-goods">
                    <span className="shop-goods__bottom-goods-kind">
                      {item.typeGoods}
                    </span>

                    <div className="shop-goods__bottom-goods-img">
                      <div className="bottom-goods-img__flipper">
                        <img
                          className="bottom-goods-img__flipper-front"
                          src={item.imgFront}
                          style={{ width: item.width + "px" }}
                          alt=""
                        />
                        <img
                          className="bottom-goods-img__flipper-back"
                          src={item.imgBack}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="shop-goods__bottom-goods-text">
                      <div className="bottom-goods-text__title">
                        {item.name}
                      </div>
                      <div className="bottom-goods-text__desc">{item.desc}</div>
                    </div>

                    <div className="shop-goods__bottom-goods-buy">
                      <div className="bottom-goods-buy__price">
                        {item.price}
                      </div>
                      <img
                        className="bottom-goods-buy__img"
                        src="http://web-citizen.ru/game-is-work/api__v_2/icons/shop__money.svg"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
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
)(Profile);

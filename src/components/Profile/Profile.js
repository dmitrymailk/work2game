import React, { Component } from "react";
import "./Profile__css/Profile__style.css";
import { connect } from "react-redux";
import "./Profile__css/chartist.css";
import Chartist from "chartist";

// import './chartists';

const icon3 =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/tasks__gray.svg",
  icon9 = "https://randomuser.me/api/portraits/men/32.jpg",
  icon10 = "http://web-citizen.ru/game-is-work/api__v_2/icons/star__gray.svg",
  icon11 =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/left-arrow__black.svg";

const action =
    "http://web-citizen.ru/game-is-work/api__v_2/icons/right-arrow.svg",
  action2 = "http://web-citizen.ru/game-is-work/api__v_2/icons/left-arrow.svg",
  action3 = "http://web-citizen.ru/game-is-work/api__v_2/icons/euro.svg";

// const achieve = 'http://web-citizen.ru/game-is-work/api__v_2/achievements/open_all_sections.svg',
//       achieve1 = 'http://web-citizen.ru/game-is-work/api__v_2/achievements/buy_goods_first.svg',
//       achieve2 = 'http://web-citizen.ru/game-is-work/api__v_2/achievements/open_game_first.svg';

const character =
  "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/001-boy.svg";

const achieveInfo = [
  {
    name: "Исследователь",
    text: "Открой все разделы приложения",
    id: "1",
    img:
      "http://web-citizen.ru/game-is-work/api__v_2/achievements/open_all_sections.svg"
  },
  {
    name: "Оптовик",
    text: "Купи один любой товар в первый раз",
    id: "2",
    img:
      "http://web-citizen.ru/game-is-work/api__v_2/achievements/buy_goods_first.svg"
  },
  {
    name: "Игроман",
    text: "Запусти первый раз игру в нашем приложении ",
    id: "3",
    img:
      "http://web-citizen.ru/game-is-work/api__v_2/achievements/open_game_first.svg"
  }
];

const characterInfo = [
  {
    name: "Опытный Senior",
    text: "Увеличивает набор монеток на 15%",
    id: "1",
    img:
      "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/004-old-man.svg"
  },
  {
    name: "Филантроп",
    text: "При покупке кешбек до 20%",
    id: "2",
    img:
      "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/009-handsome.svg"
  },
  {
    name: "Хороший парень",
    text: "Повышенный шанс получить что-то хорошее из лутбоксов",
    id: "3",
    img:
      "http://web-citizen.ru/game-is-work/api__v_2/characters/pack_1/001-boy.svg"
  }
];

const entries = [
  {
    date: "17 December 2019 8:10 Desktop",
    typeEvent: "Sign In",
    img: action
  },
  {
    date: "16 December 2019 18:10 Desktop",
    typeEvent: "Sign Out",
    img: action2
  }
];

const eventAccount = [
  {
    date: "16 December 2019 17:30 Desktop",
    desc:
      "Task “Make navigation” approved by Daniel Emperor. You receive 300 coins",
    img: action3
  },
  {
    date: "16 December 2019 14:20 Desktop",
    desc:
      "Task “Make Design” approved by Daniel Emperor. You receive 200 coins",
    img: action3
  }
];

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      achieve: 0,
      currentAchieve: [],
      openPopup: false,
      entries: [],
      eventAccount: [],
      actualItems: achieveInfo,
      kindItems: 0
    };

    this.showAchievements = this.showAchievements.bind(this);
    this.showAchieveInfo = this.showAchieveInfo.bind(this);
    this.filterActions = this.filterActions.bind(this);
    this.chooseAchieveSection = this.chooseAchieveSection.bind(this);
  }

  showGraphLine = () => {
    new Chartist.Line(
      ".statistics-body__top-graph",
      {
        labels: ["1 Jan", "5 Jan", "10 Jan", "15 Jan", "20 Jan", "25 Jan"],
        series: [[300, 150, 275, 225, 280, 210]]
      },
      {
        low: 50,
        high: 350,
        showArea: true,
        scaleMinSpace: 50,
        referenceValue: 50,
        divisor: 50,
        axisY: {
          onlyInteger: true,
          offset: 36,
          divisor: 50,
          labelInterpolationFnc: function(value) {
            return value + "";
          }
        }
      }
    );
  };

  componentDidUpdate() {
    this.showGraphLine();
  }
  componentDidMount() {
    this.showGraphLine();
  }

  componentWillMount() {
    this.props.incSection("profile");
  }

  showAchievements(e) {
    let close = e.target.className.includes("back");
    let item = document.querySelector(".achievements-body-wrapper").style,
      item2 = document.querySelector(".achievements-body").style,
      item3 = document.querySelector(".achievements-body-wrapper__back").style,
      item4 = document.querySelector(".app__main-content").style;

    let style = [
      {
        position: "fixed",
        top: "64px",
        width: "calc(100% - 3*64px)",
        height: "100%",
        zIndex: "1000",
        background: "#f3f7fd"
      },
      {
        position: "inherit",
        width: "auto",
        height: "auto",
        zIndex: "0"
      }
    ];

    let style2 = [
      {
        height: "100%",
        marginTop: "64px",
        width: "100%"
        // overflowY: 'scroll'
      },
      {
        marginTop: "0",
        height: "320px",
        width: "320px"
      }
    ];

    let style3 = [
      {
        display: "flex"
      },
      {
        display: "none"
      }
    ];

    let style4 = [
      {
        overflow: "hidden"
      },
      {
        overflowY: "scroll"
      }
    ];

    if (!this.state.achieve) {
      Object.assign(item, style[0]);
      Object.assign(item2, style2[0]);
      Object.assign(item3, style3[0]);
      Object.assign(item4, style4[0]);

      this.setState({
        achieve: 1
      });
    } else if (close) {
      Object.assign(item, style[1]);
      Object.assign(item2, style2[1]);
      Object.assign(item3, style3[1]);
      Object.assign(item4, style4[1]);
      if (this.state.openPopup) {
        this.showAchieveInfo();
      }
      this.setState({
        achieve: 0
      });
    }
  }

  showAchieveInfo(e) {
    if (this.state.achieve) {
      if (!this.state.openPopup && e.target.className.includes("bottom-item")) {
        console.log("open");
        let targetAchieve = e.target.dataset.id;
        let popup = document.querySelector(".achievements-body-wrapper__popup");
        let posAchieve = this.state.actualItems
          .map(item => item.id)
          .indexOf(targetAchieve);
        popup.style.display = "flex";
        this.setState({
          currentAchieve: this.state.actualItems[posAchieve],
          openPopup: true
        });
      } else {
        console.log("close");
        let popup = document.querySelector(".achievements-body-wrapper__popup");
        popup.style.display = "none";
        this.setState({
          currentAchieve: this.state.actualItems[0],
          openPopup: false
        });
      }
    }
  }

  filterActions(e) {
    let posItem = +e.target.dataset.id;
    let selectItems = document.querySelectorAll(
      ".activity-body__top-filter-select .line-box, .line-box2"
    );
    let exist = e.target.className.includes("wrapper");
    if (exist) {
      if (
        selectItems[posItem].style.display === "none" ||
        selectItems[posItem].style.display === ""
      ) {
        selectItems[posItem].style.display = "flex";
        selectItems[posItem + 1].style.display = "flex";

        if (posItem === 0 || posItem === 4) {
          this.setState({
            entries: entries
          });
        } else if (posItem === 2) {
          this.setState({
            eventAccount: eventAccount
          });
        }
      } else {
        selectItems[posItem].style.display = "none";
        selectItems[posItem + 1].style.display = "none";

        if (posItem === 0 || posItem === 4) {
          this.setState({
            entries: []
          });
        } else if (posItem === 2) {
          this.setState({
            eventAccount: []
          });
        }
      }
    }
  }

  chooseAchieveSection(e) {
    let item = e.target.className;
    let pos = +e.target.dataset.pos;
    let active = document.querySelector(".achievements-body__top-item.active");
    if (this.state.achieve) {
      if (!item.includes("active")) {
        e.target.classList.add("active");
        active.classList.remove("active");
        if (pos === 0) {
          this.setState({
            actualItems: achieveInfo
          });
        } else if (pos === 1) {
          this.setState({
            actualItems: characterInfo
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="wrapper_1">
        <div className="main-content__wrapper">
          <div className="main-content__profile">
            <div className="profile-title">Profile</div>
            <div className="profile-body">
              <div className="profile-body__top">
                <div className="profile-body__top-avatar" alt="" srcSet="">
                  <div className="profile-body__top-avatar-flipper">
                    <img
                      src={icon9}
                      alt=""
                      className="top-avatar-flipper__front"
                    />
                    <div className="top-avatar-flipper__back">
                      <img src={character} />
                    </div>
                  </div>
                </div>

                <div className="profile-body__top-name">Jack Adams</div>
                <div className="profile-body__top-job">Lead Designer</div>
              </div>
              <div className="profile-body__bottom">
                <div className="profile-body__bottom-star">
                  <img
                    className="profile-body__bottom-star-img"
                    src={icon10}
                    alt=""
                    srcSet=""
                  />
                  <span className="profile-body__bottom-star-count">32</span>
                </div>
                <div className="profile-body__bottom-tasks">
                  <img
                    className="profile-body__bottom-tasks-img"
                    src={icon3}
                    alt=""
                    srcSet=""
                  />
                  <span className="profile-body__bottom-tasks-count">128</span>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content__statistics">
            <div className="statistics-title">More information</div>
            <div className="statistics-body">
              <div className="statistics-body__top">
                <div className="statistics-body__top-title">Money</div>
                <div className="statistics-body__top-graph" />
              </div>
              <div className="statistics-body__bottom">
                <div className="statistics-body__bottom-item">
                  <span className="statistics-body__bottom-item-number">
                    85%
                  </span>
                  <span className="statistics-body__bottom-item-text">
                    Successfully completed
                  </span>
                </div>
                <div className="statistics-body__bottom-item">
                  <span className="statistics-body__bottom-item-number">
                    25
                  </span>
                  <span className="statistics-body__bottom-item-text">
                    Achievements received
                  </span>
                </div>
                <div className="statistics-body__bottom-item">
                  <span className="statistics-body__bottom-item-number">8</span>
                  <span className="statistics-body__bottom-item-text">
                    Сharacters &nbsp; &nbsp;оpen
                  </span>
                </div>
                <div className="statistics-body__bottom-item">
                  <span className="statistics-body__bottom-item-number">
                    20
                  </span>
                  <span className="statistics-body__bottom-item-text">
                    Completed matches
                  </span>
                </div>
                <div className="statistics-body__bottom-item">
                  <span className="statistics-body__bottom-item-number">
                    207
                  </span>
                  <span className="statistics-body__bottom-item-text">
                    Hours in the game
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content__wrapper">
          <div className="main-content__achievements">
            <div className="achievements-title">Awards</div>
            <div
              className="achievements-body-wrapper"
              onClick={this.showAchievements}
            >
              <img
                className="achievements-body-wrapper__back"
                src={icon11}
                onClick={this.showAchievements}
                alt=""
              />

              <div className="achievements-body-wrapper__popup">
                <div className="achievements-body-wrapper__popup-area">
                  <div
                    className="achievements-body-wrapper__popup-area-close"
                    onClick={this.showAchieveInfo}
                  >
                    <span className="popup-area-close__line" />
                    <span className="popup-area-close__line2" />
                  </div>
                  <div className="achievements-body-wrapper__popup-area-top">
                    <div className="popup-area-top__name">
                      {this.state.currentAchieve.name}
                    </div>
                    <div className="popup-area-top__img">
                      <img src={this.state.currentAchieve.img} alt="" />
                    </div>
                  </div>
                  <div className="achievements-body-wrapper__popup-area-bottom">
                    {this.state.currentAchieve.text}
                  </div>
                </div>
              </div>

              <div className="achievements-body">
                <div
                  className="achievements-body__top"
                  onClick={this.chooseAchieveSection}
                >
                  <div
                    className="achievements-body__top-item active"
                    data-pos="0"
                  >
                    ACHIEVEMENTS
                  </div>
                  <div className="achievements-body__top-item" data-pos="1">
                    CHARACTERS
                  </div>
                </div>
                <div
                  className="achievements-body__bottom"
                  onClick={this.showAchieveInfo}
                >
                  {this.state.actualItems.map((item, i) => {
                    return (
                      <div className="achievements-body__bottom-item" key={i}>
                        <img src={item.img} alt="" srcSet="" />
                        <div
                          className="achievements-body__bottom-item-block"
                          data-id={item.id}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="main-content__activity">
            <div className="activity-title">Activity</div>
            <div className="activity-body">
              <div className="activity-body__top" onClick={this.filterActions}>
                <div className="activity-body__top-filter">
                  <div
                    className="activity-body__top-filter-select"
                    data-id="0"
                    data-select="1"
                  >
                    <div className="top-filter-select__wrapper" data-id="0" />
                    <span className="line-box" />
                    <span className="line-box2" />
                  </div>
                  <span className="activity-body__top-filter-text">
                    Sign In/Out
                  </span>
                </div>

                <div className="activity-body__top-filter">
                  <div className="activity-body__top-filter-select" data-id="2">
                    <div
                      className="top-filter-select__wrapper"
                      data-id="2"
                      data-select="1"
                    />
                    <span className="line-box" />
                    <span className="line-box2" />
                  </div>
                  <span className="activity-body__top-filter-text">Tasks</span>
                </div>

                <div className="activity-body__top-filter">
                  <div
                    className="activity-body__top-filter-select"
                    data-id="4"
                    data-select="true"
                  >
                    <div className="top-filter-select__wrapper" data-id="4" />
                    <span className="line-box" />
                    <span className="line-box2" />
                  </div>
                  <span className="activity-body__top-filter-text">Other</span>
                </div>
                <div className="activity-body__top-period">
                  <span className="activity-body__top-period-text">Week</span>
                  <div className="activity-body__top-period-arrow">
                    <span className="line-period" />
                    <span className="line-period2" />
                  </div>
                </div>
              </div>

              <div className="activity-body__bottom">
                {this.state.entries.map((item, i) => {
                  return (
                    <div className="activity-body__bottom-action" key={i}>
                      <object
                        className="activity-body__bottom-action-img sign-in"
                        type="image/svg+xml"
                        data={item.img}
                      />
                      <span className="activity-body__bottom-action-event">
                        {item.typeEvent}
                      </span>
                      <span className="activity-body__bottom-action-time">
                        {item.date}{" "}
                      </span>
                    </div>
                  );
                })}

                {this.state.eventAccount.map(item => {
                  return (
                    <div className="activity-body__bottom-action">
                      <object
                        className="activity-body__bottom-action-img"
                        type="image/svg+xml"
                        data={item.img}
                      />
                      <span className="activity-body__bottom-action-event">
                        {item.desc}
                      </span>
                      <span className="activity-body__bottom-action-time">
                        {item.date}
                      </span>
                    </div>
                  );
                })}
              </div>
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

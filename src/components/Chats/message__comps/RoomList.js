import React from 'react';
const search = 'http://web-citizen.ru/game-is-work/api/items/search.svg';

class RoomList extends React.Component {

    constructor(props){
        super()

        this.state = {
            value: '',
    }
    }

    getValue = (e) => {

        let value = e.target.value.toLowerCase()
        this.setState({
            value: value
        })
    }


    render () {
        return (
                <React.Fragment>
                    {
                        [...this.props.rooms].sort((a, b) => a.id > b.id)
                        .filter(item => item.name.toLowerCase().includes(this.state.value))
                        .map(room => {
                            
                            const active = room.id === this.props.roomId ? 'active' : '';
                            return ( 



                    <div key={room.id}
                         className={"chats-left__messages-item " + active} 
                         onClick={() => this.props.subscribeToRoom(room.id, room.name)}
                         >

                        <img className="chats-left__messages-item-img" src={this.props.img} alt=""/>
                    <div className="chats-left__messages-item-text">
                        <div className="messages-item-text__name">{room.name}</div>
                        <div className="messages-item-text__preview">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                            Aenean comm.. Lorem ipsum dolor sit amet consectetur adipisicing 
                            elit. In quam sunt ducimus placeat repellendus dolor sequi eum, 
                            veritatis esse ipsam! 
                        </div>
                    </div><span className="chats-left__messages-item-time">18:30</span><span className="chats-left__messages-item-count">163</span>
                    </div>
                )})}
            </React.Fragment>                    
        )
    }
}








export default RoomList

/*                             
                        <div key={room.id} 
                                    className={"messages-body__people-person-section " + active}
                                    onClick={() => this.props.subscribeToRoom(room.id, room.name)}
                                    
                                    >
                            <div className="people-person__img-section">
                        <img 
                        src={this.props.img} alt="" srcset=""/>
                    </div>

                            <div className="people-person__letter-section">
                                <span className="people-person__letter-text-section">
                                # 
                                </span>
                            </div>
                    </div> */
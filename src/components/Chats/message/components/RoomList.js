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
            <div className="messages-body__people-section">
              
                <div className="messages-body__people-search-section">
                    <div class="people-search__img-section">
                        <img src={search} alt=""/>
                    </div>
                <input type="text"
                    placeholder="Search here"
                    onChange={this.getValue}
                />
                </div>
                
                {
                    [...this.props.rooms].sort((a, b) => a.id > b.id)
                    .filter(item => item.name.toLowerCase().includes(this.state.value))
                    .map(room => {
                        
                        const active = room.id === this.props.roomId ? 'activeMessage-section' : '';
                        return ( 

                        
                    <div key={room.id} 
                                className={"messages-body__people-person-section " + active}
                                onClick={() => this.props.subscribeToRoom(room.id, room.name)}
                                
                                >
                        <div className="people-person__img-section">
                    <img 
                    src="http://web-citizen.ru/game-is-work/api/items/Sloy_1.png" alt="" srcset=""/>
                </div>

                        <div className="people-person__letter-section">
                            <span className="people-person__letter-text-section">
                            # {room.name}
                            </span>
                        </div>
                </div>
)})}
             </div>
        )
    }
}








export default RoomList
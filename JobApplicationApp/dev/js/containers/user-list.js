// WE NEED COMPONENT SINCE WE WILL USE THIS CLASS AS COMPONENT
import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

import {selectUser} from '../actions/index'
class UserList extends Component{

  createListItems(){
    return this.props.users.map((user)=>{
      return(
          <li
          key= {user.id}
          onClick = {() => this.props.selectUser(user)}
          >
          {user.first} {user.last}
          </li>

      );
    });
  }
  render(){
    return (
      <ul>
        {this.createListItems()}
      </ul>
    );
  }
}

// Take a piece of application STATE and pass it into Component as a property
function mapStateToProps(state){
      return{
          users: state.users
      };
}

// DISPATCH MEANS CALL FUNCTION
function matchDispatchToProps(dispatch){
      return bindActionCreators({selectUser:selectUser},dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(UserList );

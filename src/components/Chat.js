import React from 'react';
import Backend2 from '../Backend2';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

class Chat extends React.Component {
state = {
    messages: []
};
 constructor(props) {
   super(props);

 }


componentWillMount(){
  this.setState({
   messages: [
           {
             _id: 1,
             text: "Hello, What can I do for you today?",
             createdAt: new Date(),
             user: {
               _id: 2,
               name: 'React Native',
               //avatar: 'https://facebook.github.io/react/img/logo_og.png',
             },
           },
         ]
       });
 }

 onSend=(messages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

 render(){
   return(
     <View style={styles.container}>
      <GiftedChat
        messages={this.state.messages}
        onSend = {(message) => {
          Backend2.sendMessage(message);
        }}/>
     </View>

   );
 }

componentDidMount(){
  Backend2.loadMessages((messages)=>{
    this.setState((previousState)=>{
      return{
        messages: GiftedChat.append(previousState.messages, messages),
      }
    });
  });
}
componentWillUnMount(){
  Backend2.closeChat();
}

}
var styles=StyleSheet.create({
  container: {
    flex: 1,
  }
});
Chat.propTypes = {
  name: PropTypes.string,
  password: PropTypes.string,
}

export default Chat;

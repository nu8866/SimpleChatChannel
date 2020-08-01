import React, { Component } from "react";
import { UserInfo } from "./UserInfo";
import ContactList from "./ContactList";
import { Segment } from "semantic-ui-react";
import Talk from "talkjs";
import "./Overview.css";

const userInfo = {
  id: "1",
  name: "Nu Wang",
  email: "nu8866@gmail.com",
  photoUrl:
    "https://yt3.ggpht.com/-Tu07ymRKWhI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucndzbvXhqn4syUkgJIpnJrc7rqeeQ/s88-c-k-c0xffffffff-no-rj-mo/photo.jpg",
  role: "Tester1",
  info: "Developer",
  welcomeMessage: "Hi:-)",
};
const contactList = [
  {
    id: "2",
    name: "Alex Honnold",
    email: "alex@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    role: "Tester1",
    info: "I'm what I'm:)",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "3",
    name: "Jain Kim",
    email: "jain@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/women/11.jpg",
    role: "Tester1",
    info: "I'm what I'm:)",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "4",
    name: "Adam Ondra",
    email: "adam@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    role: "Tester1",
    info: "I'm what I'm:)",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "5",
    name: "Janja Garnbret",
    email: "janja@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/women/13.jpg",
    role: "Tester1",
    info: "I'm what I'm:)",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
];

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: userInfo,
      selectedUserId: "",
    };
    this.contactPersonSelected = this.contactPersonSelected.bind(this);
  }

  contactPersonSelected(userId) {
    this.setState({ selectedUserId: userId });
    const currentUser = this.state.currentUser;
    const user = contactList.find((user) => user.id === userId);
    Talk.ready
      .then(() => {
        const me = new Talk.User(currentUser);
        const other = new Talk.User(user);
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tEM7aYOR",
            me: me,
          });
        }
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(
          conversationId
        );
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(document.getElementById("talkjs-container"));
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <div className="App">
        <h1 className="AppHeader">My simple chat channel</h1>
        <div className="AppBody">
          <Segment className="LeftColumn">
            <UserInfo userInfo={userInfo} />
            <ContactList
              contactList={contactList}
              contactPersonSelected={this.contactPersonSelected}
              selectedUserId={this.state.selectedUserId}
            />
          </Segment>
          <Segment className="RightColumn" id="talkjs-container">
            <i>Start a chat!</i>
          </Segment>
        </div>
      </div>
    );
  }
}

export default Overview;

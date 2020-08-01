import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import classNames from "classnames";

class ContactList extends Component {
  render() {
    return (
      <div className="ContactList">
        {this.props.contactList &&
          this.props.contactList.length > 0 &&
          this.props.contactList.map((c) => (
            <Segment
              vertical
              className={classNames({
                ContactPerson: true,
                Selected:
                  this.props.selectedUserId &&
                  this.props.selectedUserId === c.id,
              })}
              onClick={() => this.props.contactPersonSelected(c.id)}
              key={c.id}
              id={c.id}
            >
              <img src={c.photoUrl} alt="Portrait missing" />
              <span>{c.name}</span>
            </Segment>
          ))}
      </div>
    );
  }
}

export default ContactList;

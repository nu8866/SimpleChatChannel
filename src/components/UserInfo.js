import React from "react";
import { Segment } from "semantic-ui-react";

export function UserInfo(props) {
  return (
    <Segment vertical className="UserInfo">
      <img src={props.userInfo.photoUrl} alt="Portrait missing" />
      <span>{props.userInfo.name}</span>
    </Segment>
  );
}

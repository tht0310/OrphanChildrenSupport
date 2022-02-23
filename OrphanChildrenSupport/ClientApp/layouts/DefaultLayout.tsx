import React from "react";

interface Props {}

export default class DefaultLayout extends React.Component<Props, {}> {
  public render() {
    return (
      <div id="guestLayout" className="layout">
        <div className="">{this.props.children}</div>
      </div>
    );
  }
}

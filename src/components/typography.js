import * as React from "react";
import styles from "./typography.module.css";

const HeaderSizes = {
  "x-small": styles["headerXsmall"],
  small: styles["headerSmall"],
  medium: styles["headerMedium"],
  large: styles["headerLarge"]
};

export class Header extends React.Component {
  _className() {
    return HeaderSizes[this.props.size || 'large'];
  }

  render() {
    return <div className={this._className()}>{this.props.children}</div>;
  }
}

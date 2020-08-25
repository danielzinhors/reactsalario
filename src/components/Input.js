import React, { Component } from 'react';

import css from './input.module.css';

export default class Input extends Component {
  handleValue = (event) => {
    const newValue = event.target.value;
    this.props.onchange(newValue);
  };

  render() {
    const { type, title, id, name, classe, placeholder, value } = this.props;
    return (
      <>
        <div className={classe}>
          <span className={css.salariobruto}>{title}</span>
          <input
            className={css.salariobruto}
            placeholder={placeholder}
            key={id}
            name={name}
            type={type}
            value={value}
            onChange={this.handleValue}
          />
        </div>
      </>
    );
  }
}

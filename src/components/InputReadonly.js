import React, { Component } from 'react';
import css from './input.module.css';

export default class InputReadonly extends Component {
  constructor() {
    super();
    this.state = {
      className: '',
    };
  }

  componentDidMount() {
    let className;
    switch (this.props.stilo) {
      case 'baseinss':
        className = css.baseinss;
        break;
      case 'salarioliquido':
        className = css.salarioliquido;
        break;
      case 'descontoirrf':
        className = css.descontoirrf;
        break;
      case 'baseirrf':
        className = css.baseirrf;
        break;
      case 'descontoinss':
        className = css.descontoinss;
        break;
      default:
        className = '';
    }
    this.setState({
      className,
    });
  }

  render() {
    const { type, title, id, name, classe, placeholder, value } = this.props;
    const { className } = this.state;
    return (
      <>
        <div className={classe}>
          <span className={className}>{title}</span>
          <input
            className={className}
            placeholder={placeholder}
            key={id}
            name={name}
            type={type}
            value={value}
            readOnly
          />
        </div>
      </>
    );
  }
}

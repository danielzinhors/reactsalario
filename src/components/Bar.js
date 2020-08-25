import React from 'react';

export default class Bar extends React.Component {
  render() {
    const { value, color = 'black', title = '' } = this.props;
    return (
      <div
        title={title}
        style={{
          width: value + '%',
          height: '20px',
          backgroundColor: color,
        }}
      />
    );
  }
}

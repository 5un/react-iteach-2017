import React from 'react'

export default class Page extends React.Component {

  render() {
    return (<div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Poppins');
        body {
          font-family: 'Poppins', sans-serif;
          background: #000;
          color: white;
          font-size: 18px;
          text-align: center;
        }
      `}</style>
      {this.props.children}
    </div>);
  }
}
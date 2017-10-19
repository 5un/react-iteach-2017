import React from 'react'
import Link from 'next/link'
import Page from '../components/page.js'
import { Button, InputText } from '../components/elements.js'

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleTextChanged(e) {
    this.setState({ inputName: e.target.value })
  }

  render() {
    const { inputName } = this.state
    return (<Page>
      <h1>Mixtaper 📼</h1>
      <p>Generate a mixtape with your name.</p>
      <div>
        <InputText type="text" onChange={this.handleTextChanged.bind(this)}/>
      </div>
      <div>
        <Link href={`/mixtape?name=${inputName}`}>
          <Button>Generate</Button>
        </Link>
      </div>
    </Page>);
  }
}
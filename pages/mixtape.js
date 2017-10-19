import React from 'react'
import Page from '../components/page'
import TrackList from '../components/track-list'
import request from 'superagent'

export default class Mixtape extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tracks: [
      ]
    }
  }

  componentDidMount() {
    let tracks = []
    try {
      const name = this.props.url.query.name;
      request
       .get(`https://us-central1-mehsurvey-29210.cloudfunctions.net/getSongs?q=${name}`)
       .end((err, res) => {
          const items = res.body.tracks.items
          if (items) {
            items.forEach((item) => {
              if(tracks.length < 10) {
                tracks.push({
                  title: item.name,
                  artist: item.artists[0].name,
                  image: item.album.images[0].url
                })
              }
            });
            this.setState({ tracks: tracks })
          }
       });
    } catch (e) {

    }
  }

  render() {
    const name = this.props.url.query.name
    const tracks = this.state.tracks
    return (<Page>
      <h1>Hello, {name}. Here's your mixtape.</h1>
      <p>Tracks</p>
      <TrackList tracks={tracks}/>
    </Page>);
  }

}
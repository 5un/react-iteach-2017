import React from 'react'
import styled from 'styled-components'
import Track from './track'

const TrackListContainer = styled.ul`
  list-style-type: none;
`

export default class TrackList extends React.Component {

  render() {
    const { tracks } = this.props
    return (<TrackListContainer>
        {tracks.map((track) => (
          <Track track={track} key={track.title}></Track>
        ))}
    </TrackListContainer>);
  }
}
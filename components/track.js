import React from 'react'
import styled from 'styled-components'

const TrackContainer = styled.li`
  margin-bottom: 10px;
`

const TrackAlbumArt = styled.img`
  display: inline-block;
  vertical-align: top;
  max-width: 100px;
  max-height: 100px;
`

const TrackInfo = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  color: #cccccc;
  text-align: left;
  width: 240px;
`

const TrackTitle = styled.h4`
  margin: 0;
`

export default class Track extends React.Component {

  render() {
    const { track } = this.props
    return (<TrackContainer>
      <div>
        <TrackAlbumArt src={track.image} width={100} height={100}>
        </TrackAlbumArt>
        <TrackInfo>
          <TrackTitle>{track.title}</TrackTitle>
          <span>{track.artist}</span>
        </TrackInfo>
      </div>
    </TrackContainer>);
  }
}
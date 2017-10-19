Let's build a mixtape generator site
====================================

In this tutorial, we are building a mixtape generator site based on user's name. The web app gets user input name, searches for relevant tracks in Spotify API and return them to the user. 

## 1. Project Setup

Choose your directory of choice and initialize and empty npm directory with `npm init`. You can use all the default options from npm for now.
```bash
mkdir mixtaper-react
cd mixtaper-react
npm init
```

Next, we'll install packages: `react`, `react-dom`, and `next` to get started. 
``` bash
npm install react react-dom next --save
```

Then create the `pages` directory required by Next.js. and modify your `package.json` to make it work with Next. Add the line `"dev": "next"` input your `"scripts"` key
``` json
{
  "name": "mixtaper-react",
  "version": "1.0.0",
  "description": "Awesome mixtape generator",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "next": "^4.0.3",
    "react": "^16.0.0",
    "react-dom": "^16.0.0"
  }
}
```

Then create a file called index.js in the pages directory. This is going to be our first page of our app. 

``` jsx
import React from 'react'

export default class Index extends React.Component {

  render() {
    return (<div>
      <h1>Hello React!</h1>
    </div>);
  }
}
```

Now, your directory should look something like this
```
node_modules
package.json
pages
 |- index.js
```

Go ahead and try to preview our app with `npm run dev` and vitsit [http://localhost:3000](http://localhost:3000) in your browser. You should see a web that looks like this.

## 2. Create the outline for your UIs

### 2.1 Create pages
Now that you have a page to play with. Go ahead and write some JSX that's going to represent our UI. Add some more HTML into your `index.js` file.
``` jsx
import React from 'react'

export default class Index extends React.Component {

  render() {
    return (<div>
      <h1>Mixtaper</h1>
      <p>Generate a mixtape with your name.</p>
      <div>
        <input type="text" />
      </div>
      <div>
        <button>Generate</button>
      </div>
    </div>);
  }

}
```

Next, create our second page called `pages/mixtape.js` to host our mixtape result.
``` jsx
import React from 'react'

export default class Mixtape extends React.Component {

  render() {
    return (<div>
      <h1>Hello, Lucy. Here's your mixtape.</h1>
      <p>Tracks</p>
      <ul>
        <li>
          <h2>Track1</h2>
          <div>Song - Artist</div>
        </li>
        <li>
          <h2>Track2</h2>
          <div>Song - Artist</div>
        </li>
        <li>
          <h2>Track3</h2>
          <div>Song - Artist</div>
        </li>
      </ul>
    </div>);
  }
}
```

Note that you does not need to restart Next.js to reload your page. Goto [https://localhost:3000/mixtape](https://localhost:3000/mixtape) to see if the page is now up.

### 2.1 Link the pages together

Now we're going to create link between the two pages. Go back to `pages/index.js` and add `import Link from 'next/link'
`. Change `<button>Generate</button>` to `<Link href="/mixtape"><button>Generate</button></Link>`, so that your file becomes:

``` jsx
import React from 'react'
import Link from 'next/link'

export default class Index extends React.Component {

  render() {
    return (<div>
      <h1>Mixtaper 📼</h1>
      <p>Generate a mixtape with your name.</p>
      <div>
        <input type="text" />
      </div>
      <div>
        <Link href="/mixtape">
          <button>Generate</button>
        </Link>
      </div>
    </div>);
  }
}
```

Now, go back to [http://locahost:3000](http://locahost:3000) and test to see if your Generate button brings you to the next page.


## 3. Get started with styling

### 3.1 Add global styles

Next.js allows us to have global styles that would be applied to the whole page by using the `style` tag with `jsx` and `global` attribute. See [this page](https://github.com/zeit/next.js/wiki/Global-styles-and-layouts) on Next.js' documentation for more information. Let's create a style block that set the background/text color and the default font family/size. Here's our style block which imports a Google Font named Poppins.
```css
@import url('https://fonts.googleapis.com/css?family=Poppins');
body {
  font-family: 'Poppins', sans-serif;
  background: #000;
  color: white;
  font-size: 18px;
}
```

Put the block under the top level div element in `pages/index.js` so that your class becomes
``` jsx
import React from 'react'
import Link from 'next/link'

export default class Index extends React.Component {

  render() {
    return (<div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Poppins');
        body {
          font-family: 'Poppins', sans-serif;
          background: #000;
          color: white;
          font-size: 18px;
        }
      `}</style>
      <h1>Mixtaper 📼</h1>
      <p>Generate a mixtape with your name.</p>
      <div>
        <input type="text" />
      </div>
      <div>
        <Link href="/mixtape">
          <button>Generate</button>
        </Link>
      </div>
    </div>);
  }
}
```
Go back and preview your site at http://localhost:3000.

### 3.2 Add some styled components
Global styles may be good for styling the whole page. But, to create reusable styled components, it's more convenient to use the [styled-component](https://www.styled-components.com/) package which allows us to embed style into react components.

First, stop your running Next.js server and install a new package called `styled-components`
``` bash
npm install styled-components --save
```

To make Next.js completely work with styled components. Some overriding to the document template must be used. Create a file called `pages/_document.js` with the following content

``` jsx
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <title>My page</title>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

We are going to create a styled button components that looks like this:
![missing image]()

Now, go ahead and create a style Button component in `pages/index.js` and use it instead of `button`
``` jsx
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const InputText = styled.input`
  background-color: white;
  color: #222;
  font-size: inherit;
  border: 0;
  border-radius: 4px;
  margin: 10px;
  width: 300px;
  line-height: 50px;
`

const Button = styled.button`
  appearance: none;
  border: 0;
  font-family: inherit;
  font-size: inherit;
  background-color: #1DB854;
  color: white;
  padding: 10px 40px;
  width: 300px;
`

export default class Index extends React.Component {

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
      <h1>Mixtaper 📼</h1>
      <p>Generate a mixtape with your name.</p>
      <div>
        <InputText type="text" />
      </div>
      <div>
        <Link href="/mixtape">
          <Button>Generate</Button>
        </Link>
      </div>
    </div>);
  }
}
```
Go back and preview your site at [http://localhost:3000](http://localhost:3000).

### 3.3 Re-organize our style code
We can keep adding styled components to our index.js but it's not very useful. The global style is still also not transferred over to the /mixtape page. So it might be a good time that we re-organize the code. Now we'll take the global style code into `Page` component. At the same time, we will put the general HTML-overriding elements into a single file called `components/elements.js`. The proposed structure will be like

```
node_modules
package.json
components
 |- page.js 
 |- elements.js
pages
 |- index.js
```

components/page.js
``` jsx
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
```

components/elements.js
``` jsx
export const InputText = styled.input`
  background-color: white;
  color: #222;
  font-size: inherit;
  border: 0;
  border-radius: 4px;
  margin: 10px;
  width: 300px;
  line-height: 50px;
`

export const Button = styled.button`
  appearance: none;
  border: 0;
  font-family: inherit;
  font-size: inherit;
  background-color: #1DB854;
  color: white;
  padding: 10px 40px;
  width: 300px;
`
```

Now for our Index component, import Button and Input text from `../components/elements.js` instead of defining it in the file.

pages/index.js
``` jsx
import React from 'react'
import Link from 'next/link'
import Page from '../components/page.js'
import { Button, InputText } from '../components/elements.js'

export default class Index extends React.Component {

  render() {
    return (<Page>
      <h1>Mixtaper 📼</h1>
      <p>Generate a mixtape with your name.</p>
      <div>
        <InputText type="text" />
      </div>
      <div>
        <Link href="/mixtape">
          <Button>Generate</Button>
        </Link>
      </div>
    </Page>);
  }
}
```

## 4. Craft the components
Now we're going to create components that represents our output mix tape. For reusability, it is somehow good to create a component for your item and another component for your list. 

### 4.1 Creating the Track component
Starting with the Track component which represent a track. The component should receive a prop called `track` representing our track object with the following structure. 
``` json
{
  "title": "Lucy in the Sky with Diamonds",
  "artist": "The Beatles",
  "image": "https://i.scdn.co/image/ec881187fe0432c8f6d208b9b4833bd411471345"
}
```

We can write our component as 
``` jsx
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
```

Now, we will put our Track component to use. In `pages/mixtape.js`, Display 2-3 instances of the `Track` component we've just build. Also pass a prop value of a track object into it.

``` jsx
import React from 'react'
import Page from '../components/page'
import Track from '../components/track' // Add an import for the Track component

export default class Mixtape extends React.Component {

  constructor(props) {
    super(props)

    // Initializes the tracks in the state
    this.state = {
      tracks: [
        {
          "title": "Lucy in the Sky with Diamonds",
          "artist": "The Beatles",
          "image": "https://i.scdn.co/image/ec881187fe0432c8f6d208b9b4833bd411471345"
        }
      ]
    }
  }

  render() {
    const track = this.state.tracks[0] // Select first track to show
    return (<Page>
      <h1>Hello, Lucy. Here's your mixtape.</h1>
      <p>Tracks</p>
      <ul>
        <Track track={track}/>{/* Add the Track component */}
        <Track track={track}/>{/* Add the Track component */}
        <Track track={track}/>{/* Add the Track component */}
        <Track track={track}/>{/* Add the Track component */}
      </ul>
    </Page>);
  }
}
```

### 4.2 Working on the TrackList components
In the real world, we will want to get a list of tracks from a datasource and then populate them to a number of Track components simultaneously. Now we will create the `TrackList` component that receives a list of tracks as a prop and populate them into multiple Track. 

Here we can use array map function inside a react expression. Then we can nest more components into each round of the map function. Consider this code example
```
var fruits = ['apple', 'orange', 'banana']
{fruits.map((fruit) => (
  <div>{fruit}</div>
))}
```
For each fruit in the list fruits, a mapping function of `(fruit) => (<div>{fruit}</div>)` will be called. The `<div>{fruit}</div>` is the return statement of this function. It returns a jsx tag `<div>` enclosing the name of the fruit.

Now let's construct our TrackList component using the same strategy.

components/track-list.js
```
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
          <Track track={track}></Track>
        ))}
    </TrackListContainer>);
  }
}
```

And use it in your mixtape page component.
```
import React from 'react'
import Page from '../components/page'
import TrackList from '../components/track-list'

export default class Mixtape extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tracks: [
        {
          "title": "Lucy in the Sky with Diamonds",
          "artist": "The Beatles",
          "image": "https://i.scdn.co/image/ec881187fe0432c8f6d208b9b4833bd411471345"
        },
        {
          "title": "Lucy's About to Lose Her Mind",
          "artist": "The Huntington",
          "image": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Hunt-fungames.jpg/220px-Hunt-fungames.jpg"
        },
        {
          "title": "Lucy Leave",
          "artist": "Pink Floyd",
          "image": "https://upload.wikimedia.org/wikipedia/en/1/10/Pink_Floyd_The_Early_Years_Box_set_%28Black_Cover%29.jpg"
        }
      ]
    }
  }

  render() {
    const tracks = this.state.tracks
    return (<Page>
      <h1>Hello, Lucy. Here's your mixtape.</h1>
      <p>Tracks</p>
      <TrackList tracks={tracks}/>
    </Page>);
  }

}
```

Go back to the preview at [http://localhost:3000/mixtape](http://localhost:3000/mixtape). See how your mix tape page changed.

## 5. Sending params and connect it to the API

Our effort so far have been on the user interaction side. Now, we're going to make the app really work. We are going to connect to a backend that is already available at. 

[https://us-central1-mehsurvey-29210.cloudfunctions.net/getSongs](https://us-central1-mehsurvey-29210.cloudfunctions.net/getSongs)

### 5.1 Listen to component events and mutate the state

In our index page, we need to listen to the change of input text to be able to send the value to the next page. Now add a handler to our InputText component. Set it to a function inside our Index class. 

```
import React from 'react'
import Link from 'next/link'
import Page from '../components/page.js'
import { Button, InputText } from '../components/elements.js'

export default class Index extends React.Component {

  handleTextChanged(e) {
    console.log(e.target.value)
  }

  render() {
    return (<Page>
      <h1>Mixtaper 📼</h1>
      <p>Generate a mixtape with your name.</p>
      <div>
        <InputText type="text" onChange={this.handleTextChanged.bind(this)}/>
      </div>
      <div>
        <Link href="/mixtape">
          <Button>Generate</Button>
        </Link>
      </div>
    </Page>);
  }
}
```

The `onChange={this.handleTextChanged.bind(this)}` bind the onChange event of the text input to our class's `handleTextChanged` function. Note that `.bind(this)` is used to make the `this` inside the function scope refer to the class itself. This is quite a tricky topic in ECMA scripts. Read more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

Now the handleTextChanged function only logs the `e.target.value` out. Go back to see the preview to see if it works.

Next, we are going to save this change to the state and send the value to the next page. Add a constructor for the class and call `setState` in our `handleTextChanged()` event. Also change the link for your generate button to `href={`/mixtape?name=${inputName}`}`

Now, your page/index.js becomes.
``` js
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
```
Go back to the preview to see if, after entering the name and click generate, the parameter is changed for your mixtape page.

### 5.2 Sending API calls
Now that we've send the parameter over to the mixtape page, a request is going to happen once the mixtape page load.
We'll bring in `superagent` library to handle our request.

Install superagent package with
``` bash
npm install --save superagent
```

Now we'll learn how to use `componentDidMount()` function to handle data loading on page load. Let's add some code in that method to get the data from our API and set it to the `tracks` key of our state.

```
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
```

Next.js allows us to access the query param via `this.props.url.query.{variable_name}`. In this case, we're accessing the `name` param.

We then add it to the url of our request using templating expressions: `https://us-central1-mehsurvey-29210.cloudfunctions.net/getSongs?q=${name}`.

If the request go through, the `end()` function serve as a callback with the param `err` and `res`. To access the response body, we can use `res.body`.

Now let's add the item from the response to our state. We've seen from the response that we can get the song title with `.name`, artist name from the `.artists[0].name`, and an image from `.album.images[0].url`. Keep appending that to the `tracks` variable and call `setState`

Check the preview from the index page to see if it all works.

## 6. Ship it to the world

Whether you are building your hackathon prototype or a proof-of-concept demo to your client, you might want the site to be publicly accessible. Luckily, cloud app deployment services like Heroku and Zeit.co offer to host your app for free if the traffic is low enough. We are going to use Now in this tutorial. 

Add a .gitignore file to the project with the following content
```
node_modules
.next
```

Add some lines to your package.json 
```
"build": "next build",
"start": "next start"
```

so that your package file becomes.
```
{
  "name": "mixtaper-react",
  "version": "1.0.0",
  "description": "Awesome mixtape generator",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "next": "^4.0.3",
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "styled-components": "^2.2.1",
    "superagent": "^3.6.3"
  }
}

```

Get a zeit.co account and follow the getting started instructions at [https://zeit.co/now](https://zeit.co/now)

Deploy it with the command now
```
now
```
The site will be available from a url returned from command line. Enjoy!





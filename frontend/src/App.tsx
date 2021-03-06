import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Meet from './pages/Meet'
import './App.css'
import { MeetProvider } from './context/MeetContext'
import { ChatProvider } from './context/ChatContext'

function App (): JSX.Element {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/:roomName">
        <ChatProvider>
          <MeetProvider>
              <Meet />
          </MeetProvider>
        </ChatProvider>
      </Route>
    </Switch>
  )
}

export default App

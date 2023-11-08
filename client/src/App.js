import './App.css'
// import NewChat from './components/Chat'
import Chatbot from './components/ChatBot'
function App () {
  return (
    <div className='App'>
      <header className='App-header'>
      <img
            src='./logo.png'
            style={{
              marginRight: '20px',
              height: '70px'
            }}
          />
        <h1 style={{ color: '#27AE60' }}>
          {/* <i class='fab fa-whatsapp' />  */}
          
          Ai ChatBot WhatsApp
        </h1>
      </header>
      {/* <newChat/> */}
      <Chatbot />
    </div>
  )
}

export default App

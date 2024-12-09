import './App.css'
import Button from './components/button/Button'

function App() {

  return (
    <Button isLoading={false} isDisabled={true} variant={"primary"} size={"button"}  >
      سلام
    </Button>
  )
}

export default App

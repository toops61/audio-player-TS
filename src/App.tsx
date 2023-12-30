import { useEffect } from "react";
import { useSongsHandle } from "./utilsFuncs/hooksFuncs"

function App() {
  const { songsArray } = useSongsHandle();

  useEffect(() => {
    songsArray && console.log(songsArray);
  }, [songsArray])
  

  return (
    <main className="App">
      <h1>player</h1>
    </main>
  )
}

export default App

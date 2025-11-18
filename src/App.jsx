import BookingProvider from "./context/BookingProvider";
import Home from "./views/Home";

function App() {
  return (
    <>
      <BookingProvider>
        <Home />
      </BookingProvider>
    </>
  );
}

export default App;

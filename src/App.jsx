import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InitialConfigurationForm from "./components/Forms/İnitialConfigurationForm";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <InitialConfigurationForm />
        <Footer />
      </div>
    </>
  );
}

export default App;

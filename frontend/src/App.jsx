import PredictorForm from './components/PredictorForm'

function App() {
  return (
    <div className="app">
      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>

      <div className="overlay">
        <div className="hero-section">
          <h1>Diabetes Predictor</h1>
          <p>
          Predict Analyze Prevent.
          </p>
        </div>

        <PredictorForm />
      </div>
    </div>
  )
}

export default App



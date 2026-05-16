import { useState } from 'react'
import axios from 'axios'

function PredictorForm() {

  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  })

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/predict',
        {
          Pregnancies: Number(formData.Pregnancies),
          Glucose: Number(formData.Glucose),
          BloodPressure: Number(formData.BloodPressure),
          SkinThickness: Number(formData.SkinThickness),
          Insulin: Number(formData.Insulin),
          BMI: Number(formData.BMI),
          DiabetesPedigreeFunction: Number(formData.DiabetesPedigreeFunction),
          Age: Number(formData.Age)
        }
      )

      setResult(response.data.prediction)

    } catch (error) {
      console.error(error)
      setResult('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className="card">

      <div className="card-header">
        <h2>Health Analysis Dashboard</h2>
        <span>AI Powered Prediction</span>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="input-grid">
          {Object.keys(formData).map((field) => (
            <div className="input-box" key={field}>
              <label>{field}</label>

              <input
                type="number"
                step="any"
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <button type="submit">
          {loading ? ' Analyzing Health Data...' : ' Predict Now'}
        </button>

      </form>

      {result && (
        <div className={`result ${result.includes('Diabetic') ? 'danger' : 'safe'}`}>
          <h2>{result}</h2>

          <p>
            {result.includes('Diabetic')
              ? 'Potential diabetes risk detected.'
              : 'No major diabetes indicators detected.'}
          </p>
        </div>
      )}

    </div>
  )
}

export default PredictorForm
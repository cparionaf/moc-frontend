import { useState } from 'react'
import axios from 'axios'

function App() {
  // Estados para la primera llamada API
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Estados para la segunda llamada API
  const [secondData, setSecondData] = useState(null)
  const [secondError, setSecondError] = useState(null)
  const [secondLoading, setSecondLoading] = useState(false)

  // Función para la primera llamada HTTP
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('https://api-net.poc-architecture.carlospariona.dev')
      setData(response.data)
    } catch (err) {
      setError('Error al obtener los datos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Función para la segunda llamada HTTP
  const fetchSecondData = async () => {
    try {
      setSecondLoading(true)
      setSecondError(null)
      // Reemplaza esta URL con tu segundo endpoint
      const response = await axios.get('https://api-go.poc-architecture.carlospariona.dev')
      setSecondData(response.data)
    } catch (err) {
      setSecondError('Error al obtener los datos secundarios: ' + err.message)
    } finally {
      setSecondLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Multi Region EKS</h1>
      
      {/* Contenedor para los botones */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {/* Primer botón */}
        <button 
          onClick={fetchData}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Obtener Datos'}
        </button>

        {/* Segundo botón */}
        <button 
          onClick={fetchSecondData}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={secondLoading}
        >
          {secondLoading ? 'Cargando...' : 'Obtener Datos Secundarios'}
        </button>
      </div>

      {/* Sección para mostrar resultados de la primera llamada */}
      <div style={{ marginBottom: '20px' }}>
        {loading && <p>Cargando datos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {data && (
          <div style={{ marginTop: '20px' }}>
            <h2>Respuesta Primera Llamada:</h2>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px' 
            }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Sección para mostrar resultados de la segunda llamada */}
      <div>
        {secondLoading && <p>Cargando datos secundarios...</p>}
        {secondError && <p style={{ color: 'red' }}>{secondError}</p>}
        {secondData && (
          <div style={{ marginTop: '20px' }}>
            <h2>Respuesta Segunda Llamada:</h2>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px' 
            }}>
              {JSON.stringify(secondData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
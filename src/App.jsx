import { useState } from 'react'
import axios from 'axios'

function App() {
  // Estado para almacenar la respuesta de la API
  const [data, setData] = useState(null)
  // Estado para manejar errores
  const [error, setError] = useState(null)
  // Estado para mostrar cuando está cargando
  const [loading, setLoading] = useState(false)

  // Función que realiza la llamada HTTP
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      // Reemplaza esta URL con tu endpoint
      const response = await axios.get('https://api.poc-architecture.carlospariona.dev')
      setData(response.data)
    } catch (err) {
      setError('Error al obtener los datos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Multi Region EKS</h1>
      
      {/* Botón para realizar la llamada */}
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

      {/* Mostrar estado de carga */}
      {loading && <p>Cargando datos...</p>}

      {/* Mostrar error si existe */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Mostrar datos si existen */}
      {data && (
        <div style={{ marginTop: '20px' }}>
          <h2>Respuesta:</h2>
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
  )
}

export default App
import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
const urlApi = 'https://rickandmortyapi.com/api/character/';

function App() {
  const position = [-25.424828, -49.2722539,19]
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [name, setName] = useState("")


  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        console.log("Esta pagina nao contem este personagem")
      }
      console.error(error)
    })
  }, [page, name])

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div className={style.wrapProducts}>
              {produtos.map((item) => {
                return (
                  <Card name={item.name} desc={item.desc} value={item.value} status={item.status} category={item.category} image={item.image} key={item.id} />
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input type="text" placeholder="Nome do personagem" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <Card name={item.name} desc={item.species} value={item.gender} image={item.image} />
                    {/* <button onClick={() => {}}>Info</button>*/}
                  </div>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width:'500px', height:'400px'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        <a href="https://maps.app.goo.gl/T1NGtKvcSm3ZyReD6" target='_blank'>Abrir Google Maps</a>
      </Popup>
    </Marker>
  </MapContainer>
        
          </>
        }
      </div>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { ProductDetails } from './components/ProductDetails'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const urlApi = 'https://rickandmortyapi.com/api/character/';

function App() {
  const position = [-25.424828, -49.2722539, 19]
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [name, setName] = useState("")
  const dataA = [{name: 'Page 1', uv: 100, pv: 2400, amt: 2400}, 
  {name: 'Page 2', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page 3', uv: 300, pv: 300, amt: 1200},
  {name: 'Page 4', uv: 100, pv: 2400, amt: 9666},
  {name: 'Page 5', uv: 400, pv: 5200, amt: 2400}];
  const dataA2 = [{name: 'Page 1', uv: 100, pv: 2400, amt: 2400}, 
  {name: 'Page 2', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page 3', uv: 300, pv: 300, amt: 1200},
  {name: 'Page 4', uv: 100, pv: 2400, amt: 9666},
  {name: 'Page 5', uv: 400, pv: 5200, amt: 2400}];


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
        <button onClick={() => setShow("graf")}>Graficos</button>
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
            <div className={style.allCards}>
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <ProductDetails name={item.name} status={item.status} species={item.species} type={item.type} gender={item.gender} image={item.image} />
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
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: '500px', height: '400px' }}>
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
        {show === "graf" &&
          <>
            <h2>Grafico</h2>
            <LineChart width={600} height={300} data={dataA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
            <LineChart width={600} height={300} data={dataA2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#c4091c" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>

          </>
        }
      </div>
    </>
  )
}

export default App

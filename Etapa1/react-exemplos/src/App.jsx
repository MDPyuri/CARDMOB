import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Counter'
import Photo from './components/Photo'

function App() {
  const [count, setCount] = useState(0);
  //cria as variáveis de estado para armazenar as fotos
  const [photos, setPhotos] = useState([]);

  //método para buscar as fotos
  const fetchPhotos = async () => {
    try { //sistema para tratar erros
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos'
      const response = await fetch(url); //faz a requisição por padrão é GET
      
      if (response.status === 200) {
        const data = await response.json(); //converte a resposta para json
        //atualiza o estado com as fotos e recria a url da imagem
        const updatedPhotos = data.map( (photo) => {
          return {
            ...photo, thumbnailUrl: `https://picsum.photos/150?random=${photo.id}` //cria a url da imagem
          }
        })
        setPhotos(updatedPhotos); //atualiza o estado com as fotos
      
      }  
    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <Counter title="Contador Superior"/>
      <Counter initial="77"/>

      <article>
        <h1>Album da API</h1>

        {photos.map((photo) => {
          return (
            // <article key={photo.id}>
            //   <h2>ID #{photo.id} {photo.title}</h2>
            //   <img src={photo.thumbnailUrl} alt={photo.title} />
            // </article>
            <Photo photo={photo}/>
          );
        })}

      </article>

    </>
  )
}

export default App

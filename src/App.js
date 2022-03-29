import './App.css';
import storage from './config/fire'
import React, {useEffect, useState} from 'react'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'
import poke from './assets/poke.gif'
import plus from './assets/plus.png'

function App() {

  const [img, setImg] = useState([])
  const [loading, setLoading] = useState(true)

  // listing image
  const galeri = ref(storage, 'galeri')
  const listImage = () => {
    listAll(galeri)
    .then((res) => {
      res.items.forEach((itemref) => {
        getDownloadURL(itemref)
        .then((url) => {
          setImg(img => [...img, url])
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // upload
  const uploadImage = (e) => {
    setLoading(true)
    setImg([])
    const file = e.target.files[0]
    const uploadedFile = ref(storage, `galeri/${file.name}`)
    uploadBytes(uploadedFile, file)
    .then((img) => {
      console.log('File has been uploaded successfully!')
      listImage()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(()=>{
    listImage()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          My Pokemon <label>
            <input type="file" style={{display: 'none'}} 
            onChange={uploadImage}/>
            <img alt={'plus'} width={15} src={plus}/>
          </label>
        </p>
        
        <div>
        { 
          loading 
          ?
          <img alt={'pokeball'} width={80} src={poke}/>
          :
          img.sort().map((val, i) => (
            <span key={i}>
              <img alt={val} width={100} src={val}/>
            </span>
          ))
        }
        </div>
      
      </header>
    </div>
  );
}

export default App;

import { IDLE_NAVIGATION } from '@remix-run/router'
import React, {useState} from 'react'

export default function TreeInfo({info, handleClick}) {
  // console.log(info, info.image)
  const imageExists = info.image !== undefined
  const [description, setDescription] = useState('');
  const [wikiLink, setWikiLink] = useState('')
  const [wikiImage, setWikiImage] = useState('')
  const [idToDelete, setIdToDelete] = useState(-1)


  const wiki = require('wikipedia');

  (async () => {
    try {
      const page = await wiki.page(info['spc_common']);
      const summary = await page.summary();
      setDescription(`${summary.extract.slice(0, 200)} . . .`)
      // console.log(summary)
      setWikiLink(summary['content_urls'].desktop.page)
      if (info['spc_common']==="black oak") {
        setWikiImage('https://upload.wikimedia.org/wikipedia/commons/e/e1/Quercus_velutina_001.jpg')
      } else {
        setWikiImage(summary.thumbnail.source)
      }
      
    } catch (error) {
      console.log(error);
    }
  })();



  return (
    <div>
        <div className='details'>{info['spc_common']}</div>
        <div className="details">
          <h4>Description</h4>
          <p>{description}</p>
          <a href={imageExists? info.wiki : wikiLink} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>

        <div className="image-container">
          <img src={imageExists ? info.image : wikiImage} alt='image'/>
        </div>
        {info.userAdded ? <button onClick={() => handleClick(info.id)}>X</button> : null}
    </div>
  )
}

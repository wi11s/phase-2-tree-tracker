import { IDLE_NAVIGATION } from '@remix-run/router'
import React, {useState} from 'react'
import { motion } from 'framer-motion';

export default function TreeInfo({info, handleChange}) {
  // console.log(info, info.image)
  const imageExists = info.image !== undefined
  const [description, setDescription] = useState('');
  const [wikiLink, setWikiLink] = useState('')
  const [wikiImage, setWikiImage] = useState('')
  

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
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition:{duration: .8}}}>
        <div className='details'>{info['spc_common']}</div>
        <hr></hr>
        <div className="details">
          <h4>Description</h4>
          <p>{description}</p>
          <div className='moreInfo'>
          <a href={imageExists? info.wiki : wikiLink} target="_blank" rel="noopener noreferrer">More Info</a>
          </div>
        </div>

        <div className="image-container">
          <img src={imageExists ? info.image : wikiImage} alt='image'/>
        </div>
    </motion.div>
  )
}

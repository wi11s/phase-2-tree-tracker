import React, {useState} from 'react';
import treee from '../images/treee.png';

export default function TreeType({tree, trees, userTreesArray}) {
    let collected = false
    
    let length = trees.filter(t => t['spc_common']===tree['spc_common']).length

    let howRare;

    if (length === 1) {
        howRare = 'Very Rare'
    } else if (length <= 5) {
        howRare = 'Rare'
    } else if (length <= 25) {
        howRare = 'Uncommon'
    } else if (length <= 70) {
        howRare = 'Common'
    } else {
        howRare = 'Very Common'
    }
    
    // console.log(userTreesArray.indexOf(tree['spc_common']))
    if (userTreesArray.indexOf(tree['spc_common'].toLowerCase()) > -1) {
        collected = true
    }
  



  return (
    <div className='progress-card'>
        <div className='card-image-container'>
            <img src={treee} alt='image' />
        </div>
        <h3>
            {tree['spc_common'].toLowerCase()}
        </h3>
        <hr></hr>
        <h4>
            {collected ? 'Successfully identified' : 'Not yet identified'}
        </h4>
        <div className="bottom">
            <span>{howRare}</span>
            {collected ? <i class='bx bxs-check-circle'></i> : <span className='circle'></span>}
        </div>
        
    </div>
  )
}
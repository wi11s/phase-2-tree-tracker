import React, {useState} from 'react'

export default function TreeType({tree, trees, userTreesArray}) {
    let collected = false
    
    let length = trees.filter(t => t['spc_common']===tree['spc_common']).length

    let howRare;

    if (length === 1) {
        howRare = 'very rare'
    } else if (length <= 5) {
        howRare = 'rare'
    } else if (length <= 25) {
        howRare = 'uncommon'
    } else if (length <= 70) {
        howRare = 'common'
    } else {
        howRare = 'very common'
    }
    
    // console.log(userTreesArray.indexOf(tree['spc_common']))
    if (userTreesArray.indexOf(tree['spc_common'].toLowerCase()) > -1) {
        collected = true
    }
    
    


  return (
    <div className={collected ? 'collected' : 'uncollected'}>
        <h3>
            {tree['spc_common'].toLowerCase()}
        </h3>
        <p>{howRare}</p>
        
    </div>
  )
}

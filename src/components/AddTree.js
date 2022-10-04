import React, {useState} from 'react'
import ManualForm from './ManualForm';
import AddTreeForm from './AddTreeForm';

function AddTree() {
  const [isManual, setIsManual] = useState(false);

  return (
    <div>
      {isManual ? <ManualForm setIsManual={setIsManual}/> : <AddTreeForm setIsManual={setIsManual}/>}
    </div>
  )
}

export default AddTree;
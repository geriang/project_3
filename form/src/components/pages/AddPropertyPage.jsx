import React from 'react';
import AddProperty from '../form/AddProperty'
import DataProvider from '../form/DataProvider';


function AddPropertyPage() {

  return (
    <>
      <DataProvider>
        <div className='container'>
        <AddProperty />
        </div>

       
        
      </DataProvider>

    </>
  );
}

export default AddPropertyPage;

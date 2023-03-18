import { useState } from "react"
import Button from "../components/Button"
import Modal from "./Modal"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import useGetData from "../custom-hooks/FetchData"
import { server_calls } from "../api/server";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, hideable: true },
  { field: 'make', headerName: 'Make', flex: 1 },
  { field: 'model', headerName: 'Model', flex: 1 },
  { field: 'year', headerName: 'Year', flex: 1 }
]

function DataTables() {
  const [ modalOpen, setModalOpen ] = useState(false)
  const { carData, getData } = useGetData()
  const [ selectedItems, setSelectedItems ] = useState<string[]>([])

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  const deleteData = () => {
    server_calls.delete(selectedItems[0])
    getData()
    console.log(`Selected item: ${selectedItems}`)
    setTimeout(() => window.location.reload(), 500)
} 

  return (
    <>
      <Modal 
        id={selectedItems}
        modalOpen={modalOpen}
        closeModal={closeModal}
      />
      <div className="flex flex-row items-center justify-center">
        <Button 
          className="p-2 bg-gray-100 m-2 rounded hover:bg-gray-300"
          onClick={openModal}
        >
            New Car
        </Button>
        <Button
          className="p-2 bg-gray-100 m-2 rounded hover:bg-gray-300"
          onClick={openModal}
        >
            Update Car
        </Button>
        <Button
          className="p-2 bg-gray-100 m-2 rounded hover:bg-gray-300"
          onClick={deleteData}
        >
            Delete Car
        </Button>
      </div>
      <div 
        className={ modalOpen? "hidden" : "container mx-10 my-5 flex flex-col" }
        style={{ height: 600, width: '100%' }}
      >
        <h2 className="p-3 bg-slate-300 my-2 rounded">Cars Listed</h2>
        <DataGrid
          rows={carData} 
          columns={columns} 
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: {
              columnVisibilityModel: {
                id: false
              }
            }
          }}
          pageSizeOptions={[10,20,30]}
          checkboxSelection={true}
          onRowSelectionModelChange={(item: any) => {
            setSelectedItems(item)
          }}
        />
      </div>
        
    </>
  )
}

export default DataTables
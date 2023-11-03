import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
const Table = (props) => {
  return(
      <DataTable value={props.data}
                 tableStyle={{ minWidth: '50rem' }}
                 paginator
                 rows={5}
                 rowsPerPageOptions={[5, 10, 25, 50]}
                 dataKey="id"
                 header={props.header}
      >
          {
              props.columns.map(item=>(
                  <Column field={item?.field} header={item?.header} body={item?.body}></Column>
              ))
          }

      </DataTable>
  )
}

export default Table
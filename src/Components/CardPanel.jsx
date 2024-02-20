import { Card } from 'primereact/card';

const CardPanel = (props) => {

  return(
      <Card title={props?.title} className={"card-panel"}>
          {
              props?.element
          }
      </Card>
  )
}

export default CardPanel
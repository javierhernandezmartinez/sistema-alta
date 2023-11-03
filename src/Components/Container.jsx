import {useSelector} from "react-redux";
const Container = (props) => {
    const theme = useSelector(state => state.rootTheme)
  return(
      <div className={`container-p ${theme ? "theme-light" : "theme-dark"}`}>
          <div className={"row"}>
              <div className={"col-md-12"}>
                  {props.element}
              </div>
          </div>
      </div>
  )
}

export default Container
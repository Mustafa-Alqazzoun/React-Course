import * as React from "react"
class Header extends React.PureComponent{
componentDidMount(){

}
constructor(props){
    super(props)
    this.state={ message: ["kk","kk"] }

}
// handleClick() {
//     console.log(this)
//     this.setState(prev=>({
//         message:[...prev,"kk"]
//     }))
//   }
//   setItems(prevItems => [...prevItems, 'Grapes']);
render() {
    return (
      <div>
        {/* <h1>{this.state.message}</h1> */}
        <button >Change Message</button>
      </div>
    );
  }
}


export default Header
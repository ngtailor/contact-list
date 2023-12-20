import React from 'react'
import { connect } from 'react-redux'

const Home = (props) => {
  return (
    <div>
      Home{props.batch}
      <button onClick={props.byBet}>But Bat</button>
    </div>
  )
}

const mapStateToProps=(state)=>{
    return{
        batch:state.bat.batch
    }
}

const mapDispatchToProps=(disptach)=>{
    return{
        byBet:()=>disptach({type:"BUY-BET"})
    }

}

export default connect(mapStateToProps,mapDispatchToProps) (Home)

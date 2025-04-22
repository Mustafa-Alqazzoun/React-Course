import { useMemo } from "react"

const Calculation=(props)=>{
    console.log(props,"props")
    const double= useMemo(()=>{
        console.log("calculation")
        return props.number*2
    }, [props.number])
    return (
        <div>
           number: {double}
        </div>
    )
}
export default Calculation
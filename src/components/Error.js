import Header from "./Header"


const Error = ({error}) => {
    return <>
    <Header/>
    <div>
        <h1>Error page :{error}</h1>
    </div>
    </>
}
export default Error
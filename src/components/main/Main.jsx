import {
    // useEffect,
    useState
} from "react";
import { API_DOMAIN } from "../../config/constants";
// import axios from "axios";

function Main() {
    const [data] = useState(0);

    // useEffect(() => {
    //     console.log(API_DOMAIN);

    //     (async () => {
    //         console.log('hello');
    //         try {

    //             const response = await axios.get("http://localhost:3000/admin/info")
    //             console.log(response);

    //         } catch (err) {
    //             console.log(err);

    //         }


    //     })()
    // }, [])
    // useEffect(() => () => console.log('unmount'))

    return (
        <main>{data}</main>
    )
}

export default Main;
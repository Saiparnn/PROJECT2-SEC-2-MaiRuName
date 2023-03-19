import {ref} from "vue";

const MovieBox =({name, category, storyLine, director, writer, star, firstReleaseDAte})=>{

    // const [show, setShow]=useState(false);
    const [show, setShow] = ref(false)

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);
}
export { MovieBox }
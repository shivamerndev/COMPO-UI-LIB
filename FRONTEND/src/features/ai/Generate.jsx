import { useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import CodePart from './components/CodePart.jsx';
import LeftChat from './components/LeftChat.jsx';
import PromptInput from './components/PromptInput.jsx';
import { useParams } from 'react-router-dom';
import useCompo from '../code/hooks/useCompo.js';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useGenerate from './hook/useGenerate.js';


const Generate = () => {

    const { cid } = useParams()
    const { handleGetCompoById } = useCompo()
    const loggedInUser = useSelector(state => state.auth.user)
    const webBuilder = useSelector(state => state.component.webBuilder)
    const [searchParams, setSearchParams] = useSearchParams()
    const { handleWebBuilder } = useGenerate()

    useEffect(() => {
        const web = searchParams.get("web")
        if (cid) {
            handleGetCompoById(cid)
        }
        if (web) {
            handleWebBuilder()
        }
    }, [cid])


    return (
        <div style={{gridTemplateColumns : "auto 2fr"}} className="h-screen grid overflow-hidden w-full  bg-black text-white">
            <Sidebar props={{ setSearchParams, webBuilder }} />
            <CodePart cid={cid} />
            {/* <LeftChat props={{loggedInUser}} /> */}
        </div>
    );
};

export default Generate;
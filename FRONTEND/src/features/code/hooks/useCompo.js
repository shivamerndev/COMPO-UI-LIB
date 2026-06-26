import { useDispatch } from "react-redux";
import componentService from "../service/component.service";
import { setCode, setComponents, setCurrentComponent } from "../component.slice";
import { toast } from "react-toastify"

const useCompo = () => {

    const dispatch = useDispatch()

    const handleCreateComponent = async (payload) => {
        const res = await componentService.createService(payload)
        console.log(res)
    }


    const handleGetSavedComponents = async () => {
        const res = await componentService.getSavedService()
        dispatch(setComponents(res))
    }

    const handleGetMyProjects = async () => {
        const res = await componentService.getMyProjects()
        dispatch(setComponents(res))
    }


    const handleNpmPublish = async (cid) => {
        const res = await componentService.npmPublishService(cid)
        toast.success(res.message)
    }


    const handleGetComponents = async () => {
        const res = await componentService.getAllService()
        dispatch(setComponents(res))
    }


    const handleGetCompoById = async (id) => {
        const res = await componentService.getByIdService(id)

        dispatch(setCode(res.code))
        dispatch(setCurrentComponent(res))
    }


    const handleUpdateComponent = async (id, payload) => {

        const res = await componentService.updateService(id, payload)
        toast.success(res.message)
    }


    const handleDeleteComponent = async (id) => {

        const res = await componentService.deleteService(id)
        console.log(res)
    }

    const handleDownloadCode = (code) => {
        const element = document.createElement('a')
        const file = new Blob([code], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `component.jsx`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const handleSetCode = (code) => {
        dispatch(setCode(code))
    }


    return { handleGetComponents, handleNpmPublish, handleGetMyProjects, handleGetSavedComponents, handleCreateComponent, handleDownloadCode, handleGetCompoById, handleUpdateComponent, handleDeleteComponent, handleSetCode };
};

export default useCompo;
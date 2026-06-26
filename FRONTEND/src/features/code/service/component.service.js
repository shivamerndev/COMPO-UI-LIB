import { api } from "../../../utils/axios.utils"

const componentService = {

  createService: async (payload) => {
    const { data } = await api.post("/component", payload)
    return data.data
  },

  getAllService: async () => {
    const { data } = await api.get("/component")
    return data.data // returns array
  },

  getSavedService: async () => {
    const { data } = await api.get("/component/saved")
    return data.data
  },

  getMyProjects: async () => {
    const { data } = await api.get("/component/my-projects")
    return data.data
  },


  npmPublishService: async (cid) => {
    const { data } = await api.post("/component/npm/" + cid)
    return data
  },


  getByIdService: async (id) => {
    const { data } = await api.get(`${"/component"}/${id}`)
    return data.data
  },

  updateService: async (id, payload) => {
    const { data } = await api.patch(`${"/component"}/${id}`, payload)
    return data
  },


  deleteService: async (id) => {
    const { data } = await api.delete(`${"/component"}/${id}`)
    return data
  },
}

export default componentService

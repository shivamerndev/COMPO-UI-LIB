import { baseURL } from "../../../utils/axios.utils";

const componentService = {

    generateService: async ({ prompt, token, getChunks, onError }) => {

        const response = await fetch(baseURL + "/component/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ prompt })
        })

        if (!response.ok) {
            const error = await response.json()
            onError(error);
            return;
        }

        const decoder = new TextDecoder()

        for await (const chunk of response.body) {

            const text = decoder.decode(chunk)

            text.split("\n\n").forEach(e => {
                if (e.startsWith("chunk:")) {
                    let data = JSON.parse(e.replace("chunk: ", "")).response
                    getChunks(data)
                }
            })
        }
    }
}



export default componentService
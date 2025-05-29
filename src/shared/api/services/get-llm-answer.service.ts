import { axiosWithAuth } from "../interceptors/interceptors"
export const GetService = {
    async getLLMAnswer(prompt: string, letter_id: string | null = null) {
    const params = new URLSearchParams()
    params.append('prompt', prompt)
    if (letter_id) {
        params.append('letter_id', letter_id)
    }

    const response = await axiosWithAuth.get<{
        ai_answer: string
    }>(`https:yamata-no-orochi.nktkln.com/models?${params.toString()}`)

    return response.data
    }
}
import axios from 'axios'

const API_URL = "https://vwabyciihugxaimlzskb.supabase.co/rest/v1/notes"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YWJ5Y2lpaHVneGFpbWx6c2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NzQwNzYsImV4cCI6MjA2NTM1MDA3Nn0.oZ8nBARh6IeGyLdzesknSZ-Rsuz5WfSlpiIQMuuK-rY"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

     async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },

    async updateNote(id, data) {
        try {
            const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
            return response.data
        } catch (error) {
            console.error("Error during update:", error)
            throw new Error("Gagal memperbarui catatan.")
        }
    }
}
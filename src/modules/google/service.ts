
import http from "@providers/http"
import type { VideoList, VideoSearch } from "@modules/google/types"

const BASE_URL="https://www.googleapis.com/youtube/v3"
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

export const categoryTecnologyId = 28

export class YoutubeVideosService {

    static async list(maxResults: number = 5, category: number = 0): Promise<VideoList[]>{

        let queryString = `part=snippet&chart=mostPopular&key=${GOOGLE_API_KEY}&maxResults=${maxResults}&regionCode=BR`

        if (category) queryString = `${queryString}&videoCategoryId=${category}`

        const { items } = (await http.get(`${BASE_URL}/videos?${queryString}`)).data
        
        const itemsFormatted = items.map((videoList: any) => {
            const { 
                snippet : {title, description, thumbnails, channelTitle},
            } = videoList

            const { medium, maxres } = thumbnails


            return {
                title, description, channelTitle, thumbnails: {medium, maxres}
            }
        })

        return itemsFormatted
    }

    static async search(description: string, maxResults: number = 10): Promise<VideoSearch[]>{

        let queryString = `part=snippet&key=${GOOGLE_API_KEY}&maxResults=${maxResults}&q=${description}&regionCode=BR&type=video`

        const { items } = (await http.get(`${BASE_URL}/search?${queryString}`)).data
        
        const itemsFormatted = items.map((videoList: any) => {
            const { 
                snippet : {title, description, thumbnails, channelTitle},
            } = videoList

            const { medium, high } = thumbnails


            return {
                title, description, channelTitle, thumbnails: {medium, high}
            }
        })

        return itemsFormatted
    }
    
}
import { axios, axiosWithToken } from "@providers/http";
import type {
  Token,
  User,
  VideoList,
  VideoSearch,
  Channel,
  VideoPayload,
} from "@modules/google/types";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const categoryTecnologyId = 28;

export class YoutubeVideosService {
  static async list(
    maxResults: number = 5,
    category: number = 0
  ): Promise<VideoList[]> {
    let queryString = `part=snippet&chart=mostPopular&key=${GOOGLE_API_KEY}&maxResults=${maxResults}&regionCode=BR`;

    if (category) queryString = `${queryString}&videoCategoryId=${category}`;

    const { items } = (await axios.get(`${BASE_URL}/videos?${queryString}`))
      .data;

    const itemsFormatted = items.map((videoList: any) => {
      const {
        snippet: { title, description, thumbnails, channelTitle },
      } = videoList;

      const { medium, maxres } = thumbnails;

      return {
        title,
        description,
        channelTitle,
        thumbnails: { medium, maxres },
      };
    });

    return itemsFormatted;
  }

  static async search(
    description: string,
    maxResults: number = 10,
    channelId: string = ""
  ): Promise<VideoSearch[]> {
    const queryString = `part=snippet&key=${GOOGLE_API_KEY}&maxResults=${maxResults}&q=${description}&regionCode=BR&type=video&channelId=${channelId}`;
    const { items } = (await axios.get(`${BASE_URL}/search?${queryString}`))
      .data;

    const itemsFormatted = items.map((videoList: any) => {
      const {
        snippet: { title, description, thumbnails, channelTitle },
      } = videoList;

      const { medium, high } = thumbnails;

      return {
        title,
        description,
        channelTitle,
        thumbnails: { medium, high },
      };
    });

    return itemsFormatted;
  }

  static async create(
    payload: VideoPayload,
    acessToken: string
  ): Promise<true> {
    const formData = new FormData();
    const payloadFormData: any = payload;

    Object.keys(payload).forEach((key) => {
      formData.append(key, payloadFormData[key]);
    });
    await axios.post(
      `${API_URL}/videos/?access_token=${acessToken}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return true;
  }
}

export class TokenService {
  static async create(code: string): Promise<Token> {
    const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const client_secret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

    const tokenPayload = {
      code,
      client_id,
      client_secret,
      grant_type: "authorization_code",
      redirect_uri: "http://127.0.0.1:5173",
    };
    const { access_token } = (
      await axios.post("https://oauth2.googleapis.com/token", tokenPayload)
    ).data;

    return { access_token };
  }
}

export class UserService {
  static async get(): Promise<User> {
    const { name, picture } = (
      await axiosWithToken.get("https://www.googleapis.com/oauth2/v1/userinfo")
    ).data;

    return { picture, name };
  }
}

export class ChannelService {
  static async get(): Promise<Channel> {
    const { items } = (
      await axiosWithToken.get(
        "https://www.googleapis.com/youtube/v3/channels?mine=true"
      )
    ).data;

    const { id: channelId } = items[0];
    return { channelId };
  }
}

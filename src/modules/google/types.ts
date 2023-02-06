export type VideoListThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type VideoList = {
  title: string;
  description: string;
  thumbnails: {
    medium: VideoListThumbnail;
    maxres: VideoListThumbnail;
  };
  channelTitle: string;
};

export type VideoSearch = {
  title: string;
  description: string;
  thumbnails: {
    medium: VideoListThumbnail;
    high: VideoListThumbnail;
  };
  channelTitle: string;
};

export type Token = {
  access_token: string;
};

export type User = {
  name: string;
  picture: string;
};

export type Channel = {
  channelId: string;
};

export type VideoPayload = {
  description: string;
  title: string;
  media: any;
};

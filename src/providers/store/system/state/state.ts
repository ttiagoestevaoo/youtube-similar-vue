import type { SystemState } from "@providers/store/system/state/types";

export const systemState: SystemState = {
  homePageVideos: [],
  tecnologyVideos: [],
  videosList: [],
  historySearch: [],
  user: {
    name: "",
    picture: "",
    channelId: "",
  },
  myVideosList: [],
};

import type { VideoList, VideoSearch } from "@modules/google";
import type { SystemState as State } from "@providers/store/system/state/types";

export type SystemGetters = {
  getHomePageVideos(state: State): VideoList[];
  getTecnologyPageVideos(state: State): VideoList[];
  getVideosList(state: State): VideoSearch[];
  getHistorySearch(state: State): string[];
};

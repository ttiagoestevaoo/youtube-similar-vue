import type { MutationTree } from "vuex";
import type { SystemState as State } from "@providers/store/system/state";
import type { SystemMutations } from "@providers/store/system/mutations/types";
import { SystemMutationTypes } from "@providers/store/system/mutations/types";
import type { VideoList, VideoSearch } from "@modules/google";

export const systemMutations: MutationTree<State> & SystemMutations<State> = {
  [SystemMutationTypes.SET_HOME_PAGE_VIDEOS](
    state: State,
    videoList: VideoList[]
  ): void {
    const TEMP = state;
    TEMP.homePageVideos = videoList;
    state = TEMP;
  },
  [SystemMutationTypes.SET_TECNOLOGY_PAGE_VIDEOS](
    state: State,
    videoList: VideoList[]
  ): void {
    const TEMP = state;
    TEMP.tecnologyVideos = videoList;
    state = TEMP;
  },
  [SystemMutationTypes.SET_VIDEOS_LIST](
    state: State,
    videoList: VideoSearch[]
  ): void {
    const TEMP = state;
    TEMP.videosList = videoList;
    state = TEMP;
  },
  [SystemMutationTypes.SET_HISTORY_SEARCH](state: State, historySearch): void {
    const TEMP = state;
    TEMP.historySearch = historySearch;
    state = TEMP;
  },
  [SystemMutationTypes.SET_USER](state: State, user): void {
    const TEMP = state;
    TEMP.user = user;
    state = TEMP;
  },
  [SystemMutationTypes.SET_MY_VIDEOS_LIST](
    state: State,
    videoList: VideoSearch[]
  ): void {
    const TEMP = state;
    TEMP.myVideosList = videoList;
    state = TEMP;
  },
};

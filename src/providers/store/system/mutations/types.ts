import type { Channel, User, VideoList, VideoSearch } from "@modules/google";

export enum SystemMutationTypes {
  SET_HOME_PAGE_VIDEOS = "SET_HOME_PAGE_VIDEOS",
  SET_TECNOLOGY_PAGE_VIDEOS = "SET_TECNOLOGY_PAGE_VIDEOS",
  SET_VIDEOS_LIST = "SET_VIDEOS_LIST",
  SET_HISTORY_SEARCH = "SET_HISTORY_SEARCH",
  SET_USER = "SET_USER",
  SET_MY_VIDEOS_LIST = "SET_MY_VIDEOS_LIST",
}

export type SystemMutations<State> = {
  [SystemMutationTypes.SET_HOME_PAGE_VIDEOS](
    state: State,
    videoList: VideoList[]
  ): void;
  [SystemMutationTypes.SET_TECNOLOGY_PAGE_VIDEOS](
    state: State,
    videoList: VideoList[]
  ): void;
  [SystemMutationTypes.SET_VIDEOS_LIST](
    state: State,
    videoList: VideoSearch[]
  ): void;
  [SystemMutationTypes.SET_HISTORY_SEARCH](
    state: State,
    suggestions: string[]
  ): void;
  [SystemMutationTypes.SET_USER](state: State, user: User & Channel): void;
  [SystemMutationTypes.SET_MY_VIDEOS_LIST](
    state: State,
    videoList: VideoSearch[]
  ): void;
};

import type { VideoList, VideoSearch } from "@modules/google";
import type { SystemState as State } from "@providers/store/system/state/types"; 

export enum SystemMutationTypes {
    SET_HOME_PAGE_VIDEOS = "SET_HOME_PAGE_VIDEOS",
    SET_TECNOLOGY_PAGE_VIDEOS = "SET_TECNOLOGY_PAGE_VIDEOS",
    SET_VIDEOS_LIST = "SET_VIDEOS_LIST",
    SET_HISTORY_SEARCH = "SET_HISTORY_SEARCH",
}

export type SystemMutations<S = State> = {
    [SystemMutationTypes.SET_HOME_PAGE_VIDEOS](state: State, VideoList: VideoList[]): void
    [SystemMutationTypes.SET_TECNOLOGY_PAGE_VIDEOS](state: State, VideoList: VideoList[]): void
    [SystemMutationTypes.SET_VIDEOS_LIST](state: State, VideoList: VideoSearch[]): void
    [SystemMutationTypes.SET_HISTORY_SEARCH](state: State, suggestions: string[]): void
}

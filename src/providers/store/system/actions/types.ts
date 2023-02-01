import type { ActionContext } from "vuex";
import type { State as RootState } from "@providers/store";
import type { SystemMutations } from "@providers/store/system/mutations/types";
import type { SystemState as State} from "@providers/store/system/state/types";

export enum SystemActionTypes {
    GET_HOME_PAGE_VIDEOS = "GET_HOME_PAGE_VIDEOS",
    GET_TECNOLOGY_PAGE_VIDEOS = "GET_TECNOLOGY_PAGE_VIDEOS",
    GET_VIDEOS_LIST = "GET_VIDEOS_LIST",
}

export interface SystemActions {
    [SystemActionTypes.GET_HOME_PAGE_VIDEOS]({commit}: AugmentedActionContext): void
    [SystemActionTypes.GET_TECNOLOGY_PAGE_VIDEOS]({commit}: AugmentedActionContext): void
    [SystemActionTypes.GET_VIDEOS_LIST]({commit}: AugmentedActionContext, searchVideo: string): void
}

export type AugmentedActionContext = {
    commit<K extends keyof SystemMutations>(
        key: K,
        payload?: Parameters<SystemMutations[K]>[1],
    ): ReturnType<SystemMutations[K]>
} & Omit<ActionContext<State, RootState>, "commit">;

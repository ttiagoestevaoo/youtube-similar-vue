import type { ActionContext } from "vuex";
import type { State as RootState } from "@providers/store";
import type { SystemMutations } from "@providers/store/system/mutations/types";
import type { SystemState as State } from "@providers/store/system/state/types";
import type { VideoPayload } from "@modules/google";

export enum SystemActionTypes {
  GET_HOME_PAGE_VIDEOS = "GET_HOME_PAGE_VIDEOS",
  GET_TECNOLOGY_PAGE_VIDEOS = "GET_TECNOLOGY_PAGE_VIDEOS",
  GET_VIDEOS_LIST = "GET_VIDEOS_LIST",
  AUTH_GET_TOKEN = "AUTH_GET_TOKEN",
  GET_USER_INFO = "GET_USER_INFO",
  AUTH_CLEAR_TOKEN = "AUTH_CLEAR_TOKEN",
  GET_MY_VIDEOS_LIST = "GET_MY_VIDEOS_LIST",
  CREATE_VIDEO = "CREATE_VIDEO",
}

export interface SystemActions {
  [SystemActionTypes.GET_HOME_PAGE_VIDEOS]({
    commit,
  }: AugmentedActionContext): void;
  [SystemActionTypes.GET_TECNOLOGY_PAGE_VIDEOS]({
    commit,
  }: AugmentedActionContext): void;
  [SystemActionTypes.GET_VIDEOS_LIST](
    { commit }: AugmentedActionContext,
    searchVideo: string
  ): void;
  [SystemActionTypes.AUTH_GET_TOKEN](
    { commit }: AugmentedActionContext,
    authorizationCode: string
  ): void;
  [SystemActionTypes.GET_USER_INFO]({ commit }: AugmentedActionContext): void;
  [SystemActionTypes.AUTH_CLEAR_TOKEN]({
    commit,
  }: AugmentedActionContext): void;
  [SystemActionTypes.GET_MY_VIDEOS_LIST]({
    commit,
  }: AugmentedActionContext): void;
  [SystemActionTypes.CREATE_VIDEO](
    { commit }: AugmentedActionContext,
    payload: VideoPayload
  ): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof SystemMutations<State>>(
    key: K,
    payload?: Parameters<SystemMutations<State>[K]>[1]
  ): ReturnType<SystemMutations<State>[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

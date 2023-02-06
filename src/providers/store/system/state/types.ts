import type { CommitOptions, DispatchOptions, Store as VuexStore } from "vuex";

import type { SystemMutations } from "@providers/store/system/mutations";
import type { SystemGetters } from "@providers/store/system/getters";
import type { SystemActions } from "@providers/store/system/actions";
import type { Channel, User, VideoList, VideoSearch } from "@modules/google";

export interface SystemState {
  homePageVideos: VideoList[];
  tecnologyVideos: VideoList[];
  videosList: VideoSearch[];
  historySearch: string[];
  user: User & Channel;
  myVideosList: VideoSearch[];
}

export type Store<S = SystemState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof SystemMutations<SystemState>,
    P extends Parameters<SystemMutations<SystemState>[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<SystemMutations<SystemState>[K]>;
} & {
  getters: {
    [K in keyof SystemGetters]: ReturnType<SystemGetters[K]>;
  };
} & {
  dispatch<K extends keyof SystemActions>(
    key: K,
    payload?: Parameters<SystemActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<SystemActions[K]>;
};

import type { GetterTree } from "vuex";
import type { State as RootState } from "@providers/store";
import type { SystemState as State } from "@providers/store/system/state/types";
import type { SystemGetters } from "@providers/store/system/getters/types";
import { getHistoryLocalStorage } from "@providers/mixins"

export const systemGetters: GetterTree<State, RootState> & SystemGetters = {
    getHomePageVideos: (state: State) => state.homePageVideos,
    getTecnologyPageVideos: (state: State) => state.tecnologyVideos,
    getVideosList: (state: State) => state.videosList,
    getHistorySearch: (state: State) => state.historySearch.reverse()
}
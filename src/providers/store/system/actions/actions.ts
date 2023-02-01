import type { ActionTree } from "vuex";
import type { State as RootState } from "@providers/store";
import type { SystemActions } from "@providers/store/system/actions/types";
import type { SystemState as State } from "@providers/store/system/state";
import { SystemActionTypes } from "@providers/store/system/actions/types";
import { SystemMutationTypes } from "@providers/store/system/mutations";
import { categoryTecnologyId, YoutubeVideosService } from "@modules/google";

export const systemActions: ActionTree<State, RootState> & SystemActions = {
  async [SystemActionTypes.GET_HOME_PAGE_VIDEOS]({ commit }) {
    const videosList = await YoutubeVideosService.list();
    commit(SystemMutationTypes.SET_HOME_PAGE_VIDEOS, videosList);
  },
  async [SystemActionTypes.GET_TECNOLOGY_PAGE_VIDEOS]({ commit }) {
    const videosList = await YoutubeVideosService.list(6, categoryTecnologyId);
    commit(SystemMutationTypes.SET_TECNOLOGY_PAGE_VIDEOS, videosList);
  },
  async [SystemActionTypes.GET_VIDEOS_LIST]({ commit }, searchVideo) {
    const videosList = await YoutubeVideosService.search(searchVideo, 20);

    const history = localStorage.getItem("history") ?? "";
    let searchList = history ? JSON.parse(history) : [];

    if (
      Array.isArray(searchList) &&
      !searchList.includes(searchVideo.toLowerCase())
    ) {
      if (searchList.length == 10) {
        searchList = searchList.filter((_, index) => index > 0);
      }

      searchList.push(searchVideo.toLowerCase());
    }

    localStorage.setItem("history", JSON.stringify(searchList));
    commit(SystemMutationTypes.SET_HISTORY_SEARCH, searchList);
    commit(SystemMutationTypes.SET_VIDEOS_LIST, videosList);
  },
};

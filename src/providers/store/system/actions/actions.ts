import type { ActionTree } from "vuex";
import type { State as RootState } from "@providers/store";
import type { SystemActions } from "@providers/store/system/actions/types";
import type { SystemState as State } from "@providers/store/system/state";
import { SystemActionTypes } from "@providers/store/system/actions/types";
import { SystemMutationTypes } from "@providers/store/system/mutations";
import {
  categoryTecnologyId,
  ChannelService,
  TokenService,
  UserService,
  YoutubeVideosService,
} from "@modules/google";
import { useSession } from "@providers/hooks";

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
  async [SystemActionTypes.AUTH_GET_TOKEN](_, authorizationCode) {
    const token = await TokenService.create(authorizationCode);

    const { setToken } = useSession();
    setToken(token);
  },
  async [SystemActionTypes.GET_USER_INFO]({ commit }) {
    const { getToken } = useSession();

    if (getToken().hasSession) {
      const user = await UserService.get();
      const channel = await ChannelService.get();
      commit(SystemMutationTypes.SET_USER, { ...user, ...channel });
    }
  },
  async [SystemActionTypes.AUTH_CLEAR_TOKEN]({ commit }) {
    const { setToken } = useSession();
    setToken(null);
    commit(SystemMutationTypes.SET_USER, {
      name: "",
      picture: "",
      channelId: "",
    });
  },
  async [SystemActionTypes.GET_MY_VIDEOS_LIST]({ commit, getters }) {
    const videosList = await YoutubeVideosService.search(
      "",
      20,
      getters.getUser.channelId
    );

    commit(SystemMutationTypes.SET_MY_VIDEOS_LIST, videosList);
  },
  async [SystemActionTypes.CREATE_VIDEO](_, payload) {
    const { getToken } = useSession();
    await YoutubeVideosService.create(payload, getToken().access_token);
  },
};

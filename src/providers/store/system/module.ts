import { systemActions } from "@providers/store/system/actions";
import { systemMutations } from "@providers/store/system/mutations";
import { systemState } from "@providers/store/system/state";
import { systemGetters } from "@providers/store/system/getters";

export const SystemModule: any = {
  state: systemState,
  mutations: systemMutations,
  actions: systemActions,
  getters: systemGetters,
};

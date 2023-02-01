import { createStore, createLogger } from "vuex";

import { SystemModule } from "@providers/store/system";

import type {
  Store as SystemStore,
  SystemState,
} from "@providers/store/system";

export type State = {
  system: SystemState;
};

export type Store = SystemStore<Pick<State, "system">>;

const store = createStore({
  plugins: import.meta.env.NODE_ENV === "production" ? [] : [createLogger()],
  modules: {
    system: SystemModule,
  },
});

export function useStore() {
  return store as Store;
}

export default store;

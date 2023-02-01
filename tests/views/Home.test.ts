import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Home from "@ui/views/home/index.vue";
import { useStore } from "@providers/store";
import { SystemActionTypes } from "@providers/store/system";

describe("Home", () => {
  it("Home view is mounted", () => {
    const store = useStore();

    store.dispatch = vi.fn();
    mount(Home, { global: { stubs: ["p-card"], plugins: [] } });

    expect(store.dispatch).toBeCalledWith(
      SystemActionTypes.GET_HOME_PAGE_VIDEOS
    );
    expect(store.dispatch).toBeCalledWith(
      SystemActionTypes.GET_TECNOLOGY_PAGE_VIDEOS
    );
  });
});

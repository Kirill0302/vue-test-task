<template>
  <section class="main-page">
    <div>
      <window
        v-for="window in visibleWindows"
        :key="window.id"
        :setting="window"
        @positionChange="changeWindowState"
      />
    </div>
    <div>
      <button
        @click="listWindIsActive = !listWindIsActive"
        class="add-button"
        :disabled="hiddenWindows.length === 0"
      >
        + add window
      </button>
      <div v-if="listWindIsActive" class="list">
        <button
          v-for="windows in hiddenWindows"
          :key="windows.id"
          @click="addWindow(windows.id)"
          class="list-item"
        >
          Title {{ windows.id }}
        </button>
      </div>
    </div>
  </section>
</template>
<script lang='ts'>
import { computed, defineComponent, ref, watch } from "vue";
import Window from "../components/molecules/Window.vue";
import { WindowType } from "../types/window";
import { defaultWindowsSettings } from "../defaultWindowsSettings";
export default defineComponent({
  components: {
    Window,
  },
  setup() {
    const state = ref<Array<WindowType>>([]);
    const gridSize = 10;
    if (!localStorage.getItem("getWindowState")) {
      state.value = defaultWindowsSettings;
    } else {
      const localInfo = localStorage.getItem("getWindowState");
      if (localInfo) state.value = JSON.parse(localInfo);
    }
    const visibleWindows = computed(() => {
      return state.value.filter((item) => item.visible);
    });
    const hiddenWindows = computed(() => {
      return state.value.filter((item) => !item.visible);
    });
    const roundToGridSize = function (value: number) {
      return Math.round(value / gridSize) * gridSize;
    };
    const changeWindowState = function (value: WindowType) {
      const index = state.value.findIndex((item) => item.id === value.id);
      if (index !== -1) {
        state.value[index] = value;
        state.value[index].x = roundToGridSize(state.value[index].x);
        state.value[index].y = roundToGridSize(state.value[index].y);
        state.value[index].w = roundToGridSize(state.value[index].w);
        state.value[index].h = roundToGridSize(state.value[index].h);
      }
    };
    const PlaceWindowToCenter = function(value: WindowType) {
        value.x = window.outerWidth / 2 - 150;
        value.y = window.outerHeight / 2 - 50;
        value.h = 100
        value.w = 300
    }
    const listWindIsActive = ref(false);
    const addWindow = function (id) {
      const index = state.value.findIndex((item) => item.id === id);
      state.value[index].visible = true;
      PlaceWindowToCenter( state.value[index])
      listWindIsActive.value = false;
    };
    watch(
      () => state.value,
      () => {
        localStorage.setItem("getWindowState", JSON.stringify(state.value));
      },
      { deep: true }
    );
    return {
      visibleWindows,
      changeWindowState,
      hiddenWindows,
      listWindIsActive,
      addWindow,
    };
  },
});
</script>
<style scoped>
.main-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.add-button {
  background-color: white;
  width: 300px;
  height: 100px;
}
.list-item {
  background-color: white;
  width: 300px;
  height: auto;
  padding-bottom: 10px;
  padding-top: 10px;
}
.list {
  display: flex;
  flex-direction: column;
}
</style>
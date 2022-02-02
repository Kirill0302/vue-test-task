<template>
  <Vue3DraggableResizable
    :initW="stateSetting.w"
    :initH="stateSetting.h"
    v-model:x="stateSetting.x"
    v-model:y="stateSetting.y"
    v-model:w="stateSetting.w"
    v-model:h="stateSetting.h"
    v-model:active="active"
    :handles="['br']"
    :minW="70"
    :minH="70"
    :draggable="true"
    :resizable="true"
    @drag-end="onDragAndonResizeAnd()"
    @resize-end="onDragAndonResizeAnd()"
    class="main"
    :class="[active ? 'main-activ' : 'main-inactive']"
  >
    <div :class="[active ? 'header-activ' : 'header']">
      <span>
        <p>Title {{ setting.id }}</p>
        <button @click="closeWindow">x</button>
      </span>
    </div>
  </Vue3DraggableResizable>
</template>
<script lang='ts'>
import { defineComponent, ref, PropType } from "vue";
import { WindowType } from "../../types/window";
export default defineComponent({
  props: {
    setting: {
      type: Object as PropType<WindowType>,
      required: true,
    },
  },
  emits: ["positionChange"],
  setup(props, { emit }) {
    const stateSetting = ref<WindowType>({
      id: props.setting.id,
      x: props.setting.x,
      y: props.setting.y,
      w: props.setting.w,
      h: props.setting.h,
      visible: props.setting.visible,
    });
    const active = ref<boolean>(false);
    const onDragAndonResizeAnd = function () {
      emit("positionChange", stateSetting.value);
    };
    const closeWindow = function () {
      (stateSetting.value.visible = false), onDragAndonResizeAnd();
    };
    return { active, onDragAndonResizeAnd, closeWindow, stateSetting };
  },
});
</script>
<style scoped>
.main {
  border: 2px solid;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
}
.main-activ {
  z-index: 10;
}
.main-inactive {
  z-index: 1;
}
button {
  border: 2px solid;
  margin: 10px;
  margin-top: auto;
  margin-bottom: auto;
}
span {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.header {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: rgb(206, 216, 241);
}
.header-activ {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: rgb(133, 171, 253);
}
p {
  padding-left: 10px;
}
</style>

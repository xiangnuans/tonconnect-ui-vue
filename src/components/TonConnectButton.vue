<script lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted, isVue2, PropType } from "vue-demi";
import { useTonConnectUI } from "../hooks/useTonConnectUI";

export default defineComponent({
  name: "TonConnectButton",
  props: {
    buttonRootId: {
      type: String as PropType<string>,
      default: "ton-connect-button",
    },
  },
  setup(props, { slots }) {
    const { setOptions } = useTonConnectUI();

    // 组件挂载时调用
    onMounted(() => {
      setOptions({ buttonRootId: props.buttonRootId });
    });

    // 组件卸载时调用
    onBeforeUnmount(() => {
      setOptions({ buttonRootId: null });
    });

    // 返回虚拟节点
    return () => {
      // 根据 Vue 版本来调整 vnodeData
      const vnodeData = {
        style: { width: "fit-content" },
        ...(isVue2 ? { attrs: { id: props.buttonRootId || "" } } : { id: props.buttonRootId || "" }),
      };

      // 使用 h 函数生成虚拟节点
      return h(
        "div",
        vnodeData,
        slots.default ? slots.default() : null
      );
    };
  },
});
</script>
<template>
  <div class="main-blockchain">
    <h1>Blockchain</h1>
    <div class="buttons">
      <button @click="stopTransactions()" class="stop">Stop</button>
      <button @click="startTransactions()" class="start">Start</button>
      <button @click="clearTransactions()" class="clear">Clear</button>
    </div>
    <p>Sum: {{ sumTransactions }} BTC</p>
    <div class="frame-table">
      <table>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
        <tr v-for="item in arrTransactions" :key="item.hash">
          <td>
            <div v-for="fromItem in item.inputs" :key="fromItem.sequence">
              <p>{{ fromItem.prev_out.addr }}</p>
            </div>
          </td>
          <td>
            <div v-for="ToItem in item.out" :key="ToItem.addr">
              <p>{{ ToItem.addr }}</p>
            </div>
          </td>
          <td>
            <p>{{ item.size }}</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from "vue";
import {  BtcType } from "../../src/types/btc";
export default defineComponent({
  setup() {
    const sumTransactions = ref(0);
    const arrTransactions = ref<Array<BtcType>>([]);

    const ws = new WebSocket("wss://ws.blockchain.info/inv");

    ws.onmessage = function (event) {
      const value = JSON.parse(event.data);
      sumTransactions.value += value.x.size;
      arrTransactions.value.unshift(value.x);
    };

    const startTransactions = function () {
      ws.send(JSON.stringify({ op: "unconfirmed_sub" }));
    };
    const stopTransactions = function () {
      ws.send(JSON.stringify({ op: "unconfirmed_unsub" }));
    };
    const clearTransactions = function () {
      arrTransactions.value = [];
      sumTransactions.value = 0;
    };
    //В большом прокекте работу с ws можно вынести в composables 
    return {
      sumTransactions,
      arrTransactions,
      stopTransactions,
      startTransactions,
      clearTransactions,
    };
  },
});
</script>
<style scoped>
.main-blockchain {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
table,
th,
td {
  border: 1px solid black;
}
th {
  width: 500px;
}
td {
  max-width: 500px;
}
p {
  text-overflow: clip;
}
.frame-table {
  border: 3px solid;
  max-height: 900px;
  min-height: 100px;
  width: 1500px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  margin-left: auto;
  margin-right: auto;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
}
button {
  padding: 10px;
  margin: 10px;
  width: 200px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 45px;
  color: white;
}
button:hover {
  opacity: 70%;
}
.stop {
  background-color: rgb(255, 38, 0);
}
.start {
  background-color: rgb(36, 187, 49);
}
.clear {
  background-color: rgb(223, 209, 16);
}
</style>
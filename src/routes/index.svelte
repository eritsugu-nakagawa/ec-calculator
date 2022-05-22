<script lang="ts">
  import { ScaleOut } from 'svelte-loading-spinners';
  import { Container, Card } from 'svelte-chota';

  import CardList from '../components/CardList.svelte';
  import SelectList from '../components/SelectList.svelte';

  let enchantSelectList: number[] = [0];
  let items: cardItem[] = [];

  function costCalculation() {
    items = enchantSelectList
      .map((id) => {
        const idx = enchantList.findIndex((value) => value.id === id);
        return {
          id: [enchantList[idx].id],
          name: [enchantList[idx].name],
          cost: enchantList[idx].cost,
          createCount: 0,
          createCost: 0,
          mergeGrid: 1,
          columnStart: 0,
          columnEnd: 0,
          resultCost: 0,
        };
      })
      .filter((item) => item.id[0] !== 0);
  }

  let enchantList: { id: number; name: string; cost: number }[];
  async function getEnchantList() {
    const res = await fetch('/api/enchant-list');
    const posts = await res.json();

    if (res.status === 404) return false;

    enchantList = posts;
  }

  function clearEnchantSelectList() {
    enchantSelectList = [0];
    items = [];
  }

  let disabled: boolean = false;
  $: disabled = enchantSelectList.filter((elm) => elm > 0).length <= 1;
</script>

{#await getEnchantList()}
  <div class="center">
    <ScaleOut color="#00db37" size="120" />
  </div>
{:then value}
  <Container>
    <div class="pane-wrapper">
      <div class="pane-left">
        <CardList bind:items />
      </div>
      <div class="pane-right">
        <div class="block p-4">
          <button class="button exe" {disabled} on:click={() => costCalculation()}
            >コスト計算</button
          >
          <button class="button is-light" on:click={() => clearEnchantSelectList()}>クリア</button>
          <SelectList bind:enchantSelectList bind:enchantList />
        </div>
      </div>
    </div>
  </Container>
{:catch error}
  <Container>
    <Card class="bg-error text-white">エンチャントリストの取得に失敗しました。</Card>
  </Container>
{/await}

<style lang="scss">
  @use '../styles/variables.scss';
  @use '../styles/__mixin.scss' as mix;

  .pane-wrapper {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    @include mix.mq(tablet) {
      flex-direction: column-reverse;
    }

    .pane-left {
      flex: 1;
    }
    .pane-right {
      width: 430px;
    }
    .pane-left,
    .pane-right {
      @include mix.mq(tablet) {
        width: 100%;
      }
    }
  }
  .button {
    font-weight: bold;

    &.exe {
      background-color: variables.$button-exe-color;
    }
  }

  .center {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

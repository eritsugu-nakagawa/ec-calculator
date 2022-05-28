<script lang="ts">
  import { EnchantList } from '@store/enchant';
  import {
    searchMinCost,
    costCalculation,
    clearEnchantSelectList,
    getEnchantList,
  } from '@lib/calculate';

  import { ScaleOut } from 'svelte-loading-spinners';
  import { Container, Card } from 'svelte-chota';

  import CardList from '@components/CardList.svelte';
  import SelectList from '@components/SelectList.svelte';

  let enchantSelectList: number[] = [0];
  let enchantList: enchant[] | undefined = undefined;
  let items: cardItem[] = [];

  getEnchantList();
  EnchantList.subscribe((value) => {
    enchantList = value;
  });

  let disabled: boolean = false;
  $: disabled = enchantSelectList.filter((elm) => elm > 0).length <= 1;
  $: ({ cardList, totalCreateCost } = searchMinCost(items));
</script>

{#if enchantList === undefined}
  <div class="center">
    <ScaleOut color="#00db37" size="120" />
  </div>
{:else if enchantList === []}
  <Container>
    <Card class="bg-error text-white">エンチャントリストの取得に失敗しました。</Card>
  </Container>
{:else}
  <Container>
    <div class="pane-wrapper">
      <div class="pane-left">
        <CardList bind:cardList bind:totalCreateCost />
      </div>
      <div class="pane-right">
        <div class="block p-4">
          <button
            class="button exe"
            {disabled}
            on:click={() => (items = costCalculation(enchantSelectList, enchantList))}
            >コスト計算</button
          >
          <button
            class="button is-light"
            on:click={() => ({ enchantSelectList, items } = clearEnchantSelectList())}
            >クリア</button
          >
          <SelectList bind:enchantSelectList bind:enchantList />
        </div>
      </div>
    </div>
  </Container>
{/if}

<style lang="scss">
  @use '../styles/variables.scss';
  @use '../styles/__mixin.scss' as mix;

  .container {
    width: 100%;
  }

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

<script lang="ts">
  import Card from './Card.svelte';

  export let cardList: cardItem[][] = [[]];
  export let totalCreateCost: number = 0;
</script>

<div class="block">
  <div class="notification cost-display">
    総コスト：{#if totalCreateCost === 1000}
      <span class="error">×作成不可×</span>
    {:else}
      <span>{totalCreateCost}</span>
    {/if}
  </div>
  {#each cardList as row, rowIdx}
    <div class="notification">
      <div class="counter">{rowIdx + 1}回目</div>
      <div class="flex">
        {#each row as card, columnIdx}
          <Card
            {card}
            rowFirst={rowIdx === 0}
            rowLast={rowIdx === cardList.length - 1}
            columnFirst={columnIdx === 0}
            columnLast={columnIdx === row.length - 1}
            {rowIdx}
            {columnIdx}
          />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use '../styles/variables.scss' as v;

  .flex {
    display: flex;
    flex-wrap: wrap;
    row-gap: 1.5rem;
    padding: 0.5em;
    align-items: center;
  }

  .notification.cost-display {
    font-size: 2rem;
    border-radius: 5px;
    background-color: #dcedc8;

    span {
      font-weight: bold;

      &.error {
        color: v.$text-error-color;
      }
    }
  }

  .notification {
    background-color: whitesmoke;
    border-radius: 5px;
    padding: 1.25rem 1rem 1.25rem 1rem;
    margin-bottom: 2rem;
  }

  .counter {
    font-weight: bold;
  }
</style>

<script lang="ts">
  export let card: cardItem;
  export let rowFirst: boolean;
  export let rowLast: boolean;
  export let columnFirst: boolean;
  export let columnLast: boolean;
  export let rowIdx: number;
  export let columnIdx: number;

  let rowEven: boolean = rowIdx % 2 === 0;
  let columnEven: boolean = columnIdx % 2 === 0;
</script>

<div
  class="card-wrap"
  class:rowFirst
  class:rowLast
  class:columnFirst
  class:columnLast
  class:columnEven
  class:rowEven
>
  <div class="card-div" data-result-cost={card.resultCost}>
    <div class="card">
      <dl>
        <!-- <dt>名前</dt> -->
        {#each card.name as name}
          <dt>{name}</dt>
        {/each}
        <!-- <dt>基礎コスト</dt>
        <dd>{card.cost}</dd> -->
        <!-- <dt>作成コスト</dt> -->
        <!-- <dd>{card.createCost}</dd> -->
      </dl>
    </div>
  </div>
</div>

<style lang="scss">
  dl {
    margin: 0;
  }

  .card-wrap {
    position: relative;
    width: 50%;
  }

  .card-div {
    min-width: 10.5rem;
    width: 100%;
    max-width: 80%;
    margin: 0 auto;
  }

  .card-wrap.columnEven:not(.columnLast) .card-div::after {
    position: absolute;
    content: '';
    top: 50%;
    right: 0;
    width: calc((100% - max(80%, 10.5rem)) / 2);
    height: 2px;
    background-color: black;
  }

  .card-wrap:not(.columnEven) .card-div::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: calc((100% - max(80%, 10.5rem)) / 2);
    height: 2px;
    background-color: black;
  }

  .card {
    position: relative;
    height: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem 0.5rem;
    border: 1px solid #d3d3d3;

    dt:nth-of-type(n + 2) {
      border-top: 2px dotted #b1b1b1;
    }
  }

  .card-wrap.columnEven:not(.columnLast) .card {
    background-color: #ffe8aa;
    border-color: #ead59b;
  }

  /* .card-wrap.columnEven:not(.columnLast) .card::before {
    position: absolute;
    content: '主';
    top: 0.8rem;
    right: 0.5rem;
    color: white;
    background-color: rgb(255, 153, 0);
    font-size: 1.2rem;
    font-weight: bold;
    width: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    border-radius: 5px;
  } */

  .card-wrap:not(.columnEven) .card-div::after {
    position: absolute;
    content: attr(data-result-cost);
    top: calc(50% - 2.2rem);
    left: -0.6rem;
    font-size: 1.5rem;
    width: 1.5rem;
    text-align: center;
  }
</style>

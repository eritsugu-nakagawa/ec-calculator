<script lang="ts">
  import Card from './Card.svelte';
  export let items: cardItem[];

  let tmpList: cardItem[][] = [[]];
  let totalCreateCost: number = 0;
  $: ({ tmpList, totalCreateCost } = searchMinCost(items));

  function searchMinCost(items: cardItem[]) {
    if (!items.length) return { tmpList: [], totalCreateCost: 0 };

    let minCost = 1000;
    let minObj: cardItem[][] = [[]];
    let patternList: cardItem[][] = junretsu(items, items.length);

    patternList.forEach((ptn) => {
      let tmpPtn = ptn.map((elm, i) => {
        elm.columnStart = i + 2;
        elm.columnEnd = i + 3;
        return elm;
      });

      tmpPtn.unshift({
        id: [-1],
        name: ['†道具†'],
        cost: 0,
        createCount: 0,
        createCost: 0,
        mergeGrid: 1,
        columnStart: 1,
        columnEnd: 2,
        resultCost: 0,
      });

      let { resultList, totalCreateCost, canCreate } = spreadItems(tmpPtn);
      if (totalCreateCost < minCost && canCreate) {
        minCost = totalCreateCost;
        minObj = resultList;
      }
    });

    minObj.pop();

    return { tmpList: minObj, totalCreateCost: minCost };
  }

  function spreadItems(items: cardItem[]) {
    let tmpList = [];
    let resultList = [
      [
        ...items.map((item) => {
          return { ...item };
        }),
      ],
    ];
    let countCost = [0, 1, 3, 7, 15, 31];
    let createCountIdx = 0;
    let maxCountIdx;
    let createCost = 0;
    let totalCreateCost = 0;
    let idx = 0;
    let sumCost;
    let basicCost;
    let canCreate = true;
    const MAX_CAN_CREATE_COST = 40;

    maxCountIdx = Math.ceil(Math.log(resultList[0].length) / Math.log(2)) + 1;

    for (createCountIdx = 1; createCountIdx < maxCountIdx; createCountIdx++) {
      resultList.push([]);
      tmpList = [...resultList[createCountIdx - 1]];

      if (tmpList.length > 1) {
        for (idx = 0; idx < tmpList.length - 1; idx += 2) {
          sumCost = tmpList[idx].cost + tmpList[idx + 1].cost;
          basicCost = tmpList[idx + 1].cost;
          createCost =
            basicCost +
            countCost[tmpList[idx].createCount] +
            countCost[tmpList[idx + 1].createCount];

          resultList[createCountIdx].push({
            id: [...tmpList[idx].id, ...tmpList[idx + 1].id],
            name: [...tmpList[idx].name, ...tmpList[idx + 1].name],
            cost: sumCost,
            createCount: Math.max(tmpList[idx].createCount, tmpList[idx + 1].createCount) + 1,
            createCost: createCost,
            mergeGrid: tmpList[idx].mergeGrid + tmpList[idx + 1].mergeGrid,
            columnStart: tmpList[idx].columnStart,
            columnEnd: tmpList[idx + 1].columnEnd,
            resultCost: tmpList[idx].resultCost,
          });

          tmpList[idx + 1].resultCost = createCost;

          totalCreateCost += createCost;
          canCreate = canCreate ? createCost < MAX_CAN_CREATE_COST : false;
        }
      }

      if (idx === tmpList.length - 1) {
        resultList[createCountIdx].push(Object.assign({}, tmpList[idx]));
      }
    }

    return { resultList, totalCreateCost, canCreate };
  }

  function junretsu(balls: cardItem[], nukitorisu: number): cardItem[][] {
    var arrs, i, j, zensu, results, parts;
    arrs = [];
    zensu = balls.length;
    if (zensu < nukitorisu) {
      return [[]];
    } else if (nukitorisu == 1) {
      for (i = 0; i < zensu; i++) {
        arrs[i] = [balls[i]];
      }
    } else {
      for (i = 0; i < zensu; i++) {
        parts = balls.slice(0);
        parts.splice(i, 1)[0];
        results = junretsu(parts, nukitorisu - 1);
        for (j = 0; j < results.length; j++) {
          arrs.push([balls[i]].concat(results[j]));
        }
      }
    }
    return arrs;
  }
</script>

<div class="block">
  <div class="notification cost-display">
    総コスト：{#if totalCreateCost === 1000}
      <span class="error">×作成不可×</span>
    {:else}
      <span>{totalCreateCost}</span>
    {/if}
  </div>
  {#each tmpList as row, rowIdx}
    <div class="notification">
      <div class="counter">{rowIdx + 1}回目</div>
      <div class="flex">
        {#each row as card, columnIdx}
          <Card
            {card}
            rowFirst={rowIdx === 0}
            rowLast={rowIdx === tmpList.length - 1}
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

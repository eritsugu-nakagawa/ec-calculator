export const searchMinCost = (items: cardItem[]) => {
  if (!items.length) return { cardList: [], totalCreateCost: 0 };

  let minCost = 1000;
  let minObj: cardItem[][] = [[]];
  const patternList: cardItem[][] | undefined = junretsu(items, items.length);

  if (!patternList) return { cardList: minObj, totalCreateCost: minCost };

  patternList.forEach((ptn) => {
    const tmpPtn = ptn.map((elm, i) => {
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

    const { resultList, totalCreateCost, canCreate } = spreadItems(tmpPtn);
    if (totalCreateCost < minCost && canCreate) {
      minCost = totalCreateCost;
      minObj = resultList;
    }
  });

  minObj.pop();

  return { cardList: minObj, totalCreateCost: minCost };
};

function spreadItems(items: cardItem[]) {
  let tmpList = [];
  const resultList = [
    [
      ...items.map((item) => {
        return { ...item };
      }),
    ],
  ];
  const countCost = [0, 1, 3, 7, 15, 31];
  let createCountIdx = 0;
  let createCost = 0;
  let totalCreateCost = 0;
  let idx = 0;
  let sumCost;
  let basicCost;
  let canCreate = true;
  const MAX_CAN_CREATE_COST = 40;

  const maxCountIdx = Math.ceil(Math.log(resultList[0].length) / Math.log(2)) + 1;

  for (createCountIdx = 1; createCountIdx < maxCountIdx; createCountIdx++) {
    resultList.push([]);
    tmpList = [...resultList[createCountIdx - 1]];

    if (tmpList.length > 1) {
      for (idx = 0; idx < tmpList.length - 1; idx += 2) {
        sumCost = tmpList[idx].cost + tmpList[idx + 1].cost;
        basicCost = tmpList[idx + 1].cost;
        createCost =
          basicCost + countCost[tmpList[idx].createCount] + countCost[tmpList[idx + 1].createCount];

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

function junretsu(balls: cardItem[], nukitorisu: number): cardItem[][] | undefined {
  const arrs: cardItem[][] = [];
  let i: number;
  let j: number;
  let results: cardItem[][] | undefined;
  let parts: cardItem[];
  const zensu = balls.length;
  if (zensu < nukitorisu) {
    return;
  } else if (nukitorisu == 1) {
    for (i = 0; i < zensu; i++) {
      arrs[i] = [balls[i]];
    }
  } else {
    for (i = 0; i < zensu; i++) {
      parts = balls.slice(0);
      parts.splice(i, 1)[0];
      results = junretsu(parts, nukitorisu - 1);
      if (results) {
        for (j = 0; j < results.length; j++) {
          arrs.push([balls[i]].concat(results[j]));
        }
      }
    }
  }
  return arrs;
}

export const costCalculation = (
  enchantSelectList: number[],
  enchantList: enchant[] | undefined,
) => {
  if (!enchantList) return [];
  return enchantSelectList
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
};

export const clearEnchantSelectList = () => {
  return { enchantSelectList: [0], items: [] };
};

<script lang="ts">
  import { assets } from '$app/paths';

  const iconSize: number = 16;

  export let enchantSelectList: number[];
  export let enchantList: { id: number; name: string; cost: number }[];

  function addItem(idx: number) {
    if (enchantSelectList.length < 8) {
      enchantSelectList.splice(idx + 1, 0, 0);
      enchantSelectList = enchantSelectList;
    }
  }

  function removeItem(idx: number) {
    if (enchantSelectList.length > 1) {
      enchantSelectList.splice(idx, 1);
      enchantSelectList = enchantSelectList;
    }
  }

  function changeEnchantList(event: Event, idx: number) {
    if (!(event.currentTarget instanceof HTMLSelectElement)) return;
    if (event.currentTarget.value == '0' && enchantSelectList.length > 1) {
      removeItem(idx);
    } else if (
      event.currentTarget.value > '0' &&
      enchantSelectList.length < 8 &&
      idx + 1 == enchantSelectList.length
    ) {
      enchantSelectList.push(0);
      enchantSelectList = enchantSelectList;
    }
  }
</script>

<div class="block">
  <div class="field">
    <div class="item-no">Base Item</div>
    <div class="select">
      <select disabled name="base-item" class="base-item">
        <option value="-1">†道具†</option>
      </select>
    </div>
  </div>
  <div class="field">
    <div class="item-no text-center">＋</div>
  </div>
  {#each enchantSelectList as item, idx}
    {@const isHiddenMinus = !(idx > 0 || enchantSelectList.length > 1)}
    <div class="field">
      <div class="item-no">Item No.{idx + 1}</div>
      <div class="select">
        <select
          name="enchant-list"
          bind:value={item}
          on:change={(event) => changeEnchantList(event, idx)}
        >
          {#each enchantList as enchant}
            <option value={enchant.id}>{enchant.name}</option>
          {/each}
        </select>
      </div>
      <button
        class="btn-icon plus is-rounded {idx < 7 ? '' : 'hidden'}"
        on:click={() => addItem(idx)}
        ><img
          src="{assets}/images/plus.svg"
          alt="追加"
          width={iconSize}
          height={iconSize}
        /></button
      >
      <button class="btn-icon minus is-rounded" class:isHiddenMinus on:click={() => removeItem(idx)}
        ><img
          src="{assets}/images/minus.svg"
          alt="削除"
          width={iconSize}
          height={iconSize}
        /></button
      >
    </div>
  {/each}
</div>

<style lang="scss">
  @use '../styles/variables.scss';
  @use '../styles/__mixin.scss' as mix;

  .block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .item-no {
    font-weight: bold;
    width: 10rem;
    min-width: 10rem;
    font-size: clamp(1rem, 2.8vw, var(--font-size));
  }

  .select {
    width: 24rem;
    min-width: 24rem;
  }

  select {
    &.base-item {
      background-image: none;
    }
  }

  .field {
    display: flex;
    column-gap: 1rem;
    align-items: center;
  }

  .btn-icon {
    display: flex;
    padding: 0;
    width: 22px;
    height: 22px;

    justify-content: center;
    align-items: center;
  }

  .plus,
  .minus {
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }

  .plus {
    background-color: variables.$button-exe-color;
  }
  .minus {
    background-color: #6e6e6e;

    &.isHiddenMinus {
      visibility: hidden;
    }
  }

  .hidden {
    visibility: hidden;
  }
</style>

<script lang="ts">
  import 'chota';
  import { Nav } from 'svelte-chota';

  $: active = 0;
</script>

<svelte:head>
  <title>エンチャントコスト計算機</title>
</svelte:head>

<Nav class="is-paddingless header">
  <svelte:fragment slot="left">
    <a class="brand" href="/" on:click={() => (active = 0)}>エンチャントコスト計算機</a>
    <a href="/about" class:active={active === 1} on:click={() => (active = 1)}>About</a>
  </svelte:fragment>
</Nav>
<main>
  <slot />
</main>
<footer />

<style global lang="scss">
  @use '../styles/variables.scss' as v;
  @use '../styles/__mixin.scss' as mix;

  :global(.header) {
    background-color: v.$nav-main-color;
    padding: 0.5rem;
    font-size: 1.5rem;

    a {
      @include mix.mq(sp) {
        padding-left: clamp(1.1rem, 3.5vw, 2rem) !important;
        padding-right: clamp(1.1rem, 3.5vw, 2rem) !important;
      }
    }
  }

  .brand {
    font-weight: bold;
  }

  a {
    &.active {
      background-color: v.$nav-active-color;
    }
  }

  main {
    padding: 0.8rem;
    flex: 1;
    width: 100%;
  }

  footer {
    padding: 0.5em;
  }
</style>

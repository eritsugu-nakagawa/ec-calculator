<script lang="ts">
  import 'chota';
  import { Nav } from 'svelte-chota';

  $: active = 0;
</script>

<svelte:head>
  <title>エンチャントコスト計算機</title>
</svelte:head>

<Nav class="is-paddingless">
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

  nav {
    background-color: v.$nav-main-color;
    padding: 0.5rem;
    font-size: 1.5rem;
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

<script lang="ts">
  export let data

</script>

<h1>SCRON</h1>

<form action="?/create_session" method="post">
  <input type="text" name="name" class="input">
  <button class="btn">Nouvelle session</button>
</form>

<hr>
<h2>Sessions</h2>

{#each data.sessions as session}
  <section class="card">
    <h2>{session.name}</h2>
  </section>
{/each}
<script lang="ts">
  export let data

</script>

<div class="p-1">

  <h1 class="font-bold text-xl p-4">SCRON</h1>
  
  <form action="?/create_session" method="post">
    <input type="text" name="name" class="input" placeholder="Name">
    <button class="btn">Nouvelle session</button>
  </form>
  
  <hr class="divider">

  <h2 class="font-semibold opacity-70 text-lg">Sessions</h2>
  
  <div class="flex flex-col gap-2">
    {#each data.sessions as session}
      <a class="btn" href="/s/{session.id}">
        {session.name}
      </a>
    {/each}
  </div>

</div>
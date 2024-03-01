<script lang="ts">
  import { enhance } from '$app/forms'
  import Chrono from './Chrono.svelte';

  export let data


</script>

<div class="relative">
  <div class="sticky top-0 z-10 backdrop-blur-lg">
    <h1 class="text-center py-2 text-lg">{data.session.name}</h1>
    
    <form action="?/create_chrono" method="post" class="p-2 flex gap-2 rounded-lg" use:enhance={(event) => {
      event.formData.set('startAt', new Date().toJSON())
    }}>
      <input type="text" name="name" class="input" placeholder="Name">
      <button class="btn grow btn-success">Start</button>
    </form>
    
    <hr>
  </div>
  
  <div class="flex flex-col gap-2 p-2">
    
      {#each data.session.chronos as  chrono}
        <Chrono {chrono}/>
  
      {/each}
  
  </div>
</div>




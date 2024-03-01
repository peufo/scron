<script lang="ts">
  import { enhance } from '$app/forms'
  import { onMount } from 'svelte'
  import type { Chrono as TChrono} from '@prisma/client'
  import Chrono from './Chrono.svelte';
  import { page } from '$app/stores'

  export let data

  let chronos = data.session.chronos


  onMount(() => {
		const subscription = new EventSource($page.url)
		subscription.addEventListener('create_chrono', onCreateChrono)
		subscription.addEventListener('stop_chrono', onStopChrono)
	})

  function onCreateChrono(event: MessageEvent<TChrono>) {
    const newChrono = JSON.parse(event.data)
    newChrono.startAt = new Date(newChrono.startAt)
    chronos = [...chronos, newChrono]
  }
  function onStopChrono(event: MessageEvent<TChrono>) {
    const newChrono = JSON.parse(event.data)
    newChrono.startAt = new Date(newChrono.startAt)
    newChrono.endAt = new Date(newChrono.endAt)
    chronos = chronos.map(c => {
      if (c.id !== newChrono.id) return c
      return newChrono
    })
  }




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
      {#each chronos as chrono}
        <Chrono {chrono}/>
      {/each}
  </div>
</div>




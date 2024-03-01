<script lang="ts">
  import { enhance } from '$app/forms'
  import { onMount } from 'svelte'
  import type { Chrono as TChrono} from '@prisma/client'
  import Chrono from './Chrono.svelte';
  import { page } from '$app/stores'
  import { ArrowLeft } from 'lucide-svelte'

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


  $: _chronos = chronos.sort((a,b) => {
    if (!a.endAt || !b.endAt) return 1
    const durationA = a.endAt.getTime() - a.startAt.getTime() 
    const durationB = b.endAt.getTime() - b.startAt.getTime() 
    return durationA - durationB
  })


</script>

<div class="relative p-2">
  <div class="sticky top-0 z-10 backdrop-blur-lg">
    <div class="flex gap-2 mb-2 items-center">
      <a href="/" class="btn btn-square btn-sm">
        <ArrowLeft/>
      </a>
      <h1 class="py-2 font-bold text-xl opacity-70">{data.session.name}</h1>
    </div>
    
    <form action="?/create_chrono" method="post" class="flex gap-2 rounded-lg" use:enhance={(event) => {
      event.formData.set('startAt', new Date().toJSON())
    }}>
      <input type="text" name="name" class="input" placeholder="Name">
      <button class="btn grow btn-success">Start</button>
    </form>
    
    <hr>
  </div>
  
  <div class="flex flex-col gap-2 mt-4">
      {#each _chronos as chrono}
        <Chrono {chrono}/>
      {/each}
  </div>
</div>




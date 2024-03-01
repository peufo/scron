
<script lang="ts">
  import { enhance } from "$app/forms"
  import { currentTime } from "$lib/store/currentTime"
  import { renderChronoTime } from "$lib/utils"
  import type { Chrono } from "@prisma/client"

  export let chrono: Chrono

</script>

<div class="card border bordered bg-base-100">
  <div class="card-body p-2">
    <div class="flex gap-2 justify-between">
      <div>
        <h3 class="card-title">{chrono.name}</h3>
        <pre>{renderChronoTime(chrono.startAt, chrono.endAt || $currentTime)}</pre>
      </div>
      {#if !chrono.endAt}
        <form action="?/stop_chrono" method="post" use:enhance={(event) => {
          event.formData.set('endAt', new Date().toJSON())
        }}>
          <input type="hidden" name="id" value={chrono.id}/>
          <button class="btn btn-error grow">Stop</button>
        </form>
      {/if}
    </div>

  </div>
</div>
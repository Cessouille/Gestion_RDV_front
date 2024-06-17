<script setup>
</script>

<template>
  <div class="border-solid border-4 border-primary rounded-xl p-5 bg-secondary flex flex-col items-center">
    <h1 class="text-tertiary font-semibold text-3xl">Rendez-Vous avec Philipe LE DOCTEUR</h1>
    <h2 class="text-tertiary text-2xl">Diponibilités :</h2>
    <div class="grid w-[40rem] grid-cols-3 gap-2 rounded-xl p-2">
        <div>
            <input type="radio" name="option" id="1" value="1" class="peer hidden" checked />
            <label for="1" class="block border-solid border-5 border-tertiary cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-tertiary peer-checked:font-bold peer-checked:text-white">Cette semaine</label>
        </div>

        <div>
            <input type="radio" name="option" id="2" value="2" class="peer hidden" />
            <label for="2" class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-tertiary peer-checked:font-bold peer-checked:text-white">Dans 1 mois</label>
        </div>

        <div>
            <input type="radio" name="option" id="3" value="3" class="peer hidden" />
            <label for="3" class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-tertiary peer-checked:font-bold peer-checked:text-white">Choisir une date</label>
        </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  var scrollWindow = document.querySelector(".scrollwindow");
  var chatBox = document.querySelector(".messageBox");
  scrollWindow.scrollTop = scrollWindow.scrollHeight;

  const handleSelection = function () {
    scrollWindow.scrollTop = scrollWindow.scrollHeight;
  };

  ['mouseup', 'keyup', 'resize'].forEach((e) => {
    chatBox.addEventListener(e, handleSelection);
  });
})
</script>

<template>
  <main class="flex w-full place-content-center pt-2 h-[90vh]">
    <div class="scrollwindow flex w-2/4 align-self-center flex-col h-full overflow-scroll overflow-x-hidden">
      <div class="w-auto flex flex-col gap-3 pr-3">
        <div class="w-auto flex flex-col">
          <div class="w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble">hdsajdsakjda</div>
          <div class="w-auto self-end text-primary text-xs pt-1">14:36</div>
        </div>
        <div class="w-auto flex flex-col">
          <div class="w-auto self-start p-3 bg-secondary text-tertiary rounded-lg leftBubble">Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Etiam et nunc facilisis, molestie urna a, condimentum tellus. Mauris
            placerat posuere hendrerit. Ut neque lorem, aliquet sit amet lacus ut, sollicitudin maximus enim. Maecenas
            libero sapien, eleifend sed varius id, pretium in magna. Nam molestie imperdiet lorem a imperdiet.
            Pellentesque suscipit interdum urna vel feugiat. Quisque mollis ligula a urna mollis, non pellentesque metus
            viverra. Cras urna est, ornare sed tortor at, luctus tincidunt ligula. Donec vel tincidunt nunc. Nam vitae
            aliquet leo.</div>
          <div class="w-auto self-start text-primary text-xs pt-1">Steven · 14:37</div>
        </div>
        <div class="w-auto flex flex-col">
          <div class="w-auto self-start p-3 bg-secondary text-tertiary rounded-lg leftBubble">Il parle latin ??</div>
          <div class="w-auto self-start text-primary text-xs pt-1">Michael · 14:39</div>
        </div>
        <div class="w-auto flex flex-col">
          <div class="w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble">Jcrois pas</div>
          <div class="w-auto self-end text-primary text-xs pt-1">14:43</div>
        </div>
        <div class="w-auto flex flex-col">
          <div class="w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble">Jcrois pas</div>
          <div class="w-auto self-end text-primary text-xs pt-1">14:43</div>
        </div>
        <div class="w-auto flex flex-col">
          <div class="w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble">Jcrois pas</div>
          <div class="w-auto self-end text-primary text-xs pt-1">14:43</div>
        </div>
        <div class="w-auto flex gap-2 items-end">
          <div contenteditable
            class="messageBox w-full border-tertiary border-solid border-2 rounded-xl p-2 bg-quartiary row-span-1">
          </div>
          <button class="w-[60px] bg-tertiary rounded-xl p-2 row-span-1 text-white"><i
              class="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "../assets/scss/settings.scss";


/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $quartiary;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $primary;
  border-radius: 5px;
}

.scrollwindow {
  scroll-behavior: smooth;
}

.rightBubble::after {
  content: "";
  border-width: 18px 0 0 12px;
  border-color: $primary;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -6px;
  bottom: 0;
  position: absolute;
}

.rightBubble {
  position: relative;
}

.leftBubble::after {
  content: "";
  border-width: 18px 12px 0 0;
  border-color: $secondary;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -6px;
  bottom: 0;
  position: absolute;
}

.leftBubble {
  position: relative;
}
</style>

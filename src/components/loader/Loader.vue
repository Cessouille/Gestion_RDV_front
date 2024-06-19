<script>
export default {
    props: {
        message: String,
    },
}
</script>

<template>
    <div class="loader">
        <div id="loaderHolder">
            <div class="bar" id="bar1"></div>
            <div class="bar" id="bar2"></div>
            <div class="bar" id="bar3"></div>
            <div class="bar" id="bar4"></div>
            <div class="bar" id="bar5"></div>
        </div>
        <div class="loaderText text-xs text-tertiary">{{ message }}</div>
    </div>
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

#loaderHolder {
    display: flex;
    align-items: flex-end;
    height: 20px;
    gap: 2px;
    justify-content: center;
}

.bar {
    width: 10px;
    background-color: $primary;
    height: 0px;
    animation: 1.5s ease infinite grow;
}

#bar2 {
    animation-delay: 0.1s;
}

#bar3 {
    animation-delay: 0.2s;
}

#bar4 {
    animation-delay: 0.3s;
}

#bar5 {
    animation-delay: 0.4s;
}

@keyframes grow {
    0% {
        height: 0px;
    }

    20% {
        height: 20px;
    }

    30% {
        height: 20px;
    }

    100% {
        height: 0px;
    }
}
</style>
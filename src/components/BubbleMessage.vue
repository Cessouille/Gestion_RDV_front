<script setup lang="ts">
import dayjs from 'dayjs';
import { BubbleMessageParam } from '@/models/types';

import { ref, defineProps, defineEmits } from 'vue'

export interface BubbleMessageProps {
    param: BubbleMessageParam;
}

const props = defineProps<BubbleMessageProps>();

const emit = defineEmits(['update:liked', 'update:nbLike'])

const replying = ref(false);

const liked = ref(props.param.liked);
const nbLike = ref(props.param.nbLike.valueOf());

const toggleLike = () => {
    liked.value = !liked.value;
    if (liked.value) {
        nbLike.value += 1;
    } else {
        nbLike.value -= 1;
    }
    emit('update:liked', liked.value)
    emit('update:nbLike', nbLike.value)
}

</script>

<template>
    <div id="bubbleMessage">
        <div id="headerBubble">
            <h3>{{ props.param.name }}</h3>
            <h3>{{ dayjs(props.param.datePubli).format('DD/MM/YYYY') }}</h3>
        </div>
        <p>
            {{ props.param.content }}
        </p>
        <span v-if="replying" @click="replying = false" class="material-symbols-rounded closeBox">close</span>
        <div id="footerBubble">
            <i v-if="!replying" class="replyText" @click="replying = true">Répondre...</i>
            <textarea v-if="replying"></textarea>
            <div>
                <div class="actions">
                    <div>
                        <span class="material-symbols-rounded">comment</span>
                        <h4>{{ props.param.nbComments }}</h4>
                    </div>
                    <div>
                        <span v-if="liked" class="material-symbols-rounded fill" @click=toggleLike>favorite</span>
                        <span v-else class="material-symbols-rounded" @click="toggleLike">favorite</span>
                        <h4>{{ nbLike }}</h4>
                    </div>
                </div>
                <button v-if="replying" class="reply">Répondre</button>
            </div>
        </div>
    </div>
    <slot />
</template>

<style lang="scss">
@import "../assets/scss/settings.scss";

#bubbleMessage {
    background-color: $secondary;
    border: 3px solid $primary;
    border-radius: 15px 15px 15px 0;
    padding: 7px;
    margin-top: 25px;
    .replyText {
        color: $primary;
        font-size: large;
        cursor: pointer;
    }
    .closeBox {
        background-color: $primary;
        color: $quartiary;
        border-radius: 50%;
        transition: all ease-in-out 0.5s;
    }
    .closeBox:hover {
        transform: rotate(180deg) scale(1.01);
        background-color: $quartiary;
        color: $primary;
        cursor: pointer;
    }
    #headerBubble {
        display: flex;
        justify-content: space-between;
        color: $primary;
        font-size: small;
    }
    p {
        margin: 5px 0 10px 0;
        text-align: justify;
        color: $tertiary;
        font-size: large;
    }
    #footerBubble {
        display: flex;
        justify-content: space-between;
        textarea {
            height: 75px;
            width: 100%;
            resize: none;
            background-color: $quartiary;
            border: solid 2px $primary;
            border-radius: 10px;
            padding: 5px;
        }
        .reply {
            background-color: $primary;
            border: none;
            border-radius: 25px;
            padding: 5px;
            color: white;
            font-weight: 700;
            transition: all ease-in-out 0.1s;
            margin: 20%;
            cursor: pointer;
        }
        .reply:hover {
            background-color: $tertiary;
            transform: scale(1.1,1.1);
        }
        .actions {
            color: $tertiary;
            display: flex;
            div {
                display: flex;
                margin-left: 10px;
                align-items: center;
                span {
                    margin: 5px;
                }
            }
            .fill {
                font-variation-settings:
                'FILL' 1,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24
            }
        }
    }
}
</style>
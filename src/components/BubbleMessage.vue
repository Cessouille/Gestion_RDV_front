<script setup>
import dayjs from 'dayjs';

    defineProps({
        name: String,
        datePubli: Date,
        content: String,
        nbLike: Number,
        nbComments: Number,
        liked: Boolean
    })
</script>

<template>
    <div id="bubbleMessage">
        <div id="headerBubble">
            <h3>{{ name }}</h3>
            <h3>{{ dayjs(datePubli).format('DD/MM/YYYY') }}</h3>
        </div>
        <p>
            {{ content }}
        </p>
        <div id="footerBubble">
            <button class="reply">Répondre</button>
            <div class="actions">
                <div>
                    <span class="material-symbols-rounded">comment</span>
                    <h4>{{ nbComments }}</h4>
                </div>
                <div>
                    <span v-if="liked" class="material-symbols-rounded fill">favorite</span>
                    <span v-else class="material-symbols-rounded">favorite</span>
                    <h4>{{ nbLike }}</h4>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../assets/scss/settings.scss";

#bubbleMessage {
    background-color: $secondary;
    border: 3px solid $primary;
    border-radius: 15px;
    padding: 7px;
    width: 500px;
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
        .reply {
            background-color: $primary;
            border: none;
            border-radius: 25px;
            padding: 5px;
            color: white;
            font-weight: 700;
            transition: all ease-in-out 0.1s;
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
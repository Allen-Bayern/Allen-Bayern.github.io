<template>
    <div class="page-404">
        <p class="page-404-text">Sorry, 我还没写完呢...</p>
    </div>
</template>

<style lang="scss" scoped>
.page-404 {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url('../assets/imgs/bg-ikun.jpeg');
    background-size: cover;

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        height: 40px;
        margin: 20px 0;

        @include for-phone-only {
            height: 40vpx;
            margin: 20vpx 0;
        }
    }

    &-text {
        font-size: 18px;
        margin-top: 1em;

        @include for-phone-only {
            font-size: 18vpx;
        }
    }
}
</style>

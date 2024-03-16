<template>
    <div class="page-404">
        <div class="page-404-img"></div>
        <p class="page-404-text">Sorry, 我还没写完呢...</p>
    </div>
</template>

<style lang="scss" scoped>
.page-404 {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        height: 120px;
        margin: 20px 0;

        @include for-phone-only {
            height: 120vpx;
            margin: 20vpx 0;
        }
    }

    &-img {
        height: 200px;
        width: 300px;
        background-image: url('../assets/imgs/err-404.png');
        background-repeat: no-repeat;
        background-size: contain;

        @include for-phone-only {
            height: 200vpx;
            width: 300vpx;
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

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import cxkFemale from '@/assets/imgs/cxk.gif';

const router = useRouter();
// 返回首页
const toHome = () => {
    router.push({
        name: 'home',
    });
};
</script>

<template>
    <div class="page-404">
        <img
            class="page-404-img"
            :src="cxkFemale"
            alt="只因"
        />
        <div class="page-404-cnt">
            <div class="page-404-cnt-left">
                <p class="page-404-cnt-left-text page-404-cnt-left-up">Yueb</p>
                <p class="page-404-cnt-left-text page-404-cnt-left-down">前端练习生</p>
            </div>

            <p class="page-404-cnt-right">Sorry, 我还没写完呢...</p>
        </div>

        <el-button
            type="primary"
            round
            class="page-404-btn"
            @click="toHome"
            >那就回首页吧</el-button
        >
    </div>
</template>

<style lang="scss" scoped>
.page-404 {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #e2e6f5;

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    &-img {
        margin-bottom: 24px;
        height: 300px;
        width: 500px;

        @include for-phone-only {
            margin-bottom: 16vpx;
            width: 280vpx;
            height: 168vpx;
        }
    }

    &-cnt {
        display: flex;
        align-items: center;
        font-size: 42px;

        @include for-phone-only {
            font-size: 21vpx;
        }

        &-left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            font-size: 36px;
            border-right: 2px solid #fff;
            height: 100%;

            @include for-phone-only {
                font-size: 18vpx;
                border-right: 1px solid #fff;
            }

            &-text {
                flex: 1;
            }

            &-up {
                width: 100%;
                background-color: #fff;
                color: #7e84ea;
                text-align: right;
                border-left: 8px solid #86e3e0;
                border-radius: 4px 0 0 0;

                @include for-phone-only {
                    border-left: 4vpx solid #86e3e0;
                    border-radius: 4vpx 0 0 0;
                }
            }

            &-down {
                width: 100%;
                background-color: #7e84ea;
                color: #fff;
                border-left: 8px solid #fff;
                font-size: 24px;
                border-radius: 0 0 0 4px;

                @include for-phone-only {
                    font-size: 12vpx;
                    border-left: 4vpx solid #fff;
                    border-radius: 0 0 0 4vpx;
                }

                padding-top: 0.25em;
            }
        }

        &-right {
            height: 100%;
            padding: 0.3em;
            background-color: #7e84ea;
            color: #fff;

            border-radius: 0 4px 4px 0;

            @include for-phone-only {
                border-radius: 0 4vpx 4vpx 0;
            }
        }
    }

    &-btn {
        font-size: 21px;
        margin-top: 34px;
        background-color: #7e84ea;
        padding: 16px 30px;
        font-weight: 400;

        @include for-phone-only {
            font-size: 18vpx;
            padding: 8vpx 15vpx;
            margin-top: 24vpx;
        }
    }
}
</style>

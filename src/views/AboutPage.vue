<script lang="ts" setup>
import { SomeHub } from '@/components';
import { useTitle } from '@/utils/hooks';

useTitle('关于我');
</script>

<template>
    <div class="about-me">
        <h1 class="about-me-title">关于我</h1>

        <div class="about-me-part">
            <div class="about-me-part-header">
                <h2 class="about-me-part-header-title">个人介绍</h2>
                <some-hub
                    class="about-me-part-header-tag"
                    left-part="前端"
                    right-part="练习生"
                />
                <some-hub
                    class="about-me-part-header-tag"
                    left-part="干饭"
                    right-part="狂热爱好者"
                />
            </div>

            <p class="about-me-part-content">
                全民阅读人们大家好,
                我是练习时长还不到一坤年的前端练习生月饼，简称Yueb。喜欢唱、跳、Rap、足球，但都喜欢看别人做这些事😂。
            </p>
            <p class="about-me-part-content">
                平时爱好还不少，比如听各种音乐，从罗大佑到The Beatles，还喜欢听粤语歌曲。
            </p>
            <p class="about-me-part-content">
                这是我的技术博客，除了前端以外，应该还会写些别的，比如AI、Python语言、计算机学习笔记等，不一而足。
            </p>
            <p class="about-me-part-content">除了技术文章以外，我平时还会写点散文、轻小说等，但暂时没有发表的打算。</p>
        </div>

        <div class="about-me-part">
            <h2 class="about-me-part-title">联系我</h2>

            <p class="about-me-part-content">
                欢迎发邮件
                <a
                    class="reset-a"
                    href="mailto:896175698@qq.com"
                    >896175698@qq.com</a
                >
                与我交流!
            </p>
        </div>

        <div class="about-me-part my-sites">
            <h2 class="about-me-part-title">我的其他主页</h2>

            <div class="my-sites-col">
                <a
                    href="https://github.com/Allen-Bayern"
                    class="mdi mdi-github my-sites-col-icon"
                ></a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/** 需要加粗就直接用font-b类就可以 */
.font-b {
    font-weight: 550;
}

.reset-a {
    color: #d23669;
}

.about-me {
    display: flex;
    flex-direction: column;

    &-title {
        font-size: 20px;

        @include for-phone-only {
            font-size: 20vpx;
        }

        margin-bottom: 0.8em;
    }

    &-part {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 1.5em;

        &-header {
            display: flex;
            margin-bottom: 14px;

            @include for-phone-only {
                margin-bottom: 14vpx;
            }

            margin-bottom: 0.75em;

            &-title {
                @include for-phone-only {
                    font-size: 18vpx;
                }

                font-size: 18px;
            }

            &-tag {
                margin-left: 14px;
                @include for-phone-only {
                    margin-left: 14vpx;
                }
            }
        }

        &-title {
            @include for-phone-only {
                font-size: 18vpx;
            }

            font-size: 18px;
            margin-bottom: 0.75em;
        }

        &-content {
            @include for-phone-only {
                font-size: 14vpx;
            }

            font-size: 14px;
            margin-bottom: 0.75em;
        }
    }

    .my-sites {
        &-col {
            display: flex;

            &-icon {
                text-decoration: none;
                font-size: 20px;
                color: #222;

                @include for-phone-only {
                    font-size: 20vpx;
                }

                margin-right: 0.8em;
            }
        }
    }
}
</style>

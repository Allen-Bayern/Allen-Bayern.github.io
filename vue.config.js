const { defineConfig } = require('@vue/cli-service');
// add element
const { default: AutoImport } = require('unplugin-auto-import/webpack');
const { default: Components } = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

/** @description Add global style-resource for css / scss / less ... file */
const addStyleResource = (rule, patterns = []) => {
    rule.use('style-resource').loader('style-resources-loader').options({ patterns });
};

/** @description the configuration of this project */
const vueConfig = defineConfig({
    transpileDependencies: true,
    lintOnSave: 'error',
    devServer: {
        port: 7500,
    },
    // config css
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        // use px-to-vw
                        require('postcss-px-to-viewport')({
                            // 用vpx, 而非占用px
                            unitToConvert: 'vpx',

                            // 二倍图
                            viewportWidth: 375,
                            landscapeWidth: 667,

                            unitPrecision: 5,
                            propList: ['*'],
                            viewportUnit: 'vw',
                            fontViewportUnit: 'vw',
                            selectorBlackList: [],
                            minPixelValue: 1,

                            // use media query
                            mediaQuery: true,

                            replace: true,
                            exclude: undefined,
                            include: undefined,
                            landscape: false,
                            landscapeUnit: 'vw',
                        }),
                    ],
                },
            },
        },
    },
    // use webpack chain
    chainWebpack(config) {
        // add style resources
        ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(type => {
            addStyleResource(
                config.module.rule('scss').oneOf(type),
                require('path').resolve(__dirname, 'src/assets/sass/_common-use.scss')
            );
        });

        config
            .plugin('html')
            .tap(args => {
                const [basicConf] = args;
                // Modify Title
                return [{ ...basicConf, title: '月饼叔叔的小屋' }];
            })
            .end()
            // import articles loader
            .module.rule('articles')
            .test([/\.md$/i, /\.txt$/i])
            .use('raw-loader')
            .loader('raw-loader')
            .end()
            .end()
            .end()
            .plugin('AutoImport')
            .use(
                AutoImport({
                    resolvers: [ElementPlusResolver()],
                })
            )
            .end()
            .plugin('Components')
            .use(
                Components({
                    resolvers: [ElementPlusResolver()],
                })
            )
            .end();
    },
});

module.exports = vueConfig;

const { defineConfig } = require('@vue/cli-service');

/** @description Add global style-resource for scss file */
function addStyleResource(rule, patterns = []) {
    rule.use('style-resource').loader('style-resources-loader').options({
        patterns,
    });
}

/** @description the configuration of this project */
const vueConfig = defineConfig({
    transpileDependencies: true,
    lintOnSave: 'error',
    devServer: {
        port: 7500,
    },
    // use webpack chain
    chainWebpack(config) {
        ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(type => {
            addStyleResource(config.module.rule('scss').oneOf(type));
        });

        config
            .plugin('html')
            .tap(args => {
                const [basicConf] = args;
                // Modify Title
                return [{ ...basicConf, title: '月饼叔叔的小屋' }];
            })
            .end();
    },
});

module.exports = vueConfig;

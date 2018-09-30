module.exports = function(api) {
  api.cache(() => process.env.NODE_ENV === "production");
  const plugins = ['@babel/plugin-syntax-dynamic-import'];

  return {
    presets: ['@vue/app'],
    plugins
  };
};

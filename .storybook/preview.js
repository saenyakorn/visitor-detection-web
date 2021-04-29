export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const themeDecorator = Story => <Story />

export const decorators = [themeDecorator]

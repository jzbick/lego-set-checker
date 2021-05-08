declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'balm-ui' {
  import {Plugin} from 'vue'
  const component: Plugin
  export default component
}

declare module 'balm-ui-plus' {
  import {Plugin} from 'vue'
  const component: Plugin
  export default component
}

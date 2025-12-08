import 'sanity'

declare module 'sanity' {
  interface DocumentOptions {
    singleton?: boolean
  }
}

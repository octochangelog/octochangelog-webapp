declare module 'rehype-highlight'
declare module 'remark-rehype'
declare module 'remark-stringify'
declare module 'title' {
  export default function title(
    str: string,
    config: { special: string[] }
  ): string
}

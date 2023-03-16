declare module '*.svg';
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

export const location;

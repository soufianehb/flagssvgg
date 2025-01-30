declare module "*.json" {
  const value: {
    name: string;
    dial_code: string;
    code: string;
  }[];
  export default value;
}
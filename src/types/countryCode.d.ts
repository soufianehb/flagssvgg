declare module "*.json" {
  const value: {
    countries: {
      name: string;
      dial_code: string;
      code: string;
    }[];
  };
  export default value;
}
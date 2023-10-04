const paths = ["/", "/profile", "/about"] as const;

export type Path = typeof paths[number];
export default paths;

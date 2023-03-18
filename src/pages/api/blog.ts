export default function handler(req: any, res: any) {
  const blog = [
    { name: "Mukul", content: "lorem lorem", title: "Anime", id:1 },
    { name: "Rishabh", content: "lorem23", title: "AOT", id:2 },
    { name: "Bhaye", content: "lorem44", title: "Deathnote", id:3 },
    { name: "Mukul", content: "lorem69", title: "COD", id:4 },
    { name: "Rishabh", content: "Dust2", title: "CS-GO",id:5 }
];
  res.status(200).json(blog);
}

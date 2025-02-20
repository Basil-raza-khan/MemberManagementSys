import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Add this line

const app = express();
const portno = 4000;
const currentTime = new Date();
// console.log(currentTime);

app.use(cors()); // Add this line
app.use(bodyParser.json()); // Add this to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [
    {
      id: 1,
      title: "The Rise of Decentralized Finance",
      content:
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
      author: "Alex Thompson",
      date: "2023-08-01T10:00:00Z",
    },
    {
      id: 2,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content:
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
    },
    {
      id: 3,
      title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
      content:
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
      author: "Samuel Green",
      date: "2023-08-10T09:15:00Z",
    },
  ];

let pid = posts.length;


app.get("/getData",(req,res)=>{
    res.send(posts)
})

app.post('/addData', (req, res) => {
  const newPost = {
    id: pid + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: currentTime // Fix this line (change "data" to "date")
  };
  posts.push(newPost);
  res.send({ message: "successfully added", newPost });
});

app.put('/updateData/:Data_id', (req, res) => {
  let pid = parseInt(req.params.Data_id);
  let targetIndex = posts.findIndex((o) => o.id === pid);

  if (targetIndex !== -1) {
    posts[targetIndex] = {
      id: pid, // Fix this line (replace "target" with "pid")
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: currentTime
    };
    res.send({ message: "successfully updated", updatedPost: posts[targetIndex] });
  } else {
    res.send("id not found");
  }
});

app.patch("/updateSpecificData/:Data_id",(req,res)=>{
  let pid = parseInt(req.params.Data_id);
  console.log(pid);
  
  let targetIndex = posts.findIndex((o)=>{
    return o.id === pid
  })
  
  if(targetIndex === -1){
    res.send({message:"id doesnot exist"})
  }
  
  const allowedFields = ['title','content','author'];

  let result = Object.keys(req.body).filter(key => allowedFields.includes(key))
  if(result.length<=0){
    res.send({message:"invalid fields"})
  }
  

  if(req.body.title !== undefined){
    posts[targetIndex].title = req.body.title;
  }
  if(req.body.content !== undefined){
    posts[targetIndex].content = req.body.content;
  }
  if(req.body.author !== undefined){
    posts[targetIndex].author = req.body.author;
  }

  res.send({
    message:"successfully updated the data",
    updatedArray : posts[targetIndex]
  })
  
})


app.delete("/deleteData/:Data_id",(req,res)=>{
  let pid = parseInt(req.params.Data_id);
  let targetIndex = posts.findIndex((o)=>{
    return o.id === pid
  })

  if(targetIndex !== -1){
    posts.splice(targetIndex,1)
    res.send({
      message:`successfully deleted data from id ${pid}`,
      updatedData:posts
      });
  }else{
    res.send("id not found")
  }  
})



app.listen(portno,()=>{
  console.log(`server running on port ${portno}`);
})
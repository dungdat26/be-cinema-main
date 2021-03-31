const newsModel = require("../models/news-model")

exports.postNews = async(req,res,next) => {
     console.log(req.body)
     const newsData = { ...req.body};
     
     const news = new newsModel(newsData);

     news
          .save()
          .then((news)=>{
               console.log(news);
               
               res.status(201).json(news);
          })
          .catch((err) => {
               console.log(err);
               res.status(500).json(err);
             });
};

exports.getAllNews = async (req, res) => {
     
     try{
     const news = await newsModel.find()
     .then((news)=>{
          console.log(news);
          
          res.status(200).json({news: news,})
     })
     }    
     catch(err)  {
          console.log(err);
          next(err);
        };
}

exports.getDetailNews = (req, res) => {
     const id_news = req.params.id_news;
     //   console.log(req.params.id_news);
     try {
          newsModel.findById(id_news)
         
         .then((news) => {
           console.log(news);
   
           res.status(200).json({
               news: news,
           });
         });
     } catch (err) {
       console.log(err);
       next(err);
     }
   };

   exports.updateNews = (req, res) => {
     const id_news = req.params.id_news;
     const newsData = req.body;
   
     console.log(id_news);
     console.log(newsData);
   
     newsModel.findByIdAndUpdate(id_news, { $set: newsData })
       .then((result) => {
         
         res.json({
           error: false,
           message: "receive",
         });
       })
       .catch((err) => {
         console.log(err);
         res.json({
           error: true,
           message: "error",
         });
       });
   };
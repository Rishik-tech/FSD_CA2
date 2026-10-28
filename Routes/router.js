const express=require('express');
const router=express.Router();

const books=require('../model/bookmodel');

router.get('/get',async(req,res)=>{
    const page=(req.query.page,10)||1;
    const limit=(req.query.limit,10)||10;
    const santpage=(page>1)?page:1;
    const santlimit=(limit<1)?10:limit;
    const skip=(santpage-1)*limit;

    const {book,totalbooks}=await new Promise.all(
        books.find().skip(skip).limit(santlimit),
        books.countDocument()
    );
    if(!book){
        return res.status(404).json({
            message:"No book found"
        })
    }
    return res.status(200).json({
        success:true,
        metadata:{
            totalbooks:totalbooks,
            currentPage:santpage
        },
        data:book
    })
})

router.post('/post',async (req,res)=>{
    const {title,author,category}=req.body;
    if(!title){
        return res.status(400).json({
            message:"Title is not provided"
        })
    }
    const newBook={
        title:title,
        author:author,
        category:category,
    }
    const add=await books.create(newBook);
    if(!add){
        return res.status(400).json({
            message:"Something went wrong"
        })
    }
    return res.status(200).json({
        message:"Book addedd Successfully"
    }); 
})
router.patch('/patch/:id',async (req,res)=>{
    const id=parseInt(req.params.id);
    const avaibility_status=req.body.avaibility_status;
    const book=await books.findByIdAndUpdate({
        _id:id,
        avaibility_status:avaibility_status
    });
    if(!book){
        return res.status(404).json({
            message:"No book found"
        })
    }
    return res.status(200).json({
        message:"Book updated Successfully"
    })
})
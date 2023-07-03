const CFP = require("../models/cfp");
const asyncHandler = require("express-async-handler");

const getCFPs = async (req, res) => {
  res.status(200).json(await CFP.find().populate("eventId").populate("userId"));
};

const getCFPById = async (req, res) => {
  const cfp = await CFP.findById(req.params.id);
  if (cfp) {
    res.status(200).json(cfp);
  } else {
    res.status(404);
    console.log("CFP not found");
  }
};

const getCFPByEventId = async (req, res) => {
  const cfp = await CFP.find({ eventId: req.params.id }).populate("userId");
  if (cfp) {
    res.status(200).json(cfp);
  } else {
    res.status(404);
    console.log("CFP not found");
  }
};

const approveCFP = async (req, res) => {
  const cfp = await CFP.findById(req.params.id);
  if (cfp) {
    cfp.isApproved = true;
    const updatedCFP = await cfp.save();
    res.status(200).json(updatedCFP);
  } else {
    res.status(404);
    console.log("CFP not found");
  }
};

const createCFP = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    isApproved,
    userId,
    eventId,
    github,
    linkedin,
    twitter,
    website,
    blog,
  } = req.body;

  const cfp = await CFP.create({
    title,
    description,
    isApproved,
    userId,
    eventId,
    github,
    linkedin,
    twitter,
    website,
    blog,
  });

  if (cfp) {
    res.status(201).json({
      _id: cfp._id,
      title: cfp.title,
      description: cfp.description,
      isApproved: cfp.isApproved,
      userId: cfp.userId,
      eventId: cfp.eventId,
      github: cfp.github,
      linkedin: cfp.linkedin,
      twitter: cfp.twitter,
      website: cfp.website,
      blog: cfp.blog,
    });
  } else {
    res.status(400);
    console.log("Invalid CFP data");
  }
});

module.exports = {
  getCFPs,
  getCFPById,
  createCFP,
  getCFPByEventId,
  approveCFP,
};

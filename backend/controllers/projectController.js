const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');
const User = require('../models/userModel');
//Get all projects for the user
//route GET to api/projects
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.status(200).json(projects);
});

//Create a projects for the user
//route POST to api/projects
const createProject = asyncHandler(async (req, res) => {
  if (!req.body.project) {
    res.status(400);
    throw new Error('Please add a project field');
  }
  const project = await Project.create({
    project: req.body.project,
    user: req.user.id,
  });
  res.status(200).json(project);
});

//Update a project for the user
//route PUT to api/projects
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  const user = await User.findById(req.user.id);
  //check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the project user
  if (project.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedProject);
});

//Delete a project for the user
//route DELETE to api/projects
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  const user = await User.findById(req.user.id);
  //check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the project user
  if (project.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await project.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};

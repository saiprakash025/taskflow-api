const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      owner: req.user._id,
      members: [req.user._id]
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects };
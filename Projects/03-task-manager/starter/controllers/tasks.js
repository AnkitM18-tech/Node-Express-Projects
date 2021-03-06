const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
// Other ways to setup responses.
// res.status(200).json({ tasks,amount:tasks.length });
// res
//   .status(200)
//   .json({ success: true, data: { tasks, nbHits: tasks.length } }); //axios right away returns a data object so if we are passing data object then we need to handle that in frontend.
// res
//   .status(200)
//   .json({ status: "success", data: { tasks, nbHits: tasks.length } });

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    /* return res.status(404).json({ msg: `No task with id: ${taskID}` }); // not getting same number of characters as id that is needed by mongoose. */
  }
  res.status(200).json({ task });
  /* } catch (error) {
    res.status(500).json({ msg: error }); // when there is more than the number of characters added in id.(cast error) or syntax error in mentioning id. 
  }*/
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, // to get the new value
    runValidators: true, // to run the validators, else it won't validate. !Important to pass options object
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    /* return res.status(404).json({ msg: `No task with id: ${taskID}` }); */
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    /* return res.status(404).json({ msg: `No task with id: ${taskID}` }); */
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

// put and patch are both for updating resources. -> while using put you are trying to replace existing resource. patch is for partial update. if we only enter the value that needs to be updated only that one will be updated in patch but in put we need to update the entire resource -> every value have to be passed. In put we need to pass another option -> overwrite:true, now if we pass only a single property then all other properties will be removed, and the resource will be overwritten, if there is no default value passed in schema. In patch only the property we provide will be updated, along with all other properties remaining unchanged.

const Accounts = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body;

  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof(name) !== 'string') {
    res.status(400).json({ message: "name must be a string" });
  } else if (name.length < 3 || name.length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
  } else if (typeof(budget) !== 'number') {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body;
  
  const all = await Accounts.getAll();
  if (all.includes({name})) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  const acc = await Accounts.getById(id);
  if  (!acc) {
    res.status(404).json({ message: "account not found" });
  } else {
    next();
  }
}

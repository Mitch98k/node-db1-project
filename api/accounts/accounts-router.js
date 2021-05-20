const router = require('express').Router()

const {checkAccountPayload, checkAccountId, checkAccountNameUnique} = require('./accounts-middleware');

const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const acc = await Accounts.getAll();
    res.status(200).json(acc);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  try {
    const acc = await Accounts.getById(id);
    res.status(200).json(acc);
  } catch(err) {
    next(err);
  }
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body;
  try {
    const newAcc = await Accounts.create({name, budget});
    res.status(201).json(newAcc);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  const account = req.body;
  try {
    const updAcc = await Accounts.updateById(id, account);
    res.status(200).json(updAcc);
  } catch(err) {
    console.log(id);
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  try {
    const delAcc = await Accounts.deleteById(id);
    res.status(200).json(delAcc);
  } catch(err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message });
});

module.exports = router;

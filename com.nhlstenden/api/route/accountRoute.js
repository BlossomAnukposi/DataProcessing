const express = require("express");
const router = express.Router();
const accountController = require("../controller/accountController");

router.get('/', accountController.getAllEntries);
router.get('/:id', accountController.getEntryById);
router.delete('/:account_id', accountController.deleteEntry);
router.post('/', accountController.createAccount);
router.patch('/:account_id', accountController.updateAccount);

module.exports = router;
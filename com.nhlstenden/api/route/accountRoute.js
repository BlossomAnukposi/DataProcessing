const express = require("express");
const router = express.Router();
const AccountController = require("../controller/accountController");

router.get('/', AccountController.getAllEntries);
router.get('/:id', AccountController.getEntryById);
router.delete('/:id', AccountController.deleteEntryById);
router.post('/', AccountController.createAccount);
router.patch('/:id', AccountController.updateAccount);

module.exports = router;
const express = require("express");
const router = express.Router();

const authentication = require("../middleware/authentication");
const loanController = require("../controllers/loan");

router.post("/createLoan", authentication,loanController.createLoan);
router.get("/allLoans", authentication, loanController.getAllLoans);
router.get("/loans/:id", authentication, loanController.getLoansById);
router.get("/payments/:id", authentication, loanController.getPaymentsById);
router.post("/doPayment", authentication,loanController.doPayment);
router.put("/update", authentication, loanController.updateState);

module.exports = router;

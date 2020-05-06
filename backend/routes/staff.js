const express = require('express');
const staffService = require('../services/user/staff');

const router = express.Router();

router.delete('/:id', staffService.staffDelete);

router.patch('/', staffService.updateStaffPassword);

module.exports = router;

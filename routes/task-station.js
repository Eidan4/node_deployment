const { Router } = require('express');
const { check } = require('express-validator');

const { createTaskStation,getTaskStation} = require('../controllers/task-station');

const { validExistStation, validExistStationById } = require('../helpers/validators');

const { validateFields,
        validateJWT,
        hasARole, 
        superAdminRole} = require('../middlewares');

const router = Router();

router.post('/:id',[
    validateFields
],createTaskStation);

router.get('/stations/:id',[
    validateFields
],getTaskStation)

module.exports = router;
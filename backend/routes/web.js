const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const urlController = require('../controllers/UrlController');
const shortUrlController = require('../controllers/ShortUrlController')

router.get('/', homepageController.index);


router.post('/url/create', urlController.store);
router.get('/short_url/:short_url', shortUrlController.show);
router.post('/url/update', urlController.update);
router.post('/shorturl/create', shortUrlController.store);
router.get('/url', urlController.show);
module.exports = router;

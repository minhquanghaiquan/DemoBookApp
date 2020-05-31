module.exports.postNew= function(req, res, next) {
    var errors = [];
    if(!req.body.title) {
        errors.push('title is required. ');
    }
    if(!req.body.author) {
        errors.push('author is required. ');
    }
    if(!req.body.pageCount) {
        errors.push('Page count is required. ');
    }
    if(!req.body.description) {
        errors.push('Description is required. ');
    }
    if(errors.length) {
        res.render('users/new', {
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
}
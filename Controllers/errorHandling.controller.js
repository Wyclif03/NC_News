exports.PSQLerrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'Incorrect ID format'})
    } else {
        next(err);
    }
}

exports.customErrors = (err, req, res, next) => {
  
    if (err.status && err.msg) {
      res.status(err.status).send({msg: err.msg})
    } else {
      next(err);
    }
  }
  
  exports.status500 = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: 'Server error'});
  }


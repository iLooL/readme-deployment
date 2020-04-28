const express = require ('express'); 
const router = express.Router(); 
const User = require('../models/user');
const Article = require('../models/article'); 
const Comment = require('../models/comment'); 

router.get('/articles', function(req, res) { 
  Article.find(function(err, articles) {
    res.json(articles);
  });
});

router.get('/articles/:id', function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (!article) {
      res.status(404).send('No result found');
    } else {
      res.json(article);
    }
  });
});

router.get('/:article_type', function(req, res) {  
  const articleType = req.params.article_type;
  Article.find(({ article_type: articleType }), function(err, article) {
    if (!article) {
      res.status(404).send('No articles of type found');
    } else {
      res.json(article);
    }
  });
});

router.post('/articles', function(req, res) {     
  let article = new Article(req.body);
  article.save()
    .then(article => {
      res.send(article);
    })
    .catch(function(err) {
      res.status(422).send('Article add failed');
    });
});

// update upvote on article
router.post('/articles/:id/upvote', function(req, res){    
  Article.findOneAndUpdate({article_id: req.params.id}, {$inc: {upvotes: 1}})
    .then(function() {
      res.json('Article updated');
    })
    .catch(function(err) {
      res.status(422).send("Article update failed.");
    });
});

router.delete('/articles/:id', function(req, res) {  
  Article.findById(req.params.id, function(err, article) {
    if (!article) {
		res.status(404).send('Article not found');
    } else {
		Article.findByIdAndRemove(req.params.id)
        .then(function() {
			res.status(200).json("Article deleted") 
		})
        .catch(function(err) {
          res.status(400).send("Article delete failed.");
        })
    }
  });
})

router.get('/users/all', function(req, res) {
	User.find({})
	.then(users => {
		if (users.length === 0) {
			res.status(404).send('No users');
		} else {
			res.json(users);
		}
	})
	.catch(function(err) {
		res.status(422).send('Users get failed');
	});
});

router.get('/users/:username', function(req, res) {
	let userName = req.params.username;
	User.find(({ username: userName }), function(err, user) {
		if (user.length === 0) {
			res.status(200).json(user);
		} else {
			res.json(user);
		}
	});
});

router.post('/users/add', function (req, res) {
	let user = new User(req.body);
	user.save()
	.then(user => {
		console.log('username: ' + user.username + ' added to users');
		res.send(user);
	})
    .catch(function(err) {
		res.status(422).send('User add failed');
    });
});

router.delete('/users/:username', function(req, res) {  
	let userName = req.params.username;
	User.find(({ username: userName }), function(err, user) {
		if (user.length === 0) {
			res.status(404).send('User not found');
		} else {
			User.remove(({ username: userName }))
			.then(function() {
				res.status(200).json("User deleted") 
			})
			.catch(function(err) {
				res.status(400).send("User delete failed.");
			})
		}
	})
	.catch(function(err) {
		res.status(400).send("User find failed.");
	})
})
// COMMENTS API REQUESTS

// currently only gets one comment
router.post('/comments/:id', function(req, res) {   
  let comment = new Comment(req.body);
  comment.save()
    .then(comment => {
      res.send(comment);
    })
    .catch(function(err) {
      res.status(422).send('Comment add failed');
    });
});

// get request working below
router.get('/comments/:id', function(req, res) {  
  const article_id = req.params.id;
  console.log(article_id);
  Comment.find({ article_id: article_id }, function(err, comment) {
    if (!comment) {
      res.status(404).send('That comment ID is not in collection');
    } else {
      res.json(comment);
    }
  });
});

module.exports = router; 
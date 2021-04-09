const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', (req, res) => {
    try {
        Post.findByPk(req.params.id, {
        })
            .then((postData) => {
                console.log("post data: ", postData);
                let post = postData.get({ plain: true });
                Comment.findAll({
                    where: { post_id: req.params.id },
                })
                    .then(commentData => {
                        const comment = commentData.map((comment) => comment.get({ plain: true }))
                        console.log("Comment Data: ", comment);
                        let postAndComments = {
                            post: post,
                            id: req.params.id,
                            comments: comment
                        };
                        console.table(postAndComments);
                        res.render('post', {
                            ...postAndComments,
                            logged_in: req.session.logged_in
                        });
                    }).catch(err => {
                        res.status(500).json(err);
                    })
            }).catch(err => {
                res.status(500).json(err);
            });
    } catch (err) {
    };
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;

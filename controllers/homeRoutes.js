// Import modules
const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

//show all blog posts
router.get('/', async (req, res) => {
  try {
    req.body.user_id = req.session.user_id

    // Get all blog posts
    const blogData = await Blog.findAll({

    });
    console.log(blogData)

    const blogMap = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogData)
    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogMap
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// shows posts unique to user
router.get('/userblog', async (req, res) => {
  try {
    // get all blog posts
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id }

    });
    console.log(blogData)

    const blogMap = blogData.map((blog) => workout.get({ plain: true }));
    const userData = await Blog.findOne({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    if (!userData) {
      res.render('userblog', {
        blogMap,
        logged_in: req.session.logged_in
      });

    } else {

      const userMap = userData.get({ plain: true });

      res.render('userblog', {
        blogMap, ...userMap,
        logged_in: req.session.logged_in
      });
    }

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// sign-up 
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
  } else {
    res.render('signup');
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

router.get('/dashboard', async (req, res) => {

    if (req.session.logged_in) {
      res.render('dashboard');
    } else {
      res.redirect('/login');
    }
});



module.exports = router;
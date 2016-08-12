import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Users from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';


const router = Router();

router.post('/signin', requireSignin, Users.signin);
router.post('/signup', Users.signup);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// your routes will go here
router.route('/posts/')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
    .get(Posts.getPost)
    .put(requireAuth, Posts.updatePost)
    .delete(requireAuth, Posts.deletePost);

export default router;

import { Route, Switch } from 'wouter';

import { ProtectedRoute } from './ProtectedRoute';
import { lazyImport } from '@/utils';

const { Registration } = lazyImport(() => import('@/pages'), 'Registration');
const { AccountActivation } = lazyImport(
  () => import('@/pages'),
  'AccountActivation',
);
const { PostRegistration } = lazyImport(
  () => import('@/pages'),
  'PostRegistration',
);
const { Login } = lazyImport(() => import('@/pages'), 'Login');
const { ForgotPassword } = lazyImport(
  () => import('@/pages'),
  'ForgotPassword',
);
const { PostPasswordReset } = lazyImport(
  () => import('@/pages'),
  'PostPasswordReset',
);
const { PasswordReset } = lazyImport(() => import('@/pages'), 'PasswordReset');
const { Home } = lazyImport(() => import('@/pages'), 'Home');
const { Upload } = lazyImport(() => import('@/pages'), 'Upload');
const { UploadPreview } = lazyImport(() => import('@/pages'), 'UploadPreview');
const { UserProfile } = lazyImport(() => import('@/pages'), 'UserProfile');
const { Post } = lazyImport(() => import('@/pages'), 'Post');
const { TagPosts } = lazyImport(() => import('@/pages'), 'TagPosts');
const { FourZeroFour } = lazyImport(() => import('@/pages'), 'FourZeroFour');

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/signup" component={Registration} />
      <Route path="/activate" component={AccountActivation} />
      <Route path="/post-registration" component={PostRegistration} />
      <Route path="/signin" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/post-password-reset" component={PostPasswordReset} />
      <Route path="/reset-password" component={PasswordReset} />
      <Route path="/" component={Home} />
      <ProtectedRoute path="/upload" component={Upload} />
      <ProtectedRoute path="/upload/preview" component={UploadPreview} />
      <Route path="/p/:postId" component={Post} />
      <Route path="/t/:tagName" component={TagPosts} />
      <Route path="/user/:userId" component={UserProfile} />
      <Route component={FourZeroFour} />
    </Switch>
  );
};

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  }, {
    path: 'user', 
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule)
},
{
  path: 'signup', 
  loadChildren: () => import('./pages/user/sign-up/sign-up.module').then(m => m.SignUpPageModule)
},

  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' ,
  canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './pages/user/sign-in/sign-in.module#SignInPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

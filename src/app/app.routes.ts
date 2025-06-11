// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';  // Import the AuthGuard
import { LandingComponent } from './pages/landing/landing.component';
import { AddCropsComponent } from './pages/add-crops/add-crops.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {
        path: 'home',
        component: LandingComponent,
        pathMatch: 'full'
    },
  
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },

    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
    },

    {
        path: 'crops',
        component: AddCropsComponent,
        pathMatch: 'full'
    },


    // Protected Feature Routes (Will load FeaturesModule)
    {
        path: 'features',
        component: LayoutComponent, 
        // canActivate: [AuthGuard], 
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./features/features.module').then(m => m.FeaturesModule)
            }
        ]
    },

    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

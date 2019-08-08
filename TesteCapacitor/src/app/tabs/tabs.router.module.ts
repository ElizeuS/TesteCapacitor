import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'advanced',
        children: [
          {
            path: '',
            loadChildren: '../advanced/advanced.module#AdvancedModule'
          }
        ]
      },
      {
        path: 'view',
        children: [
          {
            path: '',
            loadChildren: '../view/view.module#ViewModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/view',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

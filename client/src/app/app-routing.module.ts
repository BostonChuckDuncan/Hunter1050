import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsHunterComponent } from './PreReg/OverView/whatshunter/whatshunter.component';
import { SplashPageComponent } from './SplashPage/SplashPage.component';
import {HardProblemComponent} from './PreReg/OverView/hard-problem/hard-problem.component';
import {FeaturesComponent} from './PreReg/OverView/features/features.component';
import {UsingHunterComponent} from './PreReg/OverView/using-hunter/using-hunter.component';
import {AiGaComponent} from './PreReg/OverView/ai-ga/ai-ga.component';
import {ResearchComponent} from './PreReg/Guides/research/research.component';
import {ExamplesComponent} from './PreReg/Guides/examples/examples.component';
import {TutorialsComponent} from './PreReg/Guides/tutorials/tutorials.component';
import { ContactUsComponent } from './PreReg/Contacts/contact-us/contact-us.component';
import { SupportComponent } from './PreReg/Contacts/support/support.component';
import { AboutUsComponent } from './PreReg/Contacts/about-us/about-us.component';
import { ConsultingComponent } from './PreReg/Contacts/consulting/consulting.component';

// import { ResearchContainerComponent } from './PostReg/research-container/research-container.component';
// import { UserAdminComponent } from './PostReg/admin/administer-Users/user-admin.component';
// import { AuthGuardUsers } from './_guards/auth.guard.users';
// import { AuthGuardAdmin } from './_guards/auth.guard.admin';
// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
// import { PreventUnsavedProfiles } from './_guards/prevent-unsaved-changes.guard';
// import { PreventUnsaveLearning } from './_guards/prevent-unsaved-changes.guard';
// import { ProjectLearningComponent } from './PostReg/admin/ProjectLearning/ProjectLearning.component';
// import { ProjectProfilesComponent } from './PostReg/admin/projectProfiles/projectProfiles.component';
// import { ProjectLayout } from './PostReg/design/projectLayout/projectLayout.component';


const routes: Routes = [
  { path: '', redirectTo: 'splashPage', pathMatch: 'full' },
  { path: 'splashPage', component: SplashPageComponent },

  { path: 'whatishunter', component: WhatsHunterComponent },
  { path: 'hardproblem', component: HardProblemComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'usinghunter', component: UsingHunterComponent },
  { path: 'aboutAIGA', component: AiGaComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'tutorials', component: TutorialsComponent },
  { path: 'aboutResearch', component: ResearchComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'support', component: SupportComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'consulting', component: ConsultingComponent },

  // {
  //   path: 'research',
  //   component: ResearchContainerComponent,
  //   canActivate: [AuthGuardUsers],
  // },

  // {
  //   path: 'adminUserManage',
  //   component: UserAdminComponent,
  //   canActivate: [AuthGuardAdmin],
  //   canDeactivate: [PreventUnsavedChanges],
  // },

  // {
  //   path: 'projectLayout',
  //   component: ProjectLayout,
  //   canActivate: [AuthGuardAdmin],
  //   canDeactivate: [PreventUnsaveLearning],
  // },

  // {
  //   path: 'projectConfiguration',
  //   component: ProjectProfilesComponent,
  //   canActivate: [AuthGuardAdmin],
  //   canDeactivate: [PreventUnsavedProfiles],
  // },
  // {
  //   path: 'projectLearning',
  //   component: ProjectLearningComponent,
  //   canActivate: [AuthGuardAdmin],
  //   canDeactivate: [PreventUnsaveLearning],
  // },

  // {
  //   path: 'projectCreateEdit',
  //   component: ProjectLayout,
  //   canActivate: [AuthGuardAdmin],
  //   canDeactivate: [PreventUnsaveLearning],
  // },

  { path: '**', redirectTo: 'splashPage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

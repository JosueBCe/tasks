import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentsDetailsComponent } from "./documents/documents-details/documents-details.component";
import { DocumentsListComponent } from "./documents/documents-list/documents-list.component";
import { DocumentsComponent } from "./documents/documents.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";
import { MessagesResolver } from "./messages/message-resolver.service";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: "documents",
        pathMatch: 'full'
    },
    {
        path: "documents",
        component: DocumentsComponent,
        children: [{
            path: "new",
            component: DocumentEditComponent
        },
        {
            path: ":id",
            component: DocumentsDetailsComponent

        }
            ,
        {
            path: ":id/edit",
            component: DocumentEditComponent
        }
        ]
    },
    {
        path: "messages",
        component: MessageListComponent,
        resolve: {messages: MessagesResolver}

    },
    {
        path: "contacts",
        component: ContactsComponent,
        children: [
            {
                path: "new",
                component: ContactEditComponent
            },
            {
                path: ":id",
                component: ContactDetailComponent
            }, 
            {
                path: ":id/edit",
                component: ContactEditComponent
            } 

        ]
    },

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [MessagesResolver]
})
export class AppRoutingModule {

}
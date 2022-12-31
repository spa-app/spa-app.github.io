import * as api from './data/procedureService.js'
import page from "../lib/page.mjs";
import { renderMiddleware } from "./middlewares/render.js";
import { setUserMiddleware } from "./middlewares/setUser.js";
import { preloader } from './middlewares/preloader.js';
import { hasUser, isOwner } from './middlewares/guards.js';
import { getUserData } from "./util.js";
import { showCreateView } from "./views/createView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { showRegisterView } from "./views/registerView.js";
import { showCatalogView } from "./views/catalogView.js";
import { showDetailsView } from "./views/detailsView.js";
import { logoutAction } from './action/logoutAction.js';
import { showLoaderView } from './views/loaderView.js';
import { showEditView } from './views/editViews.js';
import { showMyCatalogView } from './views/myCatalogView.js';


window.api = api;
const main = document.getElementById('main');
const header = document.getElementById('header');

page(setUserMiddleware(getUserData))
page(renderMiddleware(main, header));

page('/home', showHomeView);
page('/', '/home')
page('/create', hasUser(), showCreateView);
page('/catalog', showLoaderView, showCatalogView);
page('/my-catalog', showLoaderView, showMyCatalogView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/details/:id', showLoaderView, preloader('id', 'Procedure'), showDetailsView);
page('/edit/:id', showLoaderView, hasUser(), preloader('id', 'Procedure'), isOwner(), showEditView);
page('/logout', logoutAction)
page.start();